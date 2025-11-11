const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'

// Fetch with timeout wrapper
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 10000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

export interface Post {
  id: string
  title: string
  slug: string
  html_content: string
  meta_title?: string
  meta_description?: string
  og_image?: string
  keywords?: string[]
  published_at: string
  view_count: number
}

export interface PostList {
  id: string
  title: string
  slug: string
  meta_description?: string
  published_at: string
  view_count: number
}

export interface Comment {
  id: string
  author_name: string
  content: string
  created_at: string
}

export interface PostsResponse {
  posts: PostList[]
  total: number
  page: number
  pages: number
}

export async function getPosts(page: number = 1, limit: number = 10): Promise<PostsResponse> {
  const response = await fetchWithTimeout(
    `${API_BASE_URL}/posts?page=${page}&limit=${limit}&status=published`,
    {
      next: { revalidate: 60 }, // Revalidate every minute
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }

  return response.json()
}

export async function getPost(slug: string): Promise<Post> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/posts/${slug}`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Post not found')
    }
    throw new Error('Failed to fetch post')
  }

  return response.json()
}

export async function getComments(postId: string): Promise<Comment[]> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/comments?post_id=${postId}`, {
    next: { revalidate: 30 },
  })

  if (!response.ok) {
    return []
  }

  return response.json()
}

export async function createComment(data: {
  post_id: string
  author_name: string
  password: string
  content: string
}): Promise<Comment> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to create comment')
  }

  return response.json()
}

export async function updateComment(
  commentId: string,
  data: { password: string; content: string }
): Promise<Comment> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to update comment')
  }

  return response.json()
}

export async function deleteComment(commentId: string, password: string): Promise<void> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to delete comment')
  }
}