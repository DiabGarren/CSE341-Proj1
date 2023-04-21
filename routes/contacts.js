const routes = require('express').Router();
const myController = require('../controllers');

routes.get('/', myController.getData);
routes.get('/:id', myController.getContact);

module.exports = routes;