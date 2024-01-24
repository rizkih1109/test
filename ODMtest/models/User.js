const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: String,
    phone: String,
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
}, {
    timestamps: true
});

module.exports = model('User', userSchema);