const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Room = require('./models/rooms.model');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
    insertOrUpdateSampleRooms(sampleRooms)
        .then(() => console.log('Done processing sample rooms'))
        .catch(err => console.error('Error processing sample rooms:', err));
});


async function insertOrUpdateSampleRoom(sampleRoom) {
    try {
        console.log(`Inserting/updating room: ${sampleRoom.name}`); 
        const updateResult = await Room.updateOne(
            { name: sampleRoom.name }, 
            { $setOnInsert: sampleRoom },
            { upsert: true } 
        );

        if (updateResult.upsertedCount > 0) {
            console.log(`Inserted room: ${sampleRoom.name}`);
        } else if (updateResult.modifiedCount > 0) {
            console.log(`Updated room: ${sampleRoom.name}`);
        } else {
            console.log(`Room already exists: ${sampleRoom.name}`);
        }
    } catch (err) {
        console.error(`Error inserting/updating room ${sampleRoom.name}:`, err);
    }
}


async function insertOrUpdateSampleRooms(sampleRooms) {
    for (const sampleRoom of sampleRooms) {
        await insertOrUpdateSampleRoom(sampleRoom);
    }
}

const sampleRooms = [
    {
        name: 'LS212',
        computers: [
            { computerId: 1, isAvailable: true },
            { computerId: 2, isAvailable: true },
            { computerId: 3, isAvailable: true },
            { computerId: 4, isAvailable: true },
            { computerId: 5, isAvailable: true },
            { computerId: 6, isAvailable: true },
            { computerId: 7, isAvailable: true },
            { computerId: 8, isAvailable: true },
            { computerId: 9, isAvailable: true },
            { computerId: 10, isAvailable: true },
            { computerId: 11, isAvailable: true },
            { computerId: 12, isAvailable: true },
            { computerId: 13, isAvailable: true },
            { computerId: 14, isAvailable: true },
            { computerId: 15, isAvailable: true },
            { computerId: 16, isAvailable: true },
            { computerId: 17, isAvailable: true },
            { computerId: 18, isAvailable: true },
            { computerId: 19, isAvailable: true },
            { computerId: 20, isAvailable: true },
            { computerId: 21, isAvailable: true },
            { computerId: 22, isAvailable: true },
            { computerId: 23, isAvailable: true },
            { computerId: 24, isAvailable: true },
            { computerId: 25, isAvailable: true },
        ],
        reservations: []
    },
    {
        name: 'LS229',
        computers: [
            { computerId: 1, isAvailable: true },
            { computerId: 2, isAvailable: true },
            { computerId: 3, isAvailable: true },
            { computerId: 4, isAvailable: true },
            { computerId: 5, isAvailable: true },
            { computerId: 6, isAvailable: true },
            { computerId: 7, isAvailable: true },
            { computerId: 8, isAvailable: true },
            { computerId: 9, isAvailable: true },
            { computerId: 10, isAvailable: true },
            { computerId: 11, isAvailable: true },
            { computerId: 12, isAvailable: true },
            { computerId: 13, isAvailable: true },
            { computerId: 14, isAvailable: true },
            { computerId: 15, isAvailable: true },
            { computerId: 16, isAvailable: true },
            { computerId: 17, isAvailable: true },
            { computerId: 18, isAvailable: true },
            { computerId: 19, isAvailable: true },
            { computerId: 20, isAvailable: true },
            { computerId: 21, isAvailable: true },
            { computerId: 22, isAvailable: true },
            { computerId: 23, isAvailable: true },
            { computerId: 24, isAvailable: true },
            { computerId: 25, isAvailable: true },
        ],
        reservations: []
    },
    { name: 'G302',
        computers: [
            { computerId: 1, isAvailable: true },
            { computerId: 2, isAvailable: true },
            { computerId: 3, isAvailable: true },
            { computerId: 4, isAvailable: true },
            { computerId: 5, isAvailable: true },
            { computerId: 6, isAvailable: true },
            { computerId: 7, isAvailable: true },
            { computerId: 8, isAvailable: true },
            { computerId: 9, isAvailable: true },
            { computerId: 10, isAvailable: true },
            { computerId: 11, isAvailable: true },
            { computerId: 12, isAvailable: true },
            { computerId: 13, isAvailable: true },
            { computerId: 14, isAvailable: true },
            { computerId: 15, isAvailable: true },
            { computerId: 16, isAvailable: true },
            { computerId: 17, isAvailable: true },
            { computerId: 18, isAvailable: true },
            { computerId: 19, isAvailable: true },
            { computerId: 20, isAvailable: true },
            { computerId: 21, isAvailable: true },
            { computerId: 22, isAvailable: true },
            { computerId: 23, isAvailable: true },
            { computerId: 24, isAvailable: true },
            { computerId: 25, isAvailable: true },
        ],
        reservations: []
    }, 
    {
        name: 'G304A',
        computers: [
            { computerId: 1, isAvailable: true },
            { computerId: 2, isAvailable: true },
            { computerId: 3, isAvailable: true },
            { computerId: 4, isAvailable: true },
            { computerId: 5, isAvailable: true },
            { computerId: 6, isAvailable: true },
            { computerId: 7, isAvailable: true },
            { computerId: 8, isAvailable: true },
            { computerId: 9, isAvailable: true },
            { computerId: 10, isAvailable: true },
            { computerId: 11, isAvailable: true },
            { computerId: 12, isAvailable: true },
            { computerId: 13, isAvailable: true },
            { computerId: 14, isAvailable: true },
            { computerId: 15, isAvailable: true },
            { computerId: 16, isAvailable: true },
            { computerId: 17, isAvailable: true },
            { computerId: 18, isAvailable: true },
            { computerId: 19, isAvailable: true },
            { computerId: 20, isAvailable: true },
            { computerId: 21, isAvailable: true },
            { computerId: 22, isAvailable: true },
            { computerId: 23, isAvailable: true },
            { computerId: 24, isAvailable: true },
            { computerId: 25, isAvailable: true },
        ],
        reservations: []
    },
    {
        name: 'Y602',
        computers: [
            { computerId: 1, isAvailable: true },
            { computerId: 2, isAvailable: true },
            { computerId: 3, isAvailable: true },
            { computerId: 4, isAvailable: true },
            { computerId: 5, isAvailable: true },
            { computerId: 6, isAvailable: true },
            { computerId: 7, isAvailable: true },
            { computerId: 8, isAvailable: true },
            { computerId: 9, isAvailable: true },
            { computerId: 10, isAvailable: true },
            { computerId: 11, isAvailable: true },
            { computerId: 12, isAvailable: true },
            { computerId: 13, isAvailable: true },
            { computerId: 14, isAvailable: true },
            { computerId: 15, isAvailable: true },
            { computerId: 16, isAvailable: true },
            { computerId: 17, isAvailable: true },
            { computerId: 18, isAvailable: true },
            { computerId: 19, isAvailable: true },
            { computerId: 20, isAvailable: true },
            { computerId: 21, isAvailable: true },
            { computerId: 22, isAvailable: true },
            { computerId: 23, isAvailable: true },
            { computerId: 24, isAvailable: true },
            { computerId: 25, isAvailable: true },
        ],
        reservations: []
    },
    {
        name: 'V103',
        computers: [
            { computerId: 1, isAvailable: true },
            { computerId: 2, isAvailable: true },
            { computerId: 3, isAvailable: true },
            { computerId: 4, isAvailable: true },
            { computerId: 5, isAvailable: true },
            { computerId: 6, isAvailable: true },
            { computerId: 7, isAvailable: true },
            { computerId: 8, isAvailable: true },
            { computerId: 9, isAvailable: true },
            { computerId: 10, isAvailable: true },
            { computerId: 11, isAvailable: true },
            { computerId: 12, isAvailable: true },
            { computerId: 13, isAvailable: true },
            { computerId: 14, isAvailable: true },
            { computerId: 15, isAvailable: true },
            { computerId: 16, isAvailable: true },
            { computerId: 17, isAvailable: true },
            { computerId: 18, isAvailable: true },
            { computerId: 19, isAvailable: true },
            { computerId: 20, isAvailable: true },
            { computerId: 21, isAvailable: true },
            { computerId: 22, isAvailable: true },
            { computerId: 23, isAvailable: true },
            { computerId: 24, isAvailable: true },
            { computerId: 25, isAvailable: true },
        ],
        reservations: []
    },
    {
        name: 'J212',
        computers: [
            { computerId: 1, isAvailable: true },
            { computerId: 2, isAvailable: true },
            { computerId: 3, isAvailable: true },
            { computerId: 4, isAvailable: true },
            { computerId: 5, isAvailable: true },
            { computerId: 6, isAvailable: true },
            { computerId: 7, isAvailable: true },
            { computerId: 8, isAvailable: true },
            { computerId: 9, isAvailable: true },
            { computerId: 10, isAvailable: true },
            { computerId: 11, isAvailable: true },
            { computerId: 12, isAvailable: true },
            { computerId: 13, isAvailable: true },
            { computerId: 14, isAvailable: true },
            { computerId: 15, isAvailable: true },
            { computerId: 16, isAvailable: true },
            { computerId: 17, isAvailable: true },
            { computerId: 18, isAvailable: true },
            { computerId: 19, isAvailable: true },
            { computerId: 20, isAvailable: true },
            { computerId: 21, isAvailable: true },
            { computerId: 22, isAvailable: true },
            { computerId: 23, isAvailable: true },
            { computerId: 24, isAvailable: true },
            { computerId: 25, isAvailable: true },
        ],
        reservations: []
    },
    {
        name: 'L320',
        computers: [
            { computerId: 1, isAvailable: true }
        ],
        reservations: []
    },
    {
        name: 'L335',
        computers: [
            { computerId: 1, isAvailable: true }
        ],
        reservations: []
    },
    {
        name: 'G304B',
        computers: [
            { computerId: 1, isAvailable: true }
        ],
        reservations: []
    },
    {
        name: 'G306',
        computers: [
            { computerId: 1, isAvailable: true }
        ],
        reservations: []
    },
    {
        name: 'G404',
        computers: [
            { computerId: 1, isAvailable: true }
        ],
        reservations: []
    },
    {
        name: 'Y603',
        computers: [
            { computerId: 1, isAvailable: true }
        ],
        reservations: []
    },
    {
        name: 'V211',
        computers: [
            { computerId: 1, isAvailable: true }
        ],
        reservations: []
    },
    {
        name: 'V301',
        computers: [
            { computerId: 1, isAvailable: true }
        ],
        reservations: []
    },
    {
        name: 'J213',
        computers: [
            { computerId: 1, isAvailable: true }
        ],
        reservations: []
    },
];

const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');

app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
