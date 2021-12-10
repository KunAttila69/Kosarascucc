var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');
var player = {
    x: 100,
    y: 600,
    width: 80,
    height: 30,
}
var dropX = []
var dropY = []
var dropSpeed = []
var dropColor = []
var elem = 0
var score = 0
var health = 3
var newDrop = 0
window.addEventListener("mousemove",function(event){
    player.x = event.x
})
function RandomDrop(){
    dropX[elem] = Math.random()*canvas.width
    dropY[elem] = 0
    dropSpeed[elem] = (Math.random()*18+10)/4
    dropColor[elem] = "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")"
    elem++
}
RandomDrop()
function PickUp(){
    for (let i = 0; i < elem; i++) {
        if(dropY[i]+25 >= player.y && dropX[i]-50 <= player.x && dropX[i]+50 >= player.x && dropY[i] <= player.y+player.height/2){
            dropX.splice(i,1)
            dropY.splice(i,1)
            dropSpeed.splice(i,1)
            dropColor.splice(i,1)
            elem--
            RandomDrop()
            score++
        }else if (dropY[i] >= canvas.height){
            dropX.splice(i,1)
            dropY.splice(i,1)
            dropSpeed.splice(i,1)
            dropColor.splice(i,1)
            elem--
            health--
            if(health <= 0){location.reload()}
        }
    }
}
function Draw(){
    ctx.fillRect(player.x - 40,player.y,player.width,player.height);
    for (let i = 0; i < elem; i++) {
        ctx.beginPath()
        ctx.arc(dropX[i],dropY[i],25,0,2*Math.PI)
        ctx.fillStyle = dropColor[i]
        ctx.fill()
        ctx.stroke()
        dropY[i] += dropSpeed[i]
    }
    ctx.fillStyle = "red"
    for (let i = 0; i < health; i++) {
        ctx.fillRect(i*75+10,15,50,50);
    }
    ctx.fillStyle = "black"
    ctx.font = "30px Arial"
    ctx.fillText("Score: "+score, 10, 100)
}
function Animate(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Draw();
    PickUp();
    newDrop++
    if(newDrop == 600){RandomDrop(); newDrop = 0}
    requestAnimationFrame(Animate);
}
Animate()