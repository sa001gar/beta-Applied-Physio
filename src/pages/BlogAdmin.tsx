"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom"
import { PlusCircle, Edit, Trash2, Eye, EyeOff, Loader2, Wand2, Bold, Italic, UnderlineIcon, Link2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "../lib/supabase"
import type { Blog } from "../lib/supabase"
import slugify from "slugify"
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import UnderlineExtension from "@tiptap/extension-underline"
import LinkExtension from "@tiptap/extension-link"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

type BlogFormData = Omit<Blog, "id" | "author_id" | "created_at" | "updated_at">

// Retry configuration
const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000 // 1 second

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [linkUrl, setLinkUrl] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      LinkExtension.configure({
        openOnClick: false,
        linkOnPaste: true,
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setValue("content", editor.getHTML())
    },
  })

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
      editor?.commands.setContent(editingBlog.content)
      setShowForm(true)
    }
  }, [editingBlog, setValue, editor])

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
      setRetryCount(0) // Reset retry count on success
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

  const convertPlainToHTML = (text: string): string => {
    // Split by double newlines for paragraphs
    const paragraphs = text.split(/\n\n+/)

    // Process paragraphs
    const processedParagraphs = paragraphs.map((paragraph) => {
      // Handle lists
      if (/^\d+\.\s/.test(paragraph)) {
        const items = paragraph.split(/\n/).map((item) => item.replace(/^\d+\.\s/, ""))
        return `<ol>${items.map((item) => `<li>${item}</li>`).join("")}</ol>`
      }

      if (/^[*-]\s/.test(paragraph)) {
        const items = paragraph.split(/\n/).map((item) => item.replace(/^[*-]\s/, ""))
        return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`
      }

      // Handle headings
      if (/^#{1,6}\s/.test(paragraph)) {
        const level = paragraph.match(/^(#{1,6})\s/)[1].length
        const content = paragraph.replace(/^#{1,6}\s/, "")
        return `<h${level}>${content}</h${level}>`
      }

      // Handle bold, italic, and underline formatting
      const processed = paragraph
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/__(.*?)__/g, "<u>$1</u>")
        .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" target="_blank">$1</a>')

      return `<p>${processed}</p>`
    })

    return processedParagraphs.join("")
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

      const prompt = `Write a professional, informative blog post about "${topic}" for The Applied Physio, a physiotherapy clinic in Durgapur, India (website: https://appliedphysio.in). Include:

      1. An engaging introduction with a hook
      2. Key points and detailed explanations using professional physiotherapy terminology
      3. Local context relevant to Durgapur/West Bengal when appropriate
      4. Clinical insights and evidence-based information
      5. A conclusion with actionable advice for patients
      6. 3-5 relevant tags for the blog post
      
      Format the content with proper structure including:
      - Use ## for section headings
      - Use **bold** for important terms and concepts
      - Use *italic* for emphasis
      - Use __underline__ for key points
      - Include [linked text](URL) where relevant
      - Use proper paragraphs with line breaks between them
      - Include numbered and bulleted lists where appropriate
      
      Format the response as JSON with these keys:
      {
        "title": "A SEO-friendly title",
        "excerpt": "A compelling 2-3 sentence summary that encourages readers to click",
        "content": "The full structured blog post content with markdown formatting",
        "tags": ["tag1", "tag2", "tag3"],
        "category": "The most appropriate category"
      }`

      const result = await generateWithRetry(model, prompt)
      const response = await result.response
      const text = response.text()

      try {
        // Remove markdown characters and clean the text before parsing JSON
        const cleanedText = text
          .replace(/```json\n?/g, "")
          .replace(/```/g, "")
          .trim()

        // Handle control characters and other invalid JSON characters
        const sanitizedText = cleanedText
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
          .replace(/\n/g, "\\n") // Properly escape newlines
          .replace(/\r/g, "\\r") // Properly escape carriage returns
          .replace(/\t/g, "\\t") // Properly escape tabs
          // Ensure quotes are properly escaped
          .replace(/(?<!\\)"/g, '\\"')
          .replace(/^\\"/, '"') // Fix start quote if over-escaped
          .replace(/\\"$/, '"') // Fix end quote if over-escaped

        // Wrap in quotes and braces if needed
        let jsonReadyText = sanitizedText
        if (!jsonReadyText.startsWith("{")) {
          jsonReadyText = `{${jsonReadyText}`
        }
        if (!jsonReadyText.endsWith("}")) {
          jsonReadyText = `${jsonReadyText}}`
        }

        // Try to parse, handling potential JSON structure issues
        let blogData
        try {
          blogData = JSON.parse(jsonReadyText)
        } catch (parseError) {
          // Alternative approach: extract parts using regex if JSON parsing fails
          console.warn("Initial JSON parse failed, trying regex extraction", parseError)

          const titleMatch = cleanedText.match(/"title"\s*:\s*"([^"]+)"/)
          const excerptMatch = cleanedText.match(/"excerpt"\s*:\s*"([^"]+)"/)
          const contentMatch = cleanedText.match(/"content"\s*:\s*"([^"]+)"/)
          const categoryMatch = cleanedText.match(/"category"\s*:\s*"([^"]+)"/)
          const tagsMatch = cleanedText.match(/"tags"\s*:\s*\[(.*?)\]/)

          blogData = {
            title: titleMatch ? titleMatch[1] : topic,
            excerpt: excerptMatch ? excerptMatch[1] : "",
            content: contentMatch ? contentMatch[1] : cleanedText,
            category: categoryMatch ? categoryMatch[1] : "Physiotherapy",
            tags: tagsMatch
              ? tagsMatch[1].split(",").map((tag) => tag.trim().replace(/^"/, "").replace(/"$/, ""))
              : ["physiotherapy", "health"],
          }
        }

        setValue("title", blogData.title)
        setValue("excerpt", blogData.excerpt)

        // Convert the markdown content to HTML for TipTap
        const htmlContent = convertPlainToHTML(blogData.content)
        setValue("content", htmlContent)
        editor?.commands.setContent(htmlContent)

        setValue("category", blogData.category)
        setValue("tags", blogData.tags.join(", "))

        // Generate a relevant image URL with retry mechanism
        const imagePrompt = `Give me a relevant Freepik image URL for a blog post about ${topic} for a physiotherapy clinic in Durgapur, India. The image should be professional and medical/physiotherapy related. Only return the URL, nothing else.`
        const imageResult = await generateWithRetry(model, imagePrompt)
        const imageUrl = (await imageResult.response).text().trim()
        setValue("image_url", imageUrl)
      } catch (error) {
        console.error("Error parsing AI response:", error)
        alert("Error parsing AI response. Please try again or fill in the form manually.")
      }
    } catch (error: any) {
      console.error("Error generating blog:", error)
      if (error.message?.includes("503")) {
        alert("The AI service is currently experiencing high load. Please try again in a few moments.")
      } else {
        alert("Error generating blog content. Please try again or fill in the form manually.")
      }
    } finally {
      setGenerating(false)
    }
  }

  const onSubmit = async (data: BlogFormData) => {
    setSaving(true)
    try {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) throw new Error("Not authenticated")

      const slug = slugify(data.title, { lower: true, strict: true })

      // Convert comma-separated tags string to array and clean up
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
        content: editor?.getHTML() || data.content, // Get HTML content from editor
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
      editor?.commands.setContent("")
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

  const setLink = () => {
    if (linkUrl) {
      editor?.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
      setLinkUrl("")
      setShowLinkInput(false)
    }
  }

  const unsetLink = () => {
    editor?.chain().focus().unsetLink().run()
    setShowLinkInput(false)
  }

  return (
    <main className="pt-32 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <button
            onClick={() => {
              setEditingBlog(null)
              reset()
              editor?.commands.setContent("")
              setShowForm(!showForm)
            }}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
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
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</h2>
                  <button
                    onClick={generateBlogContent}
                    disabled={generating}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                    {generating ? "Generating..." : "Generate with AI"}
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        {...register("title", { required: "Title is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <input
                        {...register("category", { required: "Category is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      {...register("image_url", { required: "Image URL is required" })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                    <textarea
                      {...register("excerpt", { required: "Excerpt is required" })}
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <div className="border rounded-lg p-1 focus-within:ring-2 focus-within:ring-green-500">
                      {/* Editor Toolbar */}
                      <div className="flex items-center gap-2 p-2 border-b">
                        <button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleBold().run()}
                          className={`p-1 rounded ${editor?.isActive("bold") ? "bg-gray-200" : ""}`}
                          title="Bold"
                        >
                          <Bold className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleItalic().run()}
                          className={`p-1 rounded ${editor?.isActive("italic") ? "bg-gray-200" : ""}`}
                          title="Italic"
                        >
                          <Italic className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleUnderline().run()}
                          className={`p-1 rounded ${editor?.isActive("underline") ? "bg-gray-200" : ""}`}
                          title="Underline"
                        >
                          <UnderlineIcon className="w-5 h-5" />
                        </button>
                        <div className="h-5 w-px bg-gray-300 mx-1"></div>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowLinkInput(!showLinkInput)}
                            className={`p-1 rounded ${editor?.isActive("link") ? "bg-gray-200" : ""}`}
                            title="Link"
                          >
                            <Link2 className="w-5 h-5" />
                          </button>
                          {showLinkInput && (
                            <div className="absolute top-full left-0 mt-1 p-2 bg-white shadow-md rounded-md z-10 flex items-center gap-2">
                              <input
                                type="url"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="px-2 py-1 border rounded w-64"
                              />
                              <button
                                type="button"
                                onClick={setLink}
                                className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                              >
                                Set
                              </button>
                              {editor?.isActive("link") && (
                                <button
                                  type="button"
                                  onClick={unsetLink}
                                  className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                                >
                                  Unset
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="h-5 w-px bg-gray-300 mx-1"></div>
                        <button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                          className={`p-1 rounded ${editor?.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}`}
                          title="Heading 2"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                          className={`p-1 rounded ${editor?.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""}`}
                          title="Heading 3"
                        >
                          H3
                        </button>
                        <div className="h-5 w-px bg-gray-300 mx-1"></div>
                        <button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleBulletList().run()}
                          className={`p-1 rounded ${editor?.isActive("bulletList") ? "bg-gray-200" : ""}`}
                          title="Bullet List"
                        >
                          • List
                        </button>
                        <button
                          type="button"
                          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                          className={`p-1 rounded ${editor?.isActive("orderedList") ? "bg-gray-200" : ""}`}
                          title="Ordered List"
                        >
                          1. List
                        </button>
                      </div>

                      {/* TipTap Editor */}
                      <div className="prose max-w-none">
                        <EditorContent editor={editor} className="min-h-[300px] p-4 focus:outline-none" />
                      </div>

                      {/* Bubble Menu for selected text */}
                      {editor && (
                        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                          <div className="bg-white shadow-lg rounded-md flex items-center p-1">
                            <button
                              onClick={() => editor.chain().focus().toggleBold().run()}
                              className={`p-1 rounded ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
                            >
                              <Bold className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => editor.chain().focus().toggleItalic().run()}
                              className={`p-1 rounded ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
                            >
                              <Italic className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => editor.chain().focus().toggleUnderline().run()}
                              className={`p-1 rounded ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
                            >
                              <UnderlineIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                const previousUrl = editor.getAttributes("link").href
                                const url = window.prompt("URL", previousUrl)

                                if (url === null) {
                                  return
                                }

                                if (url === "") {
                                  editor.chain().focus().extendMarkRange("link").unsetLink().run()
                                  return
                                }

                                editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
                              }}
                              className={`p-1 rounded ${editor.isActive("link") ? "bg-gray-200" : ""}`}
                            >
                              <Link2 className="w-4 h-4" />
                            </button>
                          </div>
                        </BubbleMenu>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                    <input
                      {...register("tags")}
                      placeholder="physiotherapy, rehabilitation, health"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Enter tags separated by commas (e.g., physiotherapy, sports, health)
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("published")}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label className="text-sm font-medium text-gray-700">Publish immediately</label>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setEditingBlog(null)
                        reset()
                        editor?.commands.setContent("")
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
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
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {blogs.map((blog) => (
              <motion.div key={blog.id} layout className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h3>
                      <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Category: {blog.category}</span>
                        <span>•</span>
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
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
                        className="p-2 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={deleting === blog.id}
                        className="p-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === blog.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {blog.tags &&
                        blog.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{blog.published ? "Published" : "Draft"}</span>
                    <RouterLink
                      to={`/blog/${blog.slug}`}
                      target="_blank"
                      className="text-sm text-green-600 hover:underline"
                    >
                      View Post
                    </RouterLink>
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
