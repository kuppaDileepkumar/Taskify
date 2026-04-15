// src/pages/Register.jsx

import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BASE_URL = "http://localhost:5000/api"

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(`${BASE_URL}/auth/register`, {
        username,
        email,
        password,
      })
      navigate('/login')
    } catch {
      alert('Registration failed')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl w-80">
        <h2 className="text-white text-xl mb-4 text-center">Register</h2>

        <input
          className="w-full p-2 mb-2 rounded"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full p-2 mb-2 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-500 w-full p-2 rounded text-white">
          Register
        </button>
      </form>
    </div>
  )
}