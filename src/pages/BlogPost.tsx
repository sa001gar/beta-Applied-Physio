"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Calendar,
  Clock,
  Tag,
  Share2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "../lib/supabase"
import type { Blog } from "../lib/supabase"
import Breadcrumb from "../components/Breadcrumb"
import Loader from "../components/Loader"

const BlogPost = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [shareSuccess, setShareSuccess] = useState(false)
  const [relatedPosts, setRelatedPosts] = useState<
    Pick<Blog, "id" | "title" | "slug" | "excerpt" | "image_url" | "created_at" | "category">[]
  >([])
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [showShareMenu, setShowShareMenu] = useState(false)

  useEffect(() => {
    fetchBlog()
  }, [id])

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector("article")
      if (article) {
        const scrollTop = window.scrollY
        const docHeight = article.offsetHeight
        const winHeight = window.innerHeight
        const scrollPercent = scrollTop / (docHeight - winHeight)
        const scrollPercentRounded = Math.round(scrollPercent * 100)
        setReadingProgress(Math.min(scrollPercentRounded, 100))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase.from("blogs").select("*").eq("slug", id).single()

      if (error) throw error
      setBlog(data)

      // Fetch related posts - same category first, then any published posts as fallback
      if (data) {
        const { data: related } = await supabase
          .from("blogs")
          .select("id, title, slug, excerpt, image_url, created_at, category")
          .neq("id", data.id)
          .eq("published", true)
          .eq("category", data.category)
          .limit(4)

        if (related && related.length > 0) {
          setRelatedPosts(related)
        } else {
          // Fallback: fetch any published posts
          const { data: anyPosts } = await supabase
            .from("blogs")
            .select("id, title, slug, excerpt, image_url, created_at, category")
            .neq("id", data.id)
            .eq("published", true)
            .order("created_at", { ascending: false })
            .limit(4)

          setRelatedPosts(anyPosts || [])
        }
      }
    } catch (error) {
      console.error("Error fetching blog:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async (platform?: string) => {
    if (!blog) return

    const shareUrl = window.location.href
    const shareText = `${blog.title} - ${blog.excerpt}`

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      )
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 2000)
      } catch (error) {
        console.error("Error copying to clipboard:", error)
      }
    }
    setShowShareMenu(false)
  }

  const getEstimatedReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <main className="pt-32 min-h-screen bg-white">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-64">
            <Loader variant="inline" />
          </div>
        </div>
      </main>
    )
  }

  if (!blog) {
    return (
      <main className="pt-32 min-h-screen bg-white">
        <div className="container mx-auto text-center py-16">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-500 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/blog"
              className="inline-flex items-center bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition-colors font-medium"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-100 z-50">
        <div
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="pt-24 min-h-screen bg-white">
        <Breadcrumb pageName={blog.title} />

        <article className="py-8">
          <div className="container mx-auto">

            {/* Two-column layout: Blog (left) + Sidebar (right) */}
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-0">

              {/* Left Column - Blog Content */}
              <div className="min-w-0 lg:pr-10">

                {/* Hero Image */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "3/2" }}>
                    <img
                      src={blog.image_url || "/placeholder.svg?height=500&width=800"}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src =
                          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=800&fit=crop&crop=center&auto=format&q=80"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-5 left-5">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">
                        {blog.category}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-5 right-5 flex gap-2">
                      <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-2.5 rounded-xl backdrop-blur-sm transition-all ${isBookmarked ? "bg-yellow-500 text-white" : "bg-white/90 text-gray-600 hover:bg-white"}`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          className="p-2.5 rounded-xl bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white transition-all"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>

                        <AnimatePresence>
                          {showShareMenu && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 8 }}
                              className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-md border border-gray-100 p-1.5 min-w-[180px] z-10"
                            >
                              <button
                                onClick={() => handleShare("twitter")}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <Twitter className="w-4 h-4 text-blue-400" />
                                Twitter
                              </button>
                              <button
                                onClick={() => handleShare("facebook")}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <Facebook className="w-4 h-4 text-blue-600" />
                                Facebook
                              </button>
                              <button
                                onClick={() => handleShare("linkedin")}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <Linkedin className="w-4 h-4 text-blue-700" />
                                LinkedIn
                              </button>
                              <button
                                onClick={() => handleShare()}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                {shareSuccess ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4 text-gray-500" />
                                )}
                                {shareSuccess ? "Copied!" : "Copy Link"}
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Post Header */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-8"
                >
                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400 mb-5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{getEstimatedReadTime(blog.content)} min read</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4" />
                      <span>1.2k views</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-5 tracking-tight">
                    {blog.title}
                  </h1>

                  {/* Excerpt */}
                  <p className="text-lg text-gray-500 leading-relaxed mb-6 font-normal">{blog.excerpt}</p>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-green-50 text-green-700"
                        >
                          <Tag className="w-3 h-3 mr-1.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Divider */}
                <div className="border-t border-gray-100 mb-8" />

                {/* Article Content */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-10"
                >
                  <div className="prose prose-lg max-w-none">
                    <div
                      className="blog-content"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  </div>

                  {/* Article Footer */}
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsLiked(!isLiked)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isLiked
                            ? "bg-red-50 text-red-500 border border-red-100"
                            : "bg-gray-50 text-gray-500 border border-gray-100 hover:bg-gray-100"
                            }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                          <span>{isLiked ? "Liked" : "Like"}</span>
                        </button>
                        <span className="text-sm text-gray-400">
                          Published in <span className="font-medium text-gray-600">{blog.category}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Navigation */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-gray-100"
                >
                  <Link
                    to="/blog"
                    className="flex items-center gap-1.5 text-green-700 hover:text-green-800 font-medium text-sm transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to All Articles
                  </Link>
                  {relatedPosts.length > 0 && (
                    <Link
                      to={`/blog/${relatedPosts[0].slug}`}
                      className="flex items-center gap-1.5 text-green-700 hover:text-green-800 font-medium text-sm transition-colors"
                    >
                      Next Article
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </motion.div>
              </div>

              {/* Right Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hidden lg:block border-l border-gray-100 pl-10"
              >
                <div className="sticky top-24 space-y-8">

                  {/* Post Info */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">About This Post</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(blog.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-gray-500">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{getEstimatedReadTime(blog.content)} min read</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-gray-500">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span>1.2k views</span>
                      </div>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share */}
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Share</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleShare("twitter")}
                        className="p-2.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleShare("facebook")}
                        className="p-2.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleShare("linkedin")}
                        className="p-2.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleShare()}
                        className="p-2.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors"
                      >
                        {shareSuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Related Articles */}
                  {relatedPosts.length > 0 && (
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Related Articles</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((post, index) => (
                          <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * index + 0.3 }}
                          >
                            <Link
                              to={`/blog/${post.slug}`}
                              className="group block rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-all duration-300"
                            >
                              <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
                                <img
                                  src={post.image_url || "/placeholder.svg?height=200&width=300"}
                                  alt={post.title}
                                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.src =
                                      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=267&fit=crop&crop=center&auto=format&q=80"
                                  }}
                                />
                              </div>
                              <div className="p-3.5">
                                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1.5">
                                  <Calendar className="w-3 h-3" />
                                  <span>{formatDate(post.created_at)}</span>
                                </div>
                                <h4 className="font-semibold text-sm text-gray-800 leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                                  {post.title}
                                </h4>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Browse all */}
                  <div className="pt-6 border-t border-gray-100">
                    <Link
                      to="/blog"
                      className="flex items-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
                    >
                      View All Articles
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </motion.aside>
            </div>

          </div>
        </article>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        .blog-content {
          line-height: 1.85;
          font-size: 17px;
          color: #4b5563;
        }

        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          font-weight: 600;
          margin-top: 2.25rem;
          margin-bottom: 0.75rem;
          color: #1f2937;
          letter-spacing: -0.01em;
        }

        .blog-content h1 {
          font-size: 2rem;
          line-height: 1.25;
        }

        .blog-content h2 {
          font-size: 1.625rem;
          line-height: 1.3;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .blog-content h3 {
          font-size: 1.375rem;
          line-height: 1.4;
        }

        .blog-content h4 {
          font-size: 1.125rem;
          line-height: 1.5;
        }

        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.85;
        }

        .blog-content ul,
        .blog-content ol {
          margin: 1.25rem 0;
          padding-left: 1.5rem;
        }

        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.75;
        }

        .blog-content blockquote {
          border-left: 3px solid #16a34a;
          background: #f0fdf4;
          padding: 1.25rem 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #166534;
          border-radius: 0 0.75rem 0.75rem 0;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 2rem 0;
        }

        .blog-content a {
          color: #16a34a;
          text-decoration: underline;
          text-decoration-color: #bbf7d0;
          text-underline-offset: 2px;
          font-weight: 500;
          transition: text-decoration-color 0.2s;
        }

        .blog-content a:hover {
          text-decoration-color: #16a34a;
        }

        .blog-content strong {
          font-weight: 600;
          color: #1f2937;
        }

        .blog-content em {
          font-style: italic;
          color: #6b7280;
        }

        .blog-content code {
          background: #f9fafb;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
          font-size: 0.85rem;
          border: 1px solid #f3f4f6;
        }

        .blog-content pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 2rem 0;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: white;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid #f3f4f6;
        }

        .blog-content th {
          background: #f9fafb;
          color: #374151;
          padding: 0.875rem 1rem;
          font-weight: 600;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        .blog-content td {
          padding: 0.875rem 1rem;
          border-bottom: 1px solid #f3f4f6;
          color: #4b5563;
        }

        .blog-content tr:last-child td {
          border-bottom: none;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      ` }} />
    </>
  )
}

export default BlogPost
