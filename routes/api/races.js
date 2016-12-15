const express = require('express');
const router = express.Router();
const { getAllRaces, addRace, deleteRace, deleteSavedRace, getSavedRaces, modifyRace } = require('../../models/race');

  // handle all the routes

  // GET all races to choose from
router.get('/', getAllRaces, (req, res) => {
  res.json(res.races || []);
  // res.json(res.savedraces || []);
});

  // GET all saved races in DB
router.get('/saved', getSavedRaces, (req, res) => {
  res.json(res.saved || []);
});

  // Implement POST to add a race
router.post('/', addRace, (req, res) => {
  res.json({ message: 'Race has been successfully added' });
});

  // Implement PUT to edit/add notes to a race
router.put('/saved', modifyRace, (req, res) => {
  res.json({ message: 'Race has been edited!' });
});

  // Implement DELETE to delete a race from DB (which we dont wanna do)
router.delete('/:id', deleteRace, (req, res) => {
  res.json({ message: 'Race successfully deleted' });
});

// Implement DELETE to delete a race from your schedule
router.delete('/saved/:id', deleteSavedRace, (req, res) => {
  res.json({ message: 'Race successfully deleted' });
});

module.exports = router;
