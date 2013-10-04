var Message = require('../../models/messages').Message;

module.exports = function(req, res){
    var instance = new Message();
    instance.message = req.data.message;

    instance.save(function (err) {
        Message.find(function (err, kittens) {
            if (err) console.log("ERRROR IN MESSAGES FIND", err);
            req.io.socket.emit('messages', kittens);
        });
    });
};