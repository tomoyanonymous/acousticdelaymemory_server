var dummymessege = 'thisisatestmessege';

function setup(){
var canvas = createCanvas(800,600);
canvas.parent("render");
background(155,140,130,230);
textSize(18);
fill(0,200,100);
rectMode(CORNER);
}

function draw(){
  var data = "hoge";
if(!receiveddata){
  data = dummymessege;
}else{
  data = receiveddata;
  }
  var bindata = "";
  for(var i=0; i < data.length ;i++){
  bindata= bindata + data.charCodeAt(i).toString(2);
}
bindata = ("0000000"+bindata).slice(-8);

  text(data,100,100);
  text(bindata,100,150,200,150);


}

// decode functions
function Decode(data){
    // this.2binary = 2binary(data);
//   for(var i; i<data.length;i++){
//   data.charCodeAt(i);
// }

// Decode.prototype.2Binary= function 2Binary(data){

}



var modalmenu = document.getElementById('modalmenu');
var menubutton = document.getElementById('menubutton');

var closebutton = document.getElementById('closebutton');
console.log(menubutton);
menubutton.addEventListener('click',function(){
  // modalmenu.style.setProperty("display","block");

  modalmenu.style.setProperty("opacity",0.6);
  modalmenu.style.setProperty("z-index",999);

});
closebutton.addEventListener('click',function(){
  // modalmenu.style.setProperty("display","block");

  modalmenu.style.setProperty("opacity",0);
  modalmenu.style.setProperty("z-index",-999);

});
