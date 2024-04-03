const express = require('express');
const mongoose = require('mongoose');
const Room = require('../models/rooms.model');

const router = express.Router();

// Middleware to find a room by its name
async function findRoom(req, res, next) {
  let room;
  try {
    room = await Room.findOne({ name: req.params.name });
    if (room == null) {
      return res.status(404).json({ message: 'Room not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.room = room;
  next();
}

// GET request for listing all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/reserve', async (req, res) => {
  const { roomName, computerId, date, timeSlot, userId } = req.body; // Include userId from request body

  // Validate incoming data
  if (!roomName || !computerId || !date || !timeSlot || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the user already has a reservation for the given date
    const existingReservationForDate = await Room.findOne({
      name: roomName,
      reservations: {
        $elemMatch: { 
          date: date,
          userId: userId
        }
      }
    });

    if (existingReservationForDate) {
      return res.status(400).json({ message: 'You already have a reservation for this date.' });
    }

    // Check if the computer is already reserved for the given date
    const existingReservationForComputer = await Room.findOne({
      name: roomName,
      reservations: {
        $elemMatch: {
          computerId: computerId,
          date: date,
          timeSlot: timeSlot
        }
      }
    });

    if (existingReservationForComputer) {
      return res.status(400).json({ message: 'This computer is already reserved for the given timeslot.' });
    }

    // Find the room by name and add reservation
    const updatedRoom = await Room.findOneAndUpdate(
      { name: roomName },
      { $push: { reservations: { computerId, date, timeSlot, userId } } },
      { new: true }
    );

    console.log(`Reservation added: Computer ${computerId} in room ${roomName} reserved for ${date} at ${timeSlot} by User ${userId}.`);

    res.status(200).json({ message: `Computer ${computerId} in room ${roomName} reserved for ${date} at ${timeSlot} by User ${userId}.` });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/reservelab', async (req, res) => {
  const { roomName, computerId, date, timeSlot, userId } = req.body; // Include userId from request body

  // Validate incoming data
  if (!roomName || !computerId || !date || !timeSlot || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the user already has a reservation for the given date
    const existingReservationForDate = await Room.findOne({
      name: roomName,
      reservations: {
        $elemMatch: { 
          date: date,
          userId: userId
        }
      }
    });

    if (existingReservationForDate) {
      return res.status(400).json({ message: 'You already have a reservation for this date.' });
    }

    // Check if the computer is already reserved for the given date
    const existingReservationForComputer = await Room.findOne({
      name: roomName,
      reservations: {
        $elemMatch: {
          computerId: computerId,
          date: date,
          timeSlot: timeSlot
        }
      }
    });

    if (existingReservationForComputer) {
      return res.status(400).json({ message: 'This computer is already reserved for the given timeslot.' });
    }

    // Find the room by name and add reservation
    const updatedRoom = await Room.findOneAndUpdate(
      { name: roomName },
      { $push: { reservations: { computerId, date, timeSlot, userId } } },
      { new: true }
    );

    console.log(`Reservation added: Room ${roomName} reserved for ${date} at ${timeSlot} by User ${userId}.`);

    res.status(200).json({ message: `Room ${roomName} reserved for ${date} at ${timeSlot} by User ${userId}.` });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/reservations/:roomName', async (req, res) => {
  const { date, timeSlot } = req.query;
  const { roomName } = req.params;

  // Validate incoming data
  if (!date || !timeSlot || !roomName) {
    return res.status(400).json({ message: 'Missing room name, date, or time slot parameter' });
  }

  try {
    const room = await Room.findOne({ name: roomName });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const reservations = room.reservations.filter(reservation => reservation.date === date && reservation.timeSlot === timeSlot);
    
    res.status(200).json({ reservations });
  } catch (error) {
    console.error('Error retrieving reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/reservations/:roomName', async (req, res) => {
  const { date, timeSlot } = req.query;
  const { roomName } = req.params;

  if (!date || !timeSlot || !roomName) {
    return res.status(400).json({ message: 'Missing room name, date, or time slot parameter' });
  }

  try {
    const room = await Room.findOne({ name: roomName });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const filteredReservations = room.reservations.filter(reservation => !(reservation.date === date && reservation.timeSlot === timeSlot));

    room.reservations = filteredReservations;
    await room.save();

    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/reservations', async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: 'Missing date parameter' });
  }

  try {
    const existingReservations = await Room.find({ 'reservations.date': date }, 'name reservations');

    res.status(200).json(existingReservations || []);
  } catch (error) {
    console.error('Error retrieving reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/reservationsview', async (req, res) => {
  const userId = req.headers.userid;

  if (!userId) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  try {
    const reservations = await Room.find({ 'reservations.userId': userId }, 'name reservations');

    res.status(200).json(reservations || []);
  } catch (error) {
    console.error('Error retrieving reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/edit/:reservationId', async (req, res) => {
  const { reservationId } = req.params;
  const { computerId, date, timeSlot } = req.body;

  try {
    const updatedReservation = await Room.findOneAndUpdate(
      { 'reservations._id': reservationId },
      { $set: { 'reservations.$.computerId': computerId, 'reservations.$.date': date, 'reservations.$.timeSlot': timeSlot } },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({ message: 'Reservation updated successfully', reservation: updatedReservation });
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/delete/:reservationId', async (req, res) => {
  const { reservationId } = req.params;

  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { 'reservations._id': reservationId },
      { $pull: { reservations: { _id: reservationId } } },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({ message: 'Reservation deleted successfully', room: updatedRoom });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






module.exports = router;
