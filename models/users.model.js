const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 8
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    course: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

(async () => {
    try {
        const adminUser = await User.findOne({ username: '00000000' });
        if (!adminUser) {
            await User.create({
                firstName: 'DLSU',
                lastName: 'ADMINISTRATOR',
                username: '00000000',
                password: 'ADMIN-ONLY',
                course: '',
                description: ''
            });
            console.log('Default admin user created successfully.');
        } else {
            console.log('Default admin user already exists.');
        }
    } catch (error) {
        console.error('Error creating default admin user:', error);
    }
})();

module.exports = User;
