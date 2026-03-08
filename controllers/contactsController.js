const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

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

const getSingle = async (req, res) => {
  try {
    // Added: validate ID format before using it
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        error: 'Invalid ID format. Must be a 24-character hex string.' 
      });
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

module.exports = { getAll, getSingle };