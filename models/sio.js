var socketio = require('socket.io');

module.exports = sio;

var delaylineID;
var ismachineconnected =false;
function sio(server){

  var sio = socketio.listen(server);
  // sio.set('transports',['websocket']);

  //接続
  sio.on('connection',function(socket){
    console.log('user connected. ID is '+ socket.id);

    //ディレイラインのユーザーIDを判別
    socket.on('setDelaylineID',function(msg){
      if(ismachineconnected){
        console.log("refused. already connected.");
      }else{
        delaylineID = socket.id;
        console.log("delaylineID is "+ socket.id);
        var ismachineconnected = true;
      }
    });
    socket.on('unsetDelaylineID',function(){
      if(ismachineconnected){
        var ismachineconnected = false;
        console.log("machine was disconnected.");
      }
    })

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
