var express = require('express');
var router = express.Router();
const User = require('../models/User')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find()
    res.json(users)
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
