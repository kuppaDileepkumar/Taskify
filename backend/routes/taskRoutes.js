// routes/taskRoutes.js

const express = require('express')
const router = express.Router()

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController')

const authMiddleware = require('../middleware/authMiddleware')

// All routes protected
router.use(authMiddleware)

// GET all tasks
router.get('/', getTasks)

// CREATE task
router.post('/', createTask)

// UPDATE task
router.put('/:id', updateTask)

// DELETE task
router.delete('/:id', deleteTask)

module.exports = router
