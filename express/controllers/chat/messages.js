var Message = require('../../models/messages').Message;

module.exports = function(req, res){
    console.log("Get all messages requested");
    Message.find(function (err, kittens) {
        if (err) console.log("ERRROR IN MESSAGES FIND", err);

        req.io.socket.emit('messages', kittens);
    });
};