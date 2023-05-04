/* eslint-disable no-undef */
const mongodb = require('../db');
const objectId = require('mongodb').ObjectId;

const getData = async (req, res) => {
    /*
      #swagger.description = 'Get ALL contacts'
    */
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getContact = async (req, res) => {
    /*
      #swagger.description = 'Get contact by ID'
    */
    if (!objectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const id = new objectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: id });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createContact = async (req, res) => {
    /*
      #swagger.description = 'Add a new contact'
    */
    if (!objectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a contact.');
    }
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

const updateContact = async (req, res) => {
    /*
      #swagger.description = 'Update a contact by ID'
    */
    if (!objectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a contact.');
    }
    const id = new objectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: id }, contact);
    console.log(response);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const deleteContact = async (req, res) => {
    /*
      #swagger.description = 'Delete contact by ID'
    */
    const id = new objectId(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: id });
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
};

module.exports = { getData, getContact, createContact, updateContact, deleteContact };
