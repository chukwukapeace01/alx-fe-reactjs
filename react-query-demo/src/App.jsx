import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsComponent from './components/PostsComponent';

// 1. Create a QueryClient instance — this is the core of React Query.
//    It manages caching, background refetching, and stale data logic.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // Data stays "fresh" for 5 minutes
      cacheTime: 1000 * 60 * 10, // Cache persists for 10 minutes after component unmounts
      refetchOnWindowFocus: false, // Don't refetch just because user switches tabs
    },
  },
});

function App() {
  return (
    // 2. Wrap your entire app (or relevant subtree) in QueryClientProvider.
    //    This makes the queryClient available to every component below via context.
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>React Query Demo</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}

export default App;