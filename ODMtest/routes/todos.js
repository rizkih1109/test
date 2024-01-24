var express = require('express');
var router = express.Router();
const Todo = require('../models/Todo');
const User = require('../models/User');

router.get('/', async (req, res, next) => {
  const { title,complete, executor, page = 1, sortBy = '_id', sortMode = 'asc' } = req.query
  const params = {}
  const sort = {}
  sort[sortBy] = sortMode

  if (title) {
    params['title'] = new RegExp(title, 'i')
  }

  if (complete) {
    params['complete'] = new RegExp(complete, 'i')
  }

  if (executor) {
    params['executor'] = new RegExp(executor, 'i')
  }

  const limit = 3
  const offset = (page - 1) * limit
  const total = await Todo.countDocuments(params) 
  const pages = Math.ceil(total / limit)

  try {
    const todos = await Todo.find(params).populate('executor').sort(sort).limit(limit).skip(offset)
    res.json({data: todos, page, pages})
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, executor } = req.body
    const todo = await Todo.create({ title, executor })
    const user = await User.findById(executor)
    user.todos.push(todo)
    await user.save()
    res.json(todo)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { title, complete } = req.body
    const todo = await Todo.findByIdAndUpdate(req.params.id, { title, complete }, { new: true })
    res.json(todo)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    res.json(todo)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
