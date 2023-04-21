const mongodb = require('../db');

const returnPerson = (req, res, next) => {
    res.json('Maeve Human');
};

const getData = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getContact = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        lists.forEach((contact) => {
            if (contact._id == req.params.id) {
                res.status(200).json(contact);
            }
        })
    });
};

module.exports = { returnPerson, getData, getContact };
