var mongoose = require('mongoose'),
    crypto = require('crypto');

mongoose.connect('mongodb://localhost/comparisons');

function required(val) { return val && val.length; }

var Schema = mongoose.Schema;

var MessagesSchema = new Schema({
    message: {
        type: String,
        validate: [required, 'It is required field']
    },
    createdAt: {
        type: Date,
        'default': Date.now
    }
});

Message = mongoose.model('Message', MessagesSchema);
exports.Message = Message;