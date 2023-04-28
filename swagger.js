/* eslint-disable no-undef */
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Contacts API',
    },
    host: 'cse341-proj1.onrender.com',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);

swaggerAutogen(outputFile, endpointFiles, doc).then(async () => {
    await import('./server.js');
});