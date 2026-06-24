"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { X, ZoomIn, ZoomOut, Move, Check } from "lucide-react"

interface ImageCropperProps {
  imageSrc: string
  onCropComplete: (croppedImageDataUrl: string) => void
  onCancel: () => void
  aspectRatio?: number // width / height, default 3/2
}

const ImageCropper = ({ imageSrc, onCropComplete, onCancel, aspectRatio = 3 / 2 }: ImageCropperProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [cropArea, setCropArea] = useState({ width: 0, height: 0, x: 0, y: 0 })

  // Load image
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      imageRef.current = img
      setImageLoaded(true)
    }
    img.onerror = () => {
      alert("Failed to load image. Please try a different image.")
    }
    img.src = imageSrc
  }, [imageSrc])

  // Calculate crop area dimensions based on container
  useEffect(() => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight
    const padding = 32

    const availableWidth = containerWidth - padding * 2
    const availableHeight = containerHeight - padding * 2

    let cropWidth: number, cropHeight: number

    if (availableWidth / availableHeight > aspectRatio) {
      cropHeight = availableHeight
      cropWidth = cropHeight * aspectRatio
    } else {
      cropWidth = availableWidth
      cropHeight = cropWidth / aspectRatio
    }

    setCropArea({
      width: cropWidth,
      height: cropHeight,
      x: (containerWidth - cropWidth) / 2,
      y: (containerHeight - cropHeight) / 2,
    })
  }, [imageLoaded, aspectRatio])

  // Center image initially when crop area is ready
  useEffect(() => {
    if (!imageRef.current || cropArea.width === 0) return

    const img = imageRef.current
    const imgAspect = img.width / img.height
    const cropAspect = cropArea.width / cropArea.height

    let initialScale: number
    if (imgAspect > cropAspect) {
      initialScale = cropArea.height / img.height
    } else {
      initialScale = cropArea.width / img.width
    }

    // Add 10% extra to ensure full coverage
    initialScale *= 1.1

    setScale(initialScale)
    setOffset({
      x: cropArea.x + cropArea.width / 2 - (img.width * initialScale) / 2,
      y: cropArea.y + cropArea.height / 2 - (img.height * initialScale) / 2,
    })
  }, [cropArea])

  // Draw canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img || cropArea.width === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.clientWidth * window.devicePixelRatio
    canvas.height = canvas.clientHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const canvasDisplayWidth = canvas.clientWidth
    const canvasDisplayHeight = canvas.clientHeight

    // Clear
    ctx.clearRect(0, 0, canvasDisplayWidth, canvasDisplayHeight)

    // Draw image
    ctx.save()
    const imgW = img.width * scale
    const imgH = img.height * scale
    ctx.drawImage(img, offset.x, offset.y, imgW, imgH)
    ctx.restore()

    // Draw darkened overlay outside crop area
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)"
    // Top
    ctx.fillRect(0, 0, canvasDisplayWidth, cropArea.y)
    // Bottom
    ctx.fillRect(0, cropArea.y + cropArea.height, canvasDisplayWidth, canvasDisplayHeight - cropArea.y - cropArea.height)
    // Left
    ctx.fillRect(0, cropArea.y, cropArea.x, cropArea.height)
    // Right
    ctx.fillRect(cropArea.x + cropArea.width, cropArea.y, canvasDisplayWidth - cropArea.x - cropArea.width, cropArea.height)

    // Draw crop border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
    ctx.lineWidth = 2
    ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height)

    // Draw grid lines (rule of thirds)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)"
    ctx.lineWidth = 1
    for (let i = 1; i < 3; i++) {
      // Vertical lines
      const vx = cropArea.x + (cropArea.width / 3) * i
      ctx.beginPath()
      ctx.moveTo(vx, cropArea.y)
      ctx.lineTo(vx, cropArea.y + cropArea.height)
      ctx.stroke()
      // Horizontal lines
      const hy = cropArea.y + (cropArea.height / 3) * i
      ctx.beginPath()
      ctx.moveTo(cropArea.x, hy)
      ctx.lineTo(cropArea.x + cropArea.width, hy)
      ctx.stroke()
    }

    // Corner marks
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)"
    ctx.lineWidth = 3
    const cornerLen = 20
    const corners = [
      { x: cropArea.x, y: cropArea.y },
      { x: cropArea.x + cropArea.width, y: cropArea.y },
      { x: cropArea.x, y: cropArea.y + cropArea.height },
      { x: cropArea.x + cropArea.width, y: cropArea.y + cropArea.height },
    ]
    corners.forEach(({ x, y }, i) => {
      const dx = i % 2 === 0 ? 1 : -1
      const dy = i < 2 ? 1 : -1
      ctx.beginPath()
      ctx.moveTo(x + dx * cornerLen, y)
      ctx.lineTo(x, y)
      ctx.lineTo(x, y + dy * cornerLen)
      ctx.stroke()
    })
  }, [scale, offset, cropArea])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  // Mouse / touch handlers
  const getPointerPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const pos = getPointerPos(e)
    setDragging(true)
    setDragStart({ x: pos.x - offset.x, y: pos.y - offset.y })
  }

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return
    e.preventDefault()
    const pos = getPointerPos(e)
    setOffset({ x: pos.x - dragStart.x, y: pos.y - dragStart.y })
  }

  const handlePointerUp = () => {
    setDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.05 : 0.05
    setScale((prev) => Math.max(0.1, Math.min(5, prev + delta)))
  }

  const adjustZoom = (direction: "in" | "out") => {
    const step = 0.1
    setScale((prev) => Math.max(0.1, Math.min(5, direction === "in" ? prev + step : prev - step)))
  }

  // Crop and export
  const handleCrop = () => {
    const img = imageRef.current
    if (!img || cropArea.width === 0) return

    // Create output canvas at a good resolution (1200 x 800 for 3:2)
    const outputWidth = 1200
    const outputHeight = Math.round(outputWidth / aspectRatio)
    const outputCanvas = document.createElement("canvas")
    outputCanvas.width = outputWidth
    outputCanvas.height = outputHeight
    const ctx = outputCanvas.getContext("2d")
    if (!ctx) return

    // Calculate what portion of the image falls inside the crop area
    const sx = (cropArea.x - offset.x) / scale
    const sy = (cropArea.y - offset.y) / scale
    const sw = cropArea.width / scale
    const sh = cropArea.height / scale

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outputWidth, outputHeight)

    const dataUrl = outputCanvas.toDataURL("image/jpeg", 0.92)
    onCropComplete(dataUrl)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Crop Image</h3>
            <p className="text-sm text-gray-400 mt-0.5">Adjust to fit 3:2 ratio</p>
          </div>
          <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas area */}
        <div ref={containerRef} className="relative bg-neutral-900" style={{ height: "420px" }}>
          {imageLoaded ? (
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              style={{ touchAction: "none" }}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              onWheel={handleWheel}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            {/* Zoom controls */}
            <div className="flex items-center gap-3">
              <button onClick={() => adjustZoom("out")} className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-500 font-medium min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
              <button onClick={() => adjustZoom("in")} className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <ZoomIn className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5 ml-3 text-xs text-gray-400">
                <Move className="w-3.5 h-3.5" />
                Drag to reposition
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button onClick={onCancel} className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleCrop}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors"
              >
                <Check className="w-4 h-4" />
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCropper
