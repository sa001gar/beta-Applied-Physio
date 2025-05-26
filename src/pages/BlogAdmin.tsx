"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { PlusCircle, Edit, Trash2, Eye, EyeOff, Loader2, Wand2, ImageIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "../lib/supabase"
import type { Blog } from "../lib/supabase"
import slugify from "slugify"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

type BlogFormData = Omit<Blog, "id" | "author_id" | "created_at" | "updated_at">

// Enhanced Quill modules configuration with more professional options
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    [{ script: "sub" }, { script: "super" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
}

// Retry configuration
const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Enhanced reliable image URL generation with multiple fallbacks
const getReliableImageUrl = (topic: string, category: string): string => {
  // Professional medical images from Unsplash with specific IDs (guaranteed to work)
  const professionalImages = [
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop&crop=center&auto=format&q=80", // Medical professional
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop&crop=center&auto=format&q=80", // Physiotherapy session
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&crop=center&auto=format&q=80", // Healthcare setting
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=600&fit=crop&crop=center&auto=format&q=80", // Medical equipment
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&h=600&fit=crop&crop=center&auto=format&q=80", // Wellness/therapy
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&crop=center&auto=format&q=80", // Healthcare professional
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop&crop=center&auto=format&q=80", // Medical consultation
  ]

  // Category-specific image selection
  const categoryImages = {
    "Sports Medicine":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&crop=center&auto=format&q=80",
    "Pain Management":
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop&crop=center&auto=format&q=80",
    Rehabilitation:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop&crop=center&auto=format&q=80",
    Wellness:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&h=600&fit=crop&crop=center&auto=format&q=80",
    "Injury Prevention":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&crop=center&auto=format&q=80",
    "Women's Health":
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=600&fit=crop&crop=center&auto=format&q=80",
    "Pediatric Care":
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop&crop=center&auto=format&q=80",
  }

  // Return category-specific image or random professional image
  return (
    categoryImages[category as keyof typeof categoryImages] ||
    professionalImages[Math.floor(Math.random() * professionalImages.length)]
  )
}

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [editorContent, setEditorContent] = useState("")
  const [imagePreview, setImagePreview] = useState<string>("")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>()

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    if (editingBlog) {
      setValue("title", editingBlog.title)
      setValue("excerpt", editingBlog.excerpt)
      setValue("content", editingBlog.content)
      setValue("image_url", editingBlog.image_url)
      setValue("category", editingBlog.category)
      setValue("tags", editingBlog.tags ? editingBlog.tags.join(", ") : "")
      setValue("published", editingBlog.published)
      setEditorContent(editingBlog.content)
      setImagePreview(editingBlog.image_url)
      setShowForm(true)
    }
  }, [editingBlog, setValue])

  // Watch image URL changes for preview
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image_url" && value.image_url) {
        setImagePreview(value.image_url)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setBlogs(data || [])
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateWithRetry = async (model: any, prompt: string, attempt = 1): Promise<any> => {
    try {
      const result = await model.generateContent(prompt)
      setRetryCount(0)
      return result
    } catch (error: any) {
      if (error.message?.includes("503") && attempt <= MAX_RETRIES) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1)
        console.log(`Retry attempt ${attempt} after ${delay}ms delay`)
        await sleep(delay)
        return generateWithRetry(model, prompt, attempt + 1)
      }
      throw error
    }
  }

  const generateBlogContent = async () => {
    const topic = watch("title")
    if (!topic) {
      alert("Please enter a topic first")
      return
    }

    setGenerating(true)
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

      // Simplified but powerful prompt that ensures valid JSON response
      const enhancedPrompt = `Create a professional blog post about "${topic}" for a physiotherapy clinic. 

IMPORTANT: Respond ONLY with valid JSON in this exact format (no additional text, no markdown formatting):

{
  "title": "SEO-optimized title about ${topic}",
  "excerpt": "Compelling 2-3 sentence summary that hooks readers and explains the value",
  "content": "Complete HTML-formatted blog post content (1500-2000 words)",
  "tags": ["primary-keyword", "secondary-keyword", "health", "physiotherapy", "wellness"],
  "category": "Choose from: Sports Medicine, Pain Management, Rehabilitation, Wellness, Injury Prevention, Women's Health, Pediatric Care",
  "meta_description": "SEO description under 160 characters",
  "reading_time": "8 min read",
  "featured_snippet": "Key takeaway for featured snippets"
}

Content Requirements:
- Professional, evidence-based medical content
- 1500-2000 words with proper HTML formatting
- Use these HTML elements for formatting:
  * <h2>, <h3>, <h4> for headings
  * <p> for paragraphs with proper spacing
  * <strong> for emphasis
  * <ul> and <li> for lists
  * <blockquote> for quotes
  * <em> for medical terms

Content Structure:
1. Compelling introduction (200-300 words)
2. 4-6 main sections (250-350 words each)
3. Practical tips and actionable advice
4. Professional conclusion with clear takeaways

Tone: Professional yet accessible, authoritative, patient-focused
Target: Patients seeking physiotherapy information
Include: Latest research, practical tips, clear explanations

Remember: Return ONLY the JSON object, no other text.`

      const result = await generateWithRetry(model, enhancedPrompt)
      const response = await result.response
      let text = response.text()

      try {
        // More robust JSON cleaning
        console.log("Raw AI response:", text) // Debug log

        // Remove any markdown formatting
        text = text.replace(/```json\s*/g, "").replace(/```\s*/g, "")

        // Remove any text before the first { and after the last }
        const firstBrace = text.indexOf("{")
        const lastBrace = text.lastIndexOf("}")

        if (firstBrace === -1 || lastBrace === -1) {
          throw new Error("No valid JSON structure found in response")
        }

        text = text.substring(firstBrace, lastBrace + 1)

        // Clean up any remaining issues
        text = text.trim()

        console.log("Cleaned JSON:", text) // Debug log

        const blogData = JSON.parse(text)

        // Validate required fields
        if (!blogData.title || !blogData.content || !blogData.excerpt) {
          throw new Error("Missing required fields in AI response")
        }

        // Set form values
        setValue("title", blogData.title)
        setValue("excerpt", blogData.excerpt)
        setValue("content", blogData.content)
        setValue("category", blogData.category || "Wellness")
        setValue("tags", Array.isArray(blogData.tags) ? blogData.tags.join(", ") : "")
        setEditorContent(blogData.content)

        // Generate reliable image URL
        const imageUrl = getReliableImageUrl(topic, blogData.category || "healthcare")
        setValue("image_url", imageUrl)
        setImagePreview(imageUrl)

        // Success notification
        alert(
          `✅ Blog content generated successfully!\n\n📊 ${blogData.reading_time || "8 min read"}\n📝 ${Math.round(blogData.content.length / 5)} words`,
        )
      } catch (parseError) {
        console.error("JSON parsing error:", parseError)
        console.error("Problematic text:", text)

        // Fallback: Try to extract content manually
        try {
          const fallbackContent = extractContentFallback(text, topic)
          if (fallbackContent) {
            setValue("title", fallbackContent.title)
            setValue("excerpt", fallbackContent.excerpt)
            setValue("content", fallbackContent.content)
            setValue("category", "Wellness")
            setValue("tags", "physiotherapy", "health", )
            setEditorContent(fallbackContent.content)

            const imageUrl = getReliableImageUrl(topic, "wellness")
            setValue("image_url", imageUrl)
            setImagePreview(imageUrl)

            alert("✅ Content generated with fallback method!")
          } else {
            throw parseError
          }
        } catch (fallbackError) {
          alert(
            `❌ Error parsing AI response: ${parseError.message}\n\nPlease try again with a simpler topic or fill in the form manually.`,
          )
        }
      }
    } catch (error: any) {
      console.error("Error generating blog:", error)
      if (error.message?.includes("503")) {
        alert("🔄 The AI service is experiencing high demand. Please try again in a few moments.")
      } else if (error.message?.includes("quota")) {
        alert("⚠️ API quota exceeded. Please try again later or contact support.")
      } else {
        alert(`❌ Error generating blog content: ${error.message}\n\nPlease try again or fill in the form manually.`)
      }
    } finally {
      setGenerating(false)
    }
  }

  // Fallback content extraction function
  const extractContentFallback = (text: string, topic: string) => {
    try {
      // Try to find title, excerpt, and content in the text even if JSON is malformed
      const titleMatch = text.match(/"title":\s*"([^"]+)"/i)
      const excerptMatch = text.match(/"excerpt":\s*"([^"]+)"/i)
      const contentMatch = text.match(/"content":\s*"((?:[^"\\]|\\.)*)"/i)

      if (titleMatch && excerptMatch && contentMatch) {
        return {
          title: titleMatch[1],
          excerpt: excerptMatch[1],
          content: contentMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"'),
        }
      }

      // If that fails, generate basic content
      return {
        title: `Understanding ${topic}: A Comprehensive Guide`,
        excerpt: `Learn about ${topic} and how physiotherapy can help improve your health and wellness.`,
        content: `<h2>Understanding ${topic}</h2>
        <p>This comprehensive guide covers everything you need to know about ${topic} and how physiotherapy can help.</p>
        <h3>What You Need to Know</h3>
        <p>Professional physiotherapy treatment can provide significant benefits for ${topic}. Our experienced team is here to help you achieve your health goals.</p>
        <h3>Treatment Approaches</h3>
        <ul>
          <li>Personalized assessment and treatment planning</li>
          <li>Evidence-based therapeutic techniques</li>
          <li>Patient education and self-management strategies</li>
          <li>Ongoing support and monitoring</li>
        </ul>
        <h3>Getting Started</h3>
        <p>Contact our clinic today to schedule a consultation and learn how we can help you with ${topic}.</p>`,
      }
    } catch (error) {
      return null
    }
  }

  const generateNewImage = () => {
    const topic = watch("title") || "physiotherapy"
    const category = watch("category") || "healthcare"
    const newImageUrl = getReliableImageUrl(topic, category)
    setValue("image_url", newImageUrl)
    setImagePreview(newImageUrl)
  }

  const onSubmit = async (data: BlogFormData) => {
    setSaving(true)
    try {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) throw new Error("Not authenticated")

      const slug = slugify(data.title, { lower: true, strict: true })

      const tagsArray = data.tags
        ? data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
            .map((tag) => tag.toLowerCase())
        : []

      const blogData = {
        ...data,
        tags: tagsArray,
        slug,
        content: editorContent,
        updated_at: new Date().toISOString(),
      }

      if (editingBlog) {
        const { error } = await supabase.from("blogs").update(blogData).eq("id", editingBlog.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("blogs").insert([
          {
            ...blogData,
            author_id: user.id,
          },
        ])

        if (error) throw error
      }

      await fetchBlogs()
      reset()
      setShowForm(false)
      setEditingBlog(null)
      setEditorContent("")
      setImagePreview("")
    } catch (error) {
      console.error("Error saving blog:", error)
      alert("Error saving blog post. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return

    setDeleting(id)
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id)

      if (error) throw error
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (error) {
      console.error("Error deleting blog:", error)
      alert("Error deleting blog post. Please try again.")
    } finally {
      setDeleting(null)
    }
  }

  const togglePublish = async (blog: Blog) => {
    try {
      const { error } = await supabase.from("blogs").update({ published: !blog.published }).eq("id", blog.id)

      if (error) throw error
      await fetchBlogs()
    } catch (error) {
      console.error("Error toggling publish status:", error)
      alert("Error updating blog status. Please try again.")
    }
  }

  return (
    <main className="pt-32 pb-16 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog Management</h1>
            <p className="text-gray-600">Create and manage professional physiotherapy content</p>
          </div>
          <button
            onClick={() => {
              setEditingBlog(null)
              reset()
              setEditorContent("")
              setImagePreview("")
              setShowForm(!showForm)
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-5 h-5" />
            New Post
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-semibold text-gray-900">
                    {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
                  </h2>
                  <button
                    onClick={generateBlogContent}
                    disabled={generating}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                    {generating ? "Generating Premium Content..." : "Generate with AI"}
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Title</label>
                      <input
                        {...register("title", { required: "Title is required" })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter compelling blog title..."
                      />
                      {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                      <select
                        {...register("category", { required: "Category is required" })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select category...</option>
                        <option value="Sports Medicine">Sports Medicine</option>
                        <option value="Pain Management">Pain Management</option>
                        <option value="Rehabilitation">Rehabilitation</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Injury Prevention">Injury Prevention</option>
                        <option value="Women's Health">Women's Health</option>
                        <option value="Pediatric Care">Pediatric Care</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Featured Image</label>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <input
                          {...register("image_url", { required: "Image URL is required" })}
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="Image URL will be generated automatically..."
                        />
                        <button
                          type="button"
                          onClick={generateNewImage}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                        >
                          <ImageIcon className="w-4 h-4" />
                          New Image
                        </button>
                      </div>
                      {imagePreview && (
                        <div className="relative">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-xl border border-gray-200"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src =
                                "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop&crop=center&auto=format&q=80"
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-xl"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Excerpt</label>
                    <textarea
                      {...register("excerpt", { required: "Excerpt is required" })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Brief description that will appear in blog previews..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Content</label>
                    <div className="prose max-w-none">
                      <ReactQuill
                        theme="snow"
                        value={editorContent}
                        onChange={setEditorContent}
                        modules={quillModules}
                        className="h-[400px] mb-16 rounded-xl overflow-hidden border border-gray-200"
                        placeholder="Start writing your professional blog content here..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Tags</label>
                    <input
                      {...register("tags")}
                      placeholder="physiotherapy, rehabilitation, health, wellness"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Enter tags separated by commas for better SEO and categorization
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...register("published")}
                      className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label className="text-sm font-semibold text-gray-700">Publish immediately</label>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setEditingBlog(null)
                        reset()
                        setEditorContent("")
                        setImagePreview("")
                      }}
                      className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                      {saving ? "Saving..." : "Save Post"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading blog posts...</p>
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-600 mb-6">Create your first professional blog post to get started!</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200"
              >
                Create First Post
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                layout
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            blog.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {blog.published ? "Published" : "Draft"}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          {blog.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                          {new Date(blog.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        {blog.tags && blog.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{blog.tags.slice(0, 3).join(", ")}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => togglePublish(blog)}
                        className={`p-2 rounded-lg transition-colors ${
                          blog.published ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-50"
                        }`}
                        title={blog.published ? "Unpublish" : "Publish"}
                      >
                        {blog.published ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => setEditingBlog(blog)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit post"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={deleting === blog.id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete post"
                      >
                        {deleting === blog.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default BlogAdmin
