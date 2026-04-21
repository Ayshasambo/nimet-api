const express = require('express');
const router = express.Router();
const Srp = require('../models/Srp');
const Lga = require('../models/Lga');
const State = require('../models/State');

router.get('/', async (req, res) => {
  try {
    const { lga_id, lga_name, state_id, state, year } = req.query;

    const { Op } = require('sequelize');

    // ❗ Require at least one LOCATION filter (not year)
    if (!lga_id && !lga_name && !state_id && !state) {
      return res.status(400).json({
        error: 'At least one location filter is required (state/state_id or lga_id/lga_name)'
      });
    }

    // ✅ Default to current year if not provided
    const filterYear = year || new Date().getFullYear();

    const lgaWhere = {};
    const stateWhere = {};

    // LGA filters
    if (lga_id) {
      lgaWhere.id = lga_id;
    }

    if (lga_name) {
      lgaWhere.name = {
        [Op.like]: `%${lga_name}%`
      };
    }

    // State filters
    if (state_id) {
      stateWhere.id = state_id;
    }

    if (state) {
      stateWhere.name = {
        [Op.like]: `%${state}%`
      };
    }

    const srp = await Srp.findAll({
      attributes: [
        'id', 'onset', 'season_end', 'season_length',
        'annual_rainfall', 'year', 'lga_id'
      ],
      include: [{
        model: Lga,
        as: 'lga',
        attributes: [['name', 'lga_name'], 'state_id'],
        where: Object.keys(lgaWhere).length ? lgaWhere : undefined,
        required: true,
        include: [{
          model: State,
          as: 'state',
          attributes: [['name', 'state_name'], 'id'],
          where: Object.keys(stateWhere).length ? stateWhere : undefined,
          required: true,
        }]
      }],
      where: {
        year: filterYear // ✅ always filter by year (default or provided)
      },
      raw: true,
      nest: true
    });

    const flattened = srp.map(s => ({
      id: s.id,
      onset: s.onset,
      season_end: s.season_end,
      season_length: s.season_length,
      annual_rainfall: s.annual_rainfall,
      year: s.year,
      lga_id: s.lga_id,
      lga_name: s.lga.lga_name,
      state_id: s.lga.state.id,
      state_name: s.lga.state.state_name
    }));

    res.json(flattened);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const { lga_id, state_id, year } = req.query;

//     // Default to current year or use query param
//     const filterYear = year || new Date().getFullYear();

//     const query = {
//       attributes: [
//         'id', 'onset', 'season_end', 'season_length', 'annual_rainfall', 'year',
//         'lga_id'
//       ],
//       include: [{
//         model: Lga,
//         as: 'lga',
//         attributes: [['name', 'lga_name'], 'state_id'],
//         include: [{
//           model: State,
//           as: 'state',
//           attributes: [['name', 'state_name'], 'id']
//         }]
//       }],
//       where: {
//         year: filterYear
//       },
//       raw: true,
//       nest: true
//     };

//     if (lga_id) query.where.lga_id = lga_id;
//     if (state_id) query.include[0].where = { state_id };

//     const srp = await Srp.findAll(query);

//     // Flatten raw result
//     const flattened = srp.map(s => ({
//       id: s.id,
//       onset: s.onset,
//       season_end: s.season_end,
//       season_length: s.season_length,
//       annual_rainfall: s.annual_rainfall,
//       year: s.year,
//       lga_id: s.lga_id,
//       lga_name: s.lga.lga_name,
//       state_id: s.lga.state.id,
//       state_name: s.lga.state.state_name
//     }));

//     res.json(flattened);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const { lga_id, lga_name, state_id, year } = req.query;

//     const filterYear = year || new Date().getFullYear();

//     const lgaWhere = {};
//     const stateWhere = {};

//     // LGA filters
//     if (lga_id) {
//       lgaWhere.id = lga_id;
//     }

//     if (lga_name) {
//       lgaWhere.name = {
//         [require('sequelize').Op.like]: `%${lga_name}%`
//       };
//     }

//     // State filter
//     if (state_id) {
//       stateWhere.id = state_id;
//     }

//     const srp = await Srp.findAll({
//       attributes: [
//         'id', 'onset', 'season_end', 'season_length',
//         'annual_rainfall', 'year', 'lga_id'
//       ],
//       include: [{
//         model: Lga,
//         as: 'lga',
//         attributes: [['name', 'lga_name'], 'state_id'],
//         where: Object.keys(lgaWhere).length ? lgaWhere : undefined,
//         include: [{
//           model: State,
//           as: 'state',
//           attributes: [['name', 'state_name'], 'id'],
//           where: Object.keys(stateWhere).length ? stateWhere : undefined
//         }]
//       }],
//       where: {
//         year: filterYear
//       },
//       raw: true,
//       nest: true
//     });

//     const flattened = srp.map(s => ({
//       id: s.id,
//       onset: s.onset,
//       season_end: s.season_end,
//       season_length: s.season_length,
//       annual_rainfall: s.annual_rainfall,
//       year: s.year,
//       lga_id: s.lga_id,
//       lga_name: s.lga.lga_name,
//       state_id: s.lga.state.id,
//       state_name: s.lga.state.state_name
//     }));

//     res.json(flattened);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;

