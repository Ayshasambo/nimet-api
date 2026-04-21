const express = require('express');
const router = express.Router();
const State = require('../models/State');

router.get('/', async (req, res) => {
  try {
    const states = await State.findAll({
      attributes: ['id', 'name']
    });
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const newState = await State.create({ name });
    res.status(201).json(newState);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
