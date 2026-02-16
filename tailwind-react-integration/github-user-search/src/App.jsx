import Search from "./components/Search";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="mx-auto max-w-3xl p-4">
        <h1 className="text-2xl font-bold">GitHub User Search</h1>
        <p className="text-sm text-gray-700">
          Search by username, location, and minimum repos.
        </p>
      </header>
      <Search />
    </div>
  );
}