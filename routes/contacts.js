/* eslint-disable no-undef */
const routes = require('express').Router();
const myController = require('../controllers');

routes.get('/', myController.getData);
routes.get('/:id', myController.getContact);

routes.post('/', myController.createContact);
routes.put('/:id', myController.updateContact);

routes.delete('/:id', myController.deleteContact);

module.exports = routes;