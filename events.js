const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.send(events);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
