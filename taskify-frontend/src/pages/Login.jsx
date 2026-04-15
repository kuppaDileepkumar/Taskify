// src/pages/Login.jsx

import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BASE_URL = "https://taskify-5shq.onrender.com/api"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      })

      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')

    } catch (err) {
      console.log(`${err}`)  
      alert('Login failed')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl w-80">
  <h2 className="text-white text-xl mb-4 text-center">Login</h2>

  <input
    className="w-full p-2 mb-3 rounded"
    placeholder="Email"
    onChange={(e) => setEmail(e.target.value)}
  />

  <input
    type="password"
    className="w-full p-2 mb-3 rounded"
    placeholder="Password"
    onChange={(e) => setPassword(e.target.value)}
  />

  <button className="bg-blue-500 w-full p-2 rounded text-white">
    Login
  </button>

  {/* ✅ Register Button */}
  <button
    type="button"
    onClick={() => navigate('/register')}
    className="mt-3 w-full p-2 rounded text-white border border-gray-500 hover:bg-gray-700"
  >
    Don't have an account? Register
  </button>
</form>
    </div>
  )
}
