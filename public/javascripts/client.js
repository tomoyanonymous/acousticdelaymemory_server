var socket = io.connect();
var receiveddata;

socket.on('connect',function(socket){
console.log('user connected');



});

socket.on('delaylineData',function(msg){
  console.log('received data:' + msg);
  receiveddata = msg;
});

socket.on('disconnect', function(){
    console.log('user disconnected');
  });
function writeDelayline(data){

socket.emit('writeDelayline',data);

}
