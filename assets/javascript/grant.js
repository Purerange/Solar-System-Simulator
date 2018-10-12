//for animating solar system model

var spaceBodies = {
    sun: {
        radius: 100,
        revolution: 200, //in earth days
        sunDistance: 0,
        orbitDirection: "clockwise",
        color: "yellow"
    },
    mercury: {
        radius: 20,
        revolution: 87.97,
        orbitRadius: 20,
        orbitDirection: "clockwise",
        color: "orangered"
    } 
}

//drawing on canvas
var x = 100;
var y = 0;
var angle = 0;
var radius = 0;

//needed for drawing on canvas
var canvas = document.getElementById("solarSystem");
var ctx = canvas.getContext("2d");

//runs at 60fps
setInterval(animateSolarSystem, 1000/60);

function animateSolarSystem() {
    //clearing canvas
    ctx.clearRect(0, 0, 350, 350);

    var borderWidth = 2;
    var width = canvas.width;
    var height = canvas.height;
    
    //creating black background, white border
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.fillRect(borderWidth, borderWidth, width - 2*borderWidth, height - 2*borderWidth);

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

//draws the orbit paths for all the planets
function drawOrbits() {
    for (var key in spaceBodies) {
        if (p.hasOwnProperty(key)) {
            console.log(key + " -> " + p[key]);
        }
    }
}