const { Router } = require('express');

const MoviesNotesController = require('../controllers/MoviesNotesController');

const movieNotesRoutes = Router();

const moviesNotesController = new MoviesNotesController();

movieNotesRoutes.get("/", moviesNotesController.index);
movieNotesRoutes.post("/:user_id", moviesNotesController.create);
movieNotesRoutes.get("/:id", moviesNotesController.show);
movieNotesRoutes.delete("/:id", moviesNotesController.delete);



module.exports = movieNotesRoutes;