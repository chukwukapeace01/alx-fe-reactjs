import { useParams, Link } from 'react-router-dom';

const blogData = {
  'react-hooks-guide': {
    title: 'Complete Guide to React Hooks',
    author: 'Jane Smith',
    date: 'January 15, 2024',
    content: 'React Hooks allow functional components to manage state and side effects. The most common hooks are useState, useEffect, and useContext. Custom hooks let you extract reusable stateful logic across components.',
  },
  'react-router-v6': {
    title: 'Mastering React Router v6',
    author: 'John Doe',
    date: 'February 2, 2024',
    content: 'React Router v6 introduced Routes, nested routes with Outlet, the useNavigate hook, and relative paths. Protected routes are now cleanly implemented with wrapper components that check auth state.',
  },
};

const BlogPost = () => {
  const { postId } = useParams();
  const post = blogData[postId];

  if (!post) {
    return (
      <div>
        <h2>Post Not Found</h2>
        <p>No blog post found with ID: <code>{postId}</code></p>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">← Back to Home</Link>
      <h1 style={{ marginTop: '1rem' }}>{post.title}</h1>
      <p><strong>Author:</strong> {post.author} &nbsp;|&nbsp; <strong>Date:</strong> {post.date}</p>
      <p style={{ marginTop: '1rem', lineHeight: '1.7' }}>{post.content}</p>
      <p style={{ marginTop: '1rem', color: '#888', fontSize: '0.85rem' }}>
        URL parameter used: <code>postId = "{postId}"</code>
      </p>
    </div>
  );
};

export default BlogPost;