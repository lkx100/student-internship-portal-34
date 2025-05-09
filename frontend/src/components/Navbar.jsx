const Navbar = ({ onAddNew }) => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Internship Portal</h1>
        <button
          onClick={onAddNew}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Add New Internship
        </button>
      </div>
    </nav>
  )
}

export default Navbar
