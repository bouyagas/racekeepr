const db = require('../database/db');

function getAllRaces(req, res, next) {
  db.any('SELECT * from races ORDER by race_date ASC;')
    .then((races) => {
      res.races = races;
      next();
    })
    .catch(error => next(error));
}

function getSavedRaces(req, res, next) {
  // console.log('saved stuff')
  db.any('SELECT * from savedraces ORDER by race_date ASC;')
    .then((saved) => {
      // console.log(saved)
      res.saved = saved;
      next();
    })
    .catch(error => next(error));
}

function addRace(req, res, next) {
  db.none(`INSERT INTO savedraces (name, race_date, location, distance, url) VALUES ($1, $2, $3, $4, $5)`, [req.body.name, req.body.race_date, req.body.location, req.body.distance, req.body.url])
    .then(next())
    .catch(err => next(err));
}

function deleteRace(req, res, next) {
  db.none(`DELETE FROM races WHERE id = $1;`, [req.params.id])
    .then(next())
    .catch(err => next(err));
}

function deleteSavedRace(req, res, next) {
  db.none(`DELETE FROM savedraces WHERE id = $1;`, [req.params.id])
    .then(next())
    .catch(err => next(err));
}

function modifyRace(req, res, next) {
  console.log(req.body.notes);
  console.log(req.body.id);
  db.none(`UPDATE savedraces
           SET notes = $1
           WHERE id = $2;`,
           [req.body.notes, req.body.id])
  .then(() => console.log('Update complete!'))
  .then(next())
  .catch(err => next(err));
}

module.exports = {
  getAllRaces,
  addRace,
  deleteRace,
  deleteSavedRace,
  getSavedRaces,
  modifyRace
};
