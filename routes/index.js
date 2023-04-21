const routes = require('express').Router();

routes.get('/', require('./contacts'));
routes.get('/:id', require('./contacts'));

module.exports = routes;
