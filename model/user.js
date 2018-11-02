//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    firstName: String,
    username: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    lastModifiedAt: {
        type : Number,
        default: new Date().getTime()
    }
});

module.exports = mongoose.model('User', UserSchema);