import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post } from '../types';
import { fetchPosts, createPost, updatePost, deletePost } from '../services/api';

type Feedback = { type: 'success' | 'error'; message: string } | null;

type PostContextType = {
  posts: Post[];
  loading: boolean;
  feedback: Feedback;
  clearFeedback: () => void;
  addPost: (data: Omit<Post, 'id'>) => Promise<void>;
  editPost: (id: number, data: Omit<Post, 'id'>) => Promise<void>;
  removePost: (id: number) => Promise<void>;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch {
        showFeedback('error', 'Could not load posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const addPost = async (data: Omit<Post, 'id'>) => {
    try {
      const newPost = await createPost(data);
      setPosts((prev) => [newPost, ...prev]);
      showFeedback('success', 'Post created successfully!');
    } catch {
      showFeedback('error', 'Failed to create post.');
      throw new Error('Failed to create post');
    }
  };

  const editPost = async (id: number, data: Omit<Post, 'id'>) => {
    try {
      const updated = await updatePost(id, data);
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...updated, id } : p)));
      showFeedback('success', 'Post updated successfully!');
    } catch {
      showFeedback('error', 'Failed to update post.');
      throw new Error('Failed to update post');
    }
  };

  const removePost = async (id: number) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showFeedback('success', 'Post deleted.');
    } catch {
      showFeedback('error', 'Failed to delete post.');
    }
  };

  return (
    <PostContext.Provider value={{ posts, loading, feedback, clearFeedback: () => setFeedback(null), addPost, editPost, removePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePosts must be used within PostProvider');
  return context;
};
