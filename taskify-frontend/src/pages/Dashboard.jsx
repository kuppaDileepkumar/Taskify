import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api"

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [darkMode, setDarkMode] = useState(true)


  const token = localStorage.getItem('token')

  // 🔒 Protect + Load User
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
  

    if (!storedToken) {
      window.location.href = '/login'
    } else {
      fetchTasks()
    }
  }, [])

  // 📥 Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // ➕ Add Task
  const addTask = async () => {
    if (!title.trim()) return

    try {
      await axios.post(
        `${BASE_URL}/tasks`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setTitle('')
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  // ❌ Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  // ✏️ Update Task
  const updateTask = async (id) => {
    if (!editText.trim()) return

    try {
      await axios.put(
        `${BASE_URL}/tasks/${id}`,
        { title: editText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setEditingId(null)
      setEditText('')
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  // ✅ Toggle Complete
  const toggleComplete = async (task) => {
    try {
      await axios.put(
        `${BASE_URL}/tasks/${task._id}`,
        { ...task, completed: !task.completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  // 🔍 Filter Tasks
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  // 🌗 Toggle Theme
  const toggleTheme = () => setDarkMode(!darkMode)

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    window.location.href = '/login'
  }

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen p-6`}>

      {/* 🔝 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Taskify</h1>

        <div className="flex items-center gap-4">

          {/* 🌗 Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 bg-gray-500 rounded"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>


          {/* 🚪 Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>

        </div>
      </div>

      {/* 🔍 Search */}
      <input
        className="p-2 mb-4 w-full rounded text-black"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ➕ Add Task */}
      <div className="flex gap-2 mb-4">
        <input
          className="p-2 text-black flex-1 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new task..."
        />
        <button
          onClick={addTask}
          className="bg-green-500 px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* 📋 Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-400">No tasks found</p>
      ) : (
        filteredTasks.map(task => (
          <div
            key={task._id}
            className="bg-gray-800 p-3 mb-2 flex justify-between items-center rounded"
          >
            <div className="flex items-center gap-2 flex-1">

              {/* ✅ Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
              />

              {/* ✏️ Edit / Text */}
              {editingId === task._id ? (
                <input
                  className="text-black p-1 flex-1 rounded"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span className={task.completed ? 'line-through text-gray-400' : ''}>
                  {task.title}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {editingId === task._id ? (
                <button
                  onClick={() => updateTask(task._id)}
                  className="bg-blue-500 px-2 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(task._id)
                    setEditText(task.title)
                  }}
                  className="bg-yellow-500 px-2 rounded"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}