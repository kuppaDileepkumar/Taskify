// controllers/taskController.js

const Task = require('../models/Task')

// GET tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.userId })
  res.json(tasks)
}

// CREATE task
exports.createTask = async (req, res) => {
  const { title } = req.body

  const task = await Task.create({
    title,
    user: req.user.userId,
  })

  res.status(201).json(task)
}

// UPDATE task
exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) return res.status(404).json({ message: 'Task not found' })

  if (task.user.toString() !== req.user.userId) {
    return res.status(401).json({ message: 'Not authorized' })
  }

  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.json(updated)
}

// DELETE task
exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) return res.status(404).json({ message: 'Task not found' })

  if (task.user.toString() !== req.user.userId) {
    return res.status(401).json({ message: 'Not authorized' })
  }

  await task.deleteOne()

  res.json({ message: 'Task deleted' })
}
