const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all contacts
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .find()
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET single contact by id
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: contactId });
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching single contact:', err);
    res.status(500).json({ error: err.message });
  }
};

// POST - create a new contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validate all required fields are present
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: 'All fields are required: firstName, lastName, email, favoriteColor, birthday'
      });
    }

    const newContact = { firstName, lastName, email, favoriteColor, birthday };

    const result = await mongodb
      .getDb()
      .collection('contacts')
      .insertOne(newContact);

    res.status(201).json({
      message: 'Contact created successfully',
      id: result.insertedId
    });
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ error: err.message });
  }
};

// PUT - update a contact by id
const updateContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }

    const contactId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validate all required fields are present
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: 'All fields are required: firstName, lastName, email, favoriteColor, birthday'
      });
    }

    const updatedContact = { firstName, lastName, email, favoriteColor, birthday };

    const result = await mongodb
      .getDb()
      .collection('contacts')
      .replaceOne({ _id: contactId }, updatedContact);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE - delete a contact by id
const deleteContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }

    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };