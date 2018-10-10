//for animating solar system model

// var spaceBodies = {
//     sun: {
//         objectRadius: 100,
//         orbitSpeed: 20,
//         orbitRadius: 0,
//         orbitDirection: "clockwise",
//         color: "yellow"
//     },
//     mercury: {
//         objectRadius: 20,
//         orbitSpeed: 50,
//         orbitRadius: ,
//         orbitDirection: "clockwise",
//         color: "yellow"
//     } 
// }

//drawing on canvas
var orbit = true;
var x = 100;
var y = 0;
var angle = 0;
var radius = 0;

var canvas = document.getElementById("foreground");
//needed for drawing on canvas
var ctx = canvas.getContext("2d");

setInterval(drawOrbit, 20)

function drawOrbit() {
    console.log("orbitting");

    //clearing canvas
    ctx.clearRect(0, 0, 350, 350);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //drawing sun
    ctx.fillStyle = "black";
    
        ctx.beginPath();
        ctx.arc(150, 150, 40 + radius, 0, 2 * Math.PI);
        if (radius <= 95) {
        //radius += 5;
        ctx.fillStyle = "yellow";
    }
    else {
        ctx.fillStyle = "red";
    }
        ctx.stroke();
        ctx.fill();
    

    //drawing text
    ctx.fillStyle = "white";
    //ctx.fill();
    ctx.font = "30px Arial";
    ctx.fillText("The Solar System", 90, 330);

    //drawing planet
    if (radius <= 45) {
        //drawing planet's orbit
        ctx.beginPath();
        ctx.arc(150, 150, 100, 0, 2 * Math.PI);
        ctx.stroke();
        // ctx.fill();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(150 + x, 150 + y, 20, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
    }

    angle += Math.PI / 100;

    x = 100 * Math.cos(angle);
    y = 100 * Math.sin(angle);
}