const express = require('express');
const router = express.Router();
const Temperature = require('../models/Temperature');
const Lga = require('../models/Lga');
const State = require('../models/State');

router.get('/', async (req, res) => {
  try {
    const { lga_id, state_id, year } = req.query;

    const filterYear = year || new Date().getFullYear();

    const records = await Temperature.findAll({
      where: {
        ...(lga_id && { lga_id }),
        year: filterYear
      },
      include: [{
        model: Lga,
        as: 'lga',
        include: [{ model: State, as: 'state' }]
      }],
      order: [['id', 'ASC']]
    });

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

