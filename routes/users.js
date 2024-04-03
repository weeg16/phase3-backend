const router = require('express').Router();
const User = require('../models/users.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const { firstName, lastName, username, password } = req.body;
    const newUser = new User({ firstName, lastName, username, password });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post(async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            throw new Error('User not found or invalid credentials');
        }
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.route('/register').post(async (req, res) => {
    const { firstName, lastName, username, password } = req.body;


    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }


    const newUser = new User({ firstName, lastName, username, password, course: '', description: '' });


    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});


router.route('/:username').get(async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.route('/:username').put(async (req, res) => {
    const username = req.params.username;
    const { course, description } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $set: { course, description } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.route('/:username').delete(async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ username: req.params.username });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.route('/:username').put(async (req, res) => {
    const username = req.params.username;
    const { firstName, lastName, password } = req.body;

    try {
        console.log('Received PUT request for user:', username);
        console.log('Updated user details:', { firstName, lastName, password });

        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $set: { firstName, lastName, password } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User details updated successfully:', updatedUser);
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;
