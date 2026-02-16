import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Tailwind CSS + React
        </h1>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Count is {count}
        </button>
        <p className="mt-4 text-green-600 font-semibold">
          ✅ Tailwind CSS is working!
        </p>
      </div>
    </div>
  )
}

export default App