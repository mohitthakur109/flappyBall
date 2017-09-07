// need to create two variable one for canvas object
//and another one to draw context for canvas
var canvas=document.getElementById('myCanvas');
var ctx= canvas.getContext('2d'); // return the drawing context on the canvas
var canvas1=document.getElementById('myScore');
var ctx1= canvas1.getContext('2d');
var gap=50;
var towerUpperHeight1=canvas.height/2;
var towerLowerHeight1=towerUpperHeight1-gap;

var towerUpperHeight2=canvas.height/3;
var towerLowerHeight2=canvas.height-towerUpperHeight2+gap;

var towerUpperHeight3=canvas.height/4;
var towerLowerHeight3=canvas.height-(towerUpperHeight3+gap);

var towerX1=canvas.width/2-canvas.width/5;
var towerX2=towerX1+canvas.width/3;
var towerX3=towerX2+canvas.width/3;

var towerU1=towerUpperHeight1;
var towerL1=towerLowerHeight1;

var towerU2=towerUpperHeight2;
var towerL2=towerLowerHeight2;

var towerU3=towerUpperHeight3;
var towerL3=towerLowerHeight3;
var rightPressed=false;
var leftPressed=false;
var ballY=canvas.height/2;
var ballX=20;
var towerY1=towerU1;
var towerY2=towerU2;
var towerY3=towerU3;
var colorArray=["red","blue","orange"];
var score=0;
var audio;
document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);

function keyDownHandler(e){
	if(e.keyCode==32){
	leftPressed=true;
	}
}
function keyUpHandler(e){

   if(e.keyCode==32){
	leftPressed=false;
	}

}
function drawScore(){
	ctx1.font="16px Arial";
	ctx1.fillStyle="#A217B3";
	ctx1.fillText("Score: "+score,8,20); 
	//last two are x and y coordinate
}


function drawTower(count,x,towery,towerHeight){
   
	ctx.beginPath();
	ctx.rect(x,towery,20,towerHeight);
	ctx.fillStyle=colorArray[count];
	ctx.fill(); 
	ctx.closePath();
	
}
function drawBall(){
   
	ctx.beginPath();
	ctx.arc(ballX,ballY,10,0,Math.PI*2); 
	ctx.fillStyle="green";
	ctx.fill(); 
	ctx.closePath();
}

function change1(){
   if(towerUpperHeight1<=gap+10){
	towerUpperHeight1=towerU1;
	towerLowerHeight1=towerL1;
	towerY1=towerU1;
	}else {
	towerUpperHeight1-=gap;
	towerLowerHeight1+=gap;
	towerY1+=gap;
	}
}

function change2(){
   if(towerUpperHeight2<=gap+10){
	towerUpperHeight2=towerU2;
	towerLowerHeight2=towerL2;
	towerY2=towerU2;
	}else {
	towerUpperHeight2-=gap;
	towerLowerHeight2+=gap;
	towerY2+=gap;
	}
}
function change3(){
   if(towerUpperHeight3<=gap+10){
	towerUpperHeight3=towerU3;
	towerLowerHeight3=towerL3;
	towerY3=towerU3;
	}else {
	towerUpperHeight3-=gap;
	towerLowerHeight3+=gap;
	towerY3+=gap;
	}
}
function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx1.clearRect(0,0,canvas1.width,canvas1.height);
	drawBall();
	drawScore();
	drawTower(0,towerX1,0,towerUpperHeight1);
	drawTower(0,towerX1,towerUpperHeight1+gap,towerLowerHeight1);
	
	drawTower(1,towerX2,0,towerUpperHeight2);
	drawTower(1,towerX2,towerUpperHeight2+gap,towerLowerHeight2);
	drawTower(2,towerX3,0,towerUpperHeight3);
	drawTower(2,towerX3,towerUpperHeight3+gap,towerLowerHeight3);
	towerX1--;
	towerX2--;
	towerX3--;
	if(towerX1<-15){towerX1=canvas.width; score++; change1();}
	if(towerX2<-15){towerX2=canvas.width; score++; change2();}
	if(towerX3<-15){towerX3=canvas.width; score++; change3();}
	if(leftPressed){
	 ballY-=4;
	} ballY+=2;
	if(ballX+10>towerX1&&!(ballY-7>towerUpperHeight1&&ballY+7<(towerUpperHeight1+gap))||ballX+10>towerX2&&!(ballY-7>towerUpperHeight2&&ballY+7<(towerUpperHeight2+gap))||ballX+10>towerX3&&!(ballY-7>towerUpperHeight3&&ballY+7<(towerUpperHeight3+gap))){
		audio.pause();
	   alert("game over "+score);
		document.location.reload();
	}
	
	
}
function startGame() {
    
   audio = new Audio('audio_file.wav');
   audio.play();
   audio.loop=true;
}

setInterval(draw,18);