import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author_id: string;
  category: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
};

// Promise-level request cache to prevent identical parallel fetches (Strict Mode or multi-mounting)
let activeBlogsPromise: Promise<{ data: Omit<Blog, 'content'>[] | null; error: any }> | null = null;

export const fetchPublishedBlogsCached = (forceRefresh = false) => {
  if (forceRefresh) {
    activeBlogsPromise = null;
  }

  if (!activeBlogsPromise) {
    activeBlogsPromise = Promise.resolve(
      supabase
        .from('blogs')
        .select('id, title, slug, excerpt, image_url, created_at, tags, category, author_id, published, updated_at')
        .eq('published', true)
        .order('created_at', { ascending: false })
    )
      .then((res) => {
        // Automatically clear cache after a 2-second window to ensure subsequent navigation loads fresh data
        setTimeout(() => {
          activeBlogsPromise = null;
        }, 2000);
        return res as unknown as { data: Omit<Blog, 'content'>[] | null; error: any };
      })
      .catch((err: any) => {
        activeBlogsPromise = null;
        throw err;
      });
  }
  return activeBlogsPromise!;
};