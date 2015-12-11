var dummymessege = new Uint8Array();
var bindata = new Uint8Array();;
var binarray = [0,0,0,0,0,0,0,0];
var textdata ="";
var numdata = [];
var senddata='';
var canvaswidth;
var canvasheight;
var ismemorytimeout;
var textbox = document.form1.chardata;

function memoryTimeout(state){
   ismemorytimeout = state;
}
var s = function(p){



  p.setup = function (){
    // canvaswidth=window.innerWidth*0.8-1;
    canvaswidth=401;
    // canvasheight=window.innerHeight*0.8-1;
    canvasheight=401;
    var canvas = p.createCanvas(canvaswidth,canvasheight);

    canvas.parent("render");
    p.noStroke();
    p.background(0,0,0,255);
    p.textSize(18);
    p.fill(0,0,0);
    p.rectMode(p.CORNER);
    p.noLoop();
  }

  p.draw = function(){

    p.background(0,0,0,255);
    var data =0;
    if(!receiveddata){
      data = 0;
    }else if(receiveddata === data){
      return;
    }else{
      data = receiveddata;
if(memoryTimeout==true){
  data=null;
}
      // textdata = String.fromCharCode.apply(null,data);
      bindata=  parseInt(data,10).toString(2);

      bindata = ("0000000"+bindata).slice(-8);
        console.log('data',data,'bindata',bindata);
      for(var i=0; i < bindata.length ;i++){
        binarray[i] = bindata.charAt(i);
      }
      // console.log(binarray);
      for(var i=0; i < 8;i++){
        p.fill(binarray[7-i]*255,binarray[7-i]*255,binarray[7-i]*255);
        p.rect(canvaswidth*(7-i)/8,0,canvaswidth/8,canvasheight);
      }
if(data){
        textbox.value=String.fromCharCode(data);
      }else{
        textbox.value="";
      }
        console.log('char='+textbox.value);
      receiveddata='';

    }
  }


  p.mousePressed = function(){
// memoryTimeout(0);
    if (p.mouseX){
    var bitindex = Math.floor(p.mouseX*8/canvaswidth);
  }
    var sendarray = new Uint8Array(binarray);


    if(bitindex > -1 && bitindex < 8 ){
        console.log("clicked. bitindex",bitindex,'mousex',p.mouseX);

        var bit = sendarray[bitindex];
        bit = (bit*-1)+1;
        sendarray[bitindex]=bit;
        console.log('array changed'+sendarray);

        var sendbindata=''; //binarray.toString();
        for(var i=0; i < sendarray.length ;i++){
          sendbindata =  sendbindata += sendarray[i].toString(10);
          console.log(sendbindata);
        }
        senddata = parseInt(sendbindata,2);
        socket.emit('writeDelayline',senddata);
        console.log("data was sent "+ senddata);
    }
  }
  p.touchStarted = function(){
// memoryTimeout(0);
    if (p.touchX){
    var bitindex = Math.floor(p.touchX*8/canvaswidth);
  }
    var sendarray = new Uint8Array(binarray);


    if(bitindex > -1 && bitindex < 8 ){
        console.log("clicked. bitindex",bitindex,'mousex',p.touchX);

        var bit = sendarray[bitindex];
        bit = (bit*-1)+1;
        sendarray[bitindex]=bit;
        console.log('array changed'+sendarray);

        var sendbindata=''; //binarray.toString();
        for(var i=0; i < sendarray.length ;i++){
          sendbindata =  sendbindata += sendarray[i].toString(10);
          console.log(sendbindata);
        }
        senddata = parseInt(sendbindata,2);
        socket.emit('writeDelayline',senddata);
        console.log("data was sent "+ senddata);
    }
  }
}
var p5=new p5(s);

function submitchar(){
  var senddata = textbox.value.charCodeAt(0);
  console.log("data was sent "+ senddata);
  socket.emit('writeDelayline',senddata);
}
function harfchar(obj) {
var v=obj.value;
v=v.replace(/[^0-9a-zA-Z!\"#$%&\'\(\)]/,'');
obj.value=v;
}
var modalmenu = document.getElementById('modalmenu');
var menubutton = document.getElementById('menubutton');

var closebutton = document.getElementById('closebutton');


console.log(menubutton);
menubutton.addEventListener('click',function(){
  // modalmenu.style.setProperty("display","block");

  modalmenu.style.setProperty('opacity',0.8);
  modalmenu.style.setProperty("z-index",999);
  menubutton.style.setProperty("opacity",0);


});
closebutton.addEventListener('click',function(){
  // modalmenu.style.setProperty("display","none");

  modalmenu.style.setProperty('opacity',0);
  modalmenu.style.setProperty("z-index",-999);
  menubutton.style.setProperty("opacity",1);

});
