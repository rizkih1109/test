const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: String,
    phone: String
}, {
    timestamps: true
});

module.exports = model('User', userSchema);