var express = require('express');
var router = express.Router();
const User = require('../models/User')

router.get('/', async (req, res, next) => {
  const { name, phone, page = 1, sortBy = '_id', sortMode = 'asc' } = req.query
  const params = {}
  const sort = {}
  sort[sortBy] = sortMode

  if (name) {
    params['name'] = new RegExp(name, 'i')
  }

  if (phone) {
    params['phone'] = new RegExp(phone, 'i')
  }

  const limit = 3
  const offset = (page - 1) * limit
  const total = await User.countDocuments(params) 
  const pages = Math.ceil(total / limit)

  try {
    const users = await User.find(params).sort(sort).limit(limit).skip(offset)
    res.json({data: users, page, pages})
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, phone } = req.body
    const user = await User.create({ name, phone })
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, phone } = req.body
    const user = await User.findByIdAndUpdate(req.params.id, { name, phone }, { new: true })
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { name, phone } = req.body
    const user = await User.findByIdAndDelete(req.params.id)
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
