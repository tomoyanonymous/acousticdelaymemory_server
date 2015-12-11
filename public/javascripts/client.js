var socket = io.connect();
var beforedata;
var receiveddata;
var textdata = document.getElementById('textdata');
var submitbutton = document.getElementById('submitbutton');
var ismachineconnected=false;
socket.on('connect',function(socket){
console.log('user connected');



});

socket.on('delaylineData',function(msg){
memoryTimeout(0);
    receiveddata = msg;

    p5.redraw();
    // console.log('received data:' + receiveddata);
});
// socket.on('memorystate',function(msg){
//   ismachineconnected = msg;
// console.log('timeout');
//   p5.redraw();
// });
socket.on('memTimeout2',function(msg){
  memoryTimeout(1);
  console.log('timeout');
    p5.redraw();
})
socket.on('disconnect', function(){
    console.log('user disconnected');
  });
function writeDelayline(data){

socket.emit('writeDelayline',data);

}

// submitbutton.addEventListener('click',function(){
//   socket.emit('writeDelayline',textdata);
//   console.log("data emmited")
// });
