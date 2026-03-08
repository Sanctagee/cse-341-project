


const router = require('express').Router();

router.use('/contacts', require('./contactsRoute'));

module.exports = router;