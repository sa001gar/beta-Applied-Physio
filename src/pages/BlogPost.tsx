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
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([])
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

      // Fetch related posts
      if (data) {
        const { data: related } = await supabase
          .from("blogs")
          .select("*")
          .neq("id", data.id)
          .eq("published", true)
          .eq("category", data.category)
          .limit(3)

        setRelatedPosts(related || [])
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
      <main className="pt-32 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <Loader size="large" />
          </div>
        </div>
      </main>
    )
  }

  if (!blog) {
    return (
      <main className="pt-32 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 text-center py-16">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/blog"
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
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
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="pt-32 min-h-screen bg-gray-50">
        <Breadcrumb pageName={blog.title} />

        <article className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
            >
              {/* Featured Image */}
              <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                <img
                  src={blog.image_url || "/placeholder.svg?height=500&width=800"}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src =
                      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop&crop=center&auto=format&q=80"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/90 backdrop-blur-sm text-gray-900">
                    {blog.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-3">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                      isBookmarked ? "bg-yellow-500 text-white" : "bg-white/90 text-gray-700 hover:bg-white"
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>

                    <AnimatePresence>
                      {showShareMenu && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-2 min-w-[200px] z-10"
                        >
                          <button
                            onClick={() => handleShare("twitter")}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <Twitter className="w-4 h-4 text-blue-400" />
                            Share on Twitter
                          </button>
                          <button
                            onClick={() => handleShare("facebook")}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <Facebook className="w-4 h-4 text-blue-600" />
                            Share on Facebook
                          </button>
                          <button
                            onClick={() => handleShare("linkedin")}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <Linkedin className="w-4 h-4 text-blue-700" />
                            Share on LinkedIn
                          </button>
                          <button
                            onClick={() => handleShare()}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {shareSuccess ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-600" />
                            )}
                            {shareSuccess ? "Copied!" : "Copy Link"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Content Header */}
              <div className="p-8 md:p-12">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{getEstimatedReadTime(blog.content)} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>1.2k views</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">{blog.title}</h1>

                {/* Excerpt */}
                <p className="text-xl text-gray-600 leading-relaxed mb-8">{blog.excerpt}</p>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50 text-green-700 border border-green-200"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8"
            >
              <div className="prose prose-lg max-w-none">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  style={{
                    lineHeight: "1.8",
                    fontSize: "18px",
                    color: "#374151",
                  }}
                />
              </div>

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        isLiked
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                      <span>{isLiked ? "Liked" : "Like"}</span>
                    </button>
                    <div className="text-sm text-gray-500">
                      Published in <span className="font-semibold text-gray-700">{blog.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image_url || "/placeholder.svg?height=200&width=400"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src =
                                "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&crop=center&auto=format&q=80"
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-2xl shadow-lg p-6"
            >
              <Link
                to="/blog"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to All Articles
              </Link>
              {relatedPosts.length > 0 && (
                <Link
                  to={`/blog/${relatedPosts[0].slug}`}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  Next Article
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
            </motion.div>
          </div>
        </article>
      </main>

      <style jsx>{`
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .blog-content h1 {
          font-size: 2.25rem;
          line-height: 1.2;
        }

        .blog-content h2 {
          font-size: 1.875rem;
          line-height: 1.3;
          border-bottom: 2px solid #e5f4fd;
          padding-bottom: 0.5rem;
        }

        .blog-content h3 {
          font-size: 1.5rem;
          line-height: 1.4;
        }

        .blog-content h4 {
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .blog-content ul,
        .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }

        .blog-content blockquote {
          border-left: 4px solid #10b981;
          background: #f0fdf4;
          padding: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #166534;
          border-radius: 0 8px 8px 0;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 2rem 0;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }

        .blog-content a {
          color: #2563eb;
          text-decoration: underline;
          font-weight: 500;
        }

        .blog-content a:hover {
          color: #1d4ed8;
        }

        .blog-content strong {
          font-weight: 700;
          color: #1e40af;
        }

        .blog-content em {
          font-style: italic;
          color: #059669;
        }

        .blog-content code {
          background: #f1f5f9;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
          font-size: 0.875rem;
        }

        .blog-content pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1.5rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 2rem 0;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .blog-content th {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          padding: 1rem;
          font-weight: 600;
          text-align: left;
        }

        .blog-content td {
          padding: 0.875rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          color: #374151;
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
      `}</style>
    </>
  )
}

export default BlogPost
