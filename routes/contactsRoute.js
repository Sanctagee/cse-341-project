const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// #swagger.tags = ['Contacts']

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: A list of all contacts
 *       500:
 *         description: Internal server error
 */
router.get('/', contactsController.getAll);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB contact ID
 *     responses:
 *       200:
 *         description: A single contact object
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', contactsController.getSingle);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - favoriteColor
 *               - birthday
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Tony
 *               lastName:
 *                 type: string
 *                 example: Gabito
 *               email:
 *                 type: string
 *                 example: tony@example.com
 *               favoriteColor:
 *                 type: string
 *                 example: orange
 *               birthday:
 *                 type: string
 *                 example: "1990-01-15"
 *     responses:
 *       201:
 *         description: Contact created successfully, returns new contact ID
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Internal server error
 */
router.post('/', contactsController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update an existing contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - favoriteColor
 *               - birthday
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Tony
 *               lastName:
 *                 type: string
 *                 example: Gabito
 *               email:
 *                 type: string
 *                 example: tony.updated@example.com
 *               favoriteColor:
 *                 type: string
 *                 example: blue
 *               birthday:
 *                 type: string
 *                 example: "1990-01-15"
 *     responses:
 *       204:
 *         description: Contact updated successfully
 *       400:
 *         description: Invalid ID format or missing fields
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', contactsController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB contact ID
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', contactsController.deleteContact);

module.exports = router;