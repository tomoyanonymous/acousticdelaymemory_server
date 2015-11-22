var socketio = require('socket.io');

module.exports = sio;

var delaylineID;

function sio(server){

  var sio = socketio.listen(server);
  sio.set('transports',['websocket']);

  //接続
  sio.on('connection',function(socket){
    console.log('user connected.');

    //ディレイラインのユーザーIDを判別
    socket.on('setDelaylineID',function(msg){
      if(delaylineID){
        console.log('ID of delayline was overwrited to' +socket.id);
      }
      delaylineID = socket.id;
    });

    socket.on('serialMsg',function(msg){

      if(socket.id !=delaylineID){
        console.log('invalid ID'+socket.id);
      }else{
        socket.broadcast.emit("delaylineData",msg);
      }
    });

    socket.on('writeDelayline',function(msg){
      socket.to(delaylineID).emit('serialwrite',msg);
    });

  });
}
