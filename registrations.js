const express = require('express');
const Registration = require('../models/Registration');

const router = express.Router();

// Register for an event
router.post('/', async (req, res) => {
    const { event, name, email } = req.body;
    try {
        // Check if the event exists
        const eventDocument = await Event.findOne({ name: event });
        if (!eventDocument) {
            return res.status(400).send({ error: 'Event not found' });
        }

        const registration = new Registration({
            eventId: eventDocument._id,
            name,
            email
        });

        await registration.save();
        res.status(201).send(registration);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all registrations
router.get('/', async (req, res) => {
    try {
        const registrations = await Registration.find().populate('eventId');
        res.send(registrations);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
