const { Router } = require('express');

const GeneroController = require('../controllers/GeneroController');

const generoRoutes = Router();

const generoController = new GeneroController();

generoRoutes.get("/:user_id", generoController.index);


module.exports = generoRoutes;