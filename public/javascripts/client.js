var socket = io.connect();
var receiveddata;
var textdata = document.getElementById('textdata');
var submitbutton = document.getElementById('submitbutton');

socket.on('connect',function(socket){
console.log('user connected');



});

socket.on('delaylineData',function(msg){
  console.log('received data:' + msg);
  receiveddata = new Uint8Array(msg);
});

socket.on('disconnect', function(){
    console.log('user disconnected');
  });
function writeDelayline(data){

socket.emit('writeDelayline',data);

}

submitbutton.addEventListener('click',function(){
  socket.emit('writeDelayline',textdata);
  console.log("data emmited")
});
