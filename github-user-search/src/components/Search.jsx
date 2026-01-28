import { useState } from "react";
import { searchUsers, fetchUserDetails } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runSearch(nextPage, replace) {
    setLoading(true);
    setError("");

    try {
      const data = await searchUsers({
        username,
        location,
        minRepos,
        page: nextPage,
      });

      const detailed = await Promise.all(
        data.items.map(async (u) => {
          try {
            return await fetchUserDetails(u.login);
          } catch {
            return {
              login: u.login,
              avatar_url: u.avatar_url,
              html_url: u.html_url,
              location: null,
              public_repos: null,
              name: null,
            };
          }
        })
      );

      setUsers((prev) => (replace ? detailed : [...prev, ...detailed]));
      setPage(nextPage);
      setHasMore(data.items.length === 10);


      const loaded = (replace ? 0 : users.length) + detailed.length;
      setHasMore(data.items.length === 10);
    } catch {
      setError("Looks like we cant find the user");
      setUsers([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUsers([]);
    setPage(1);
    setHasMore(false);
    await runSearch(1, true);
  }

  async function handleLoadMore() {
    await runSearch(page + 1, false);
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border bg-white p-4 shadow-sm space-y-4"
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            className="rounded-md border px-3 py-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="rounded-md border px-3 py-2"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            className="rounded-md border px-3 py-2"
            placeholder="Min repos"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
          />
        </div>

        <button className="rounded-md bg-black px-4 py-2 text-white">
          Search
        </button>

        {loading && <p className="text-sm">Loading...</p>}
        {!loading && error && <p className="text-sm text-red-600">{error}</p>}
      </form>

      <div className="mt-6 space-y-3">
        {users.map((u) => (
          <div
            key={u.login}
            className="flex items-center gap-4 rounded-lg border bg-white p-4"
          >
            <img
              src={u.avatar_url}
              className="h-16 w-16 rounded-full"
              alt=""
            />
            <div>
              <p className="font-semibold">{u.name || u.login}</p>
              <p className="text-sm">Location: {u.location || "N/A"}</p>
              <p className="text-sm">
                Public repos: {u.public_repos ?? "N/A"}
              </p>
              <a
                href={u.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm underline"
              >
                View profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={handleLoadMore}
          className="mt-4 rounded-md border px-4 py-2"
        >
          Load more
        </button>
      )}
    </div>
  );
}