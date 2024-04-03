const mongoose = require('mongoose');

const computerSchema = new mongoose.Schema({
    computerId: { type: Number, unique: true, index: true }, // Ensure no unintended index on computerId
    isAvailable: Boolean
});

const reservationSchema = new mongoose.Schema({
    reservationId: { type: Number, unique: true }, // Ensure reservationId uniqueness
    computerId: Number,
    date: String,
    timeSlot: String,
    userId: String, // Add userId field to associate the reservation with the user
});


const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true // Ensures uniqueness of room names
    },
    computers: [computerSchema],
    reservations: [reservationSchema]
});


const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
