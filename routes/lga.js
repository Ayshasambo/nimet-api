const express = require('express');
const router = express.Router();
const Lga = require('../models/Lga');

router.get('/', async (req, res) => {
  try {
    const { name, state_id } = req.query;

    // if (!state_id) {
    //   return res.status(400).json({ error: 'state_id query parameter is required' });
    // }

    const where = {};
    if (state_id) where.state_id = state_id;
    if (name) where.name = name;

    const lgas = await Lga.findAll({
      where,
      attributes: ['id', 'name', 'state_id']
    });

    res.json(lgas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, state_id } = req.body;

    if (!name || !state_id) {
      return res.status(400).json({ error: 'Name and state_id are required' });
    }

    const newLga = await Lga.create({ name, state_id });
    res.status(201).json(newLga);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

