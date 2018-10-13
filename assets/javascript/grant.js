//file containing code for animating solar system model
$(document).ready(function () {

    var spaceBodies = {
        sun: {
            name: "Sun",
            radius: 55,
            revolution: 100, //in earth days
            sunDistance: 2, //this is actually distance from baricenter
            orbitDirection: "clockwise",
            angle: 0,
            color: "yellow",
            img: "assets/images/sun.png",
        },
        mercury: {
            name: "Mercury",
            radius: 10,
            revolution: 88,
            sunDistance: 80,
            orbitDirection: "clockwise",
            angle: 0,
            color: "lightgrey",
            img: "assets/images/mercury.png"
        },
        venus: {
            name: "Venus",
            radius: 15,
            revolution: 225,
            sunDistance: 107,
            orbitDirection: "counterclockwise",
            angle: 0,
            color: "gold",
            img: "assets/images/venus.png"
        },
        earth: {
            name: "Earth",
            radius: 16,
            revolution: 365,
            sunDistance: 145,
            orbitDirection: "clockwise",
            angle: 0,
            color: "green",
            img: "assets/images/earth2.png"
        },
        mars: {
            name: "Mars",
            radius: 12,
            revolution: 687,
            sunDistance: 188,
            orbitDirection: "clockwise",
            angle: 0,
            color: "red",
            img: "assets/images/mars.png"
        },
        ceres: {
            name: "Ceres",
            radius: 5,
            revolution: 1682,
            sunDistance: 214,
            orbitDirection: "clockwise",
            angle: 0,
            color: "white",
            img: "assets/images/ceres.png"
        },
        jupiter: {
            name: "Jupiter",
            radius: 42,
            revolution: 12 * 365,
            sunDistance: 270,
            orbitDirection: "clockwise",
            angle: 0,
            color: "orange",
            img: "assets/images/jupiter.png"
        },
        saturn: {
            name: "Saturn",
            radius: 30 * 2,
            revolution: 29 * 365,
            sunDistance: 360,
            orbitDirection: "clockwise",
            angle: 0,
            color: "khaki",
            img: "assets/images/saturnScaled.png"
        },
        uranus: {
            name: "Uranus",
            radius: 25,
            revolution: 84 * 365,
            sunDistance: 435,
            orbitDirection: "counterclockwise",
            angle: 0,
            color: "turquoise",
            img: "assets/images/uranus.png"
        },
        neptune: {
            name: "Neptune",
            radius: 20,
            revolution: 165 * 365,
            sunDistance: 485,
            orbitDirection: "clockwise",
            angle: 0,
            color: "blue",
            img: "assets/images/neptune.png"
        }
    }

    //runs at 60fps
    setInterval(animateSolarSystem, 1000 / 60);

    //needed for drawing on canvas
    var canvas = document.getElementById("solarSystem");
    var ctx = canvas.getContext("2d");

    //helpful canvas values
    var width = canvas.width;
    var height = canvas.height;
    var originX = width / 2;
    var originY = height / 2;

    //ctx.scale(.75,.75);

    function animateSolarSystem() {

        //clearing canvas
        ctx.clearRect(0, 0, width, height);

        //creating black background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);

        //shading asteroid belt
        ctx.fillStyle = "#3b3939";
        ctx.beginPath();
        ctx.arc(originX, originY, spaceBodies.jupiter.sunDistance, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(originX, originY, spaceBodies.mars.sunDistance, 0, 2 * Math.PI);
        ctx.fill();

        ctx.lineWidth = 1;

        //drawing all the planets for this particular instance of time
        $.each(spaceBodies, function (key, planet) {
            //console.log(key);
            //console.log(planet);
            //console.log(key.color);

            //drawing planet orbit
            if (planet !== "Sun") {
                ctx.strokeStyle = "#828180";
                ctx.beginPath();
                ctx.arc(originX, originY, planet.sunDistance, 0, 2 * Math.PI);
                ctx.stroke();
            }

            //drawing the planet
            var x = originX + planet.sunDistance * Math.cos(planet.angle);
            var y = originY + planet.sunDistance * Math.sin(planet.angle);

            planetX = x - planet.radius;
            planetY = y - planet.radius;

            // ctx.fillStyle = planet.color;
            // ctx.beginPath();
            // ctx.arc(x, y, planet.radius, 0, 2 * Math.PI);
            // ctx.fill();

            var img = new Image();
            img.src = planet.img;

            ctx.drawImage(img, planetX, planetY, planet.radius * 2, planet.radius * 2);

            //writing planet name
            ctx.font = "15px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";

            var textX = x;
            var textY = y + planet.radius + 10;
            //special coordinates for saturn
            if(planet.name === "Saturn") {
                textY = y + planet.radius/2 + 5;
            }
            ctx.fillText(planet.name, textX, textY);


            //1 earth day = 1 frame
            var orbitRate = 2 * Math.PI / planet.revolution;

            //planet has retrograde motion
            if (planet.orbitDirection === "clockwise") {
                planet.angle += orbitRate;
            }
            //planet has prograde motion
            else {
                planet.angle -= orbitRate;
            }
        });

        //white border
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.strokeRect(0, 0, width, height);

        //labeling asteroid belt
        var rectX = 25;
        var rectY = 25;
        var rectWidth = 35;
        var rectHeight = 30;

        ctx.fillStyle = "#3b3939";
        ctx.fillRect(rectX,rectY,rectWidth,rectHeight);

        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.rect(rectX, rectY, rectWidth, rectHeight);
        ctx.stroke();

        ctx.font = "25px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText("Asteroid Belt", rectX + 45, rectY + 22);
    }
});
