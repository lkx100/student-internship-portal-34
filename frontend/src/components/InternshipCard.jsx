const InternshipCard = ({ internship, onUpdate, onToggleFavorite }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <button
        onClick={() => onToggleFavorite(internship)}
        className="absolute top-4 right-4"
      >
        {internship.isFavourite ? (
          <span className="text-2xl text-yellow-500">★</span>
        ) : (
          <span className="text-2xl text-gray-400">☆</span>
        )}
      </button>
      <h3 className="text-xl font-bold text-gray-800">{internship.company}</h3>
      <p className="text-gray-600 mt-2">Role: {internship.role}</p>
      <p className="text-sm text-gray-500 mt-1">Duration: {internship.durations}</p>
      <button
        onClick={() => onUpdate(internship)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Update
      </button>
    </div>
  )
}

export default InternshipCard
