const Event = require('../models/event.model');

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ order: 1 });
    if (!events.length) {
      return res.status(204).json({ message: "No events found" });
    }
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEvent = async (req, res) => {
  if (!req.body?.title) {
    return res.status(400).json({ message: 'title is required' });
  }
  try {
    const result = await Event.create({ 
      title: req.body.title,
      date: req.body.date,
      color: req.body.color,
      order: req.body.order,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

const updateEvent = async (req, res) => {
  if (!req.params?.id) {
    return res.status(400).json({ message: 'ID parameter is required.' });
  }
  try {
    const event = await Event.findOne({ _id: req.params.id });
    if (!event) {
      return res.status(404).json({ message: `No event matches ID ${req.params.id}.` });
    }
    if (req.body?.title !== undefined) event.title = req.body.title;
    if (req.body?.date !== undefined) event.date = req.body.date;
    if (req.body?.color !== undefined) event.color = req.body.color;
    if (req.body?.order !== undefined) event.order = req.body.order;  
    const result = await event.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteEvent = async (req, res) => {
  if (!req.params?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  try {
    const event = await Event.findOne({ _id: req.params.id }).exec();
    if (!event) {
      return res.status(404).json({ message: `No event matches ID ${req.params.id}.` });
    }
    const result = await event.deleteOne();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };