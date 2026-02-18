import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

function PostsComponent() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  const handlePrefetch = () => {
    queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: fetchPosts });
  };

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : 'Never';

  if (isLoading) {
    return (
      <div>
        <p>⏳ Loading posts for the first time...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p style={{ color: 'red' }}>❌ Error: {error.message}</p>
        <button onClick={handleRefetch}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        padding: '10px',
        backgroundColor: '#f0f0f0',
        marginBottom: '16px',
        borderRadius: '6px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        {isFetching && <span style={{ color: 'blue' }}>🔄 Syncing in background...</span>}
        <span>📦 Posts in cache: {data?.length ?? 0}</span>
        <span>🕐 Last updated: {lastUpdated}</span>

        <button
          onClick={handleRefetch}
          disabled={isFetching}
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          {isFetching ? 'Refreshing...' : '🔃 Refetch Posts'}
        </button>

        <button
          onClick={handlePrefetch}
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          📥 Prefetch (warm cache)
        </button>
      </div>

      <div>
        {data.slice(0, 10).map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '6px',
              padding: '12px',
              marginBottom: '10px',
            }}
          >
            <h3 style={{ margin: '0 0 6px', textTransform: 'capitalize' }}>
              #{post.id} — {post.title}
            </h3>
            <p style={{ margin: 0, color: '#555' }}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsComponent;