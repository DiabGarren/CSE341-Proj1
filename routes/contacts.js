/* eslint-disable no-undef */
const routes = require('express').Router();
const myController = require('../controllers');
const validation = require('../middleware/validate');

routes.get('/', myController.getData);
routes.get('/:id', myController.getContact);

routes.post('/', validation.saveContact, myController.createContact);
routes.put('/:id', validation.saveContact, myController.updateContact);

routes.delete('/:id', myController.deleteContact);

module.exports = routes;