import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import InternshipCard from './components/InternshipCard'
import './App.css'

function App() {
  const [internships, setInternships] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(null)

  useEffect(() => {
    fetchInternships()
  }, [])

  const fetchInternships = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL)
      const data = await response.json()
      setInternships(data)
    } catch (error) {
      console.error('Error fetching internships:', error)
    }
  }

  const handleToggleFavorite = async (internship) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${internship._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...internship, isFavourite: !internship.isFavourite })
      })
      if (response.ok) {
        fetchInternships()
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const handleUpdate = async (internship) => {
    setIsEditing(true)
    setEditData(internship)
  }

  const handleAddNew = async () => {
    const newInternship = {
      company: prompt('Enter company name:'),
      role: prompt('Enter role:'),
      durations: prompt('Enter duration:'),
      isFavourite: false
    }

    if (!newInternship.company || !newInternship.role || !newInternship.durations) {
      return alert('All fields are required!')
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInternship)
      })
      if (response.ok) {
        fetchInternships()
      }
    } catch (error) {
      console.error('Error adding internship:', error)
    }
  }

  const saveUpdate = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${editData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      })
      if (response.ok) {
        setIsEditing(false)
        setEditData(null)
        fetchInternships()
      }
    } catch (error) {
      console.error('Error updating:', error)
    }
  }

  const displayedInternships = showFavorites 
    ? internships.filter(i => i.isFavourite)
    : internships

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onAddNew={handleAddNew} />
      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {showFavorites ? 'Show All' : 'Show Favorites'}
          </button>
        </div>

        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4 font-bold">Update Internship</h2>
              <input
                type="text"
                value={editData.company}
                onChange={(e) => setEditData({...editData, company: e.target.value})}
                className="block w-full mb-2 p-2 border rounded"
                placeholder="Company"
              />
              <input
                type="text"
                value={editData.role}
                onChange={(e) => setEditData({...editData, role: e.target.value})}
                className="block w-full mb-2 p-2 border rounded"
                placeholder="Role"
              />
              <input
                type="text"
                value={editData.durations}
                onChange={(e) => setEditData({...editData, durations: e.target.value})}
                className="block w-full mb-4 p-2 border rounded"
                placeholder="Duration"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={saveUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedInternships.map((internship) => (
            <InternshipCard
              key={internship._id}
              internship={internship}
              onUpdate={handleUpdate}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
