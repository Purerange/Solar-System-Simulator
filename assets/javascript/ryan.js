//file containing code for animating solar system model
$(document).ready(function () {

    var spaceBodies = {
        sun: {
            name: "Sun",
            radius: 65,
            revolution: 200, //in earth days
            sunDistance: 2, //this is actually distance from baricenter
            orbitDirection: "clockwise",
            angle: 0,
            color: "yellow",
            img: "assets/images/sun.png"
        },
        mercury: {
            name: "Mercury",
            radius: 17,
            revolution: 88,
            sunDistance: 68,
            orbitDirection: "clockwise",
            angle: 0,
            color: "lightgrey",
            img: "assets/images/mercury.png"
        },
        venus: {
            name: "Venus",
            radius: 22,
            revolution: 225,
            sunDistance: 105,
            orbitDirection: "counterclockwise",
            angle: 0,
            color: "gold",
            img: "assets/images/venus.png"
        },
        earth: {
            name: "Earth",
            radius: 23,
            revolution: 365,
            sunDistance: 145,
            orbitDirection: "clockwise",
            angle: 0,
            color: "green",
            img: "assets/images/earth2.png"
        },
        mars: {
            name: "Mars",
            radius: 19,
            revolution: 687,
            sunDistance: 185,
            orbitDirection: "clockwise",
            angle: 0,
            color: "red",
            img: "assets/images/mars.png"
        },
        jupiter: {
            name: "Jupiter",
            radius: 55,
            revolution: 12*365,
            sunDistance: 250,
            orbitDirection: "clockwise",
            angle: 0,
            color: "orange",
            img: "assets/images/jupiter.png"
        },
        saturn: {
            name: "Saturn",
            radius: 40*2,
            revolution: 29*365,
            sunDistance: 340,
            orbitDirection: "clockwise",
            angle: 0,
            color: "khaki",
            img: "assets/images/saturnScaled.png"
        },
        uranus: {
            name: "Uranus",
            radius: 33,
            revolution: 84*365,
            sunDistance: 430,
            orbitDirection: "counterclockwise",
            angle: 0,
            color: "turquoise",
            img: "assets/images/uranus.png"
        },
        neptune: {
            name: "Neptune",
            radius: 28,
            revolution: 165*365,
            sunDistance: 480,
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

     //drawing on canvas
     var width = canvas.width;
     var height = canvas.height;
     var originX = width / 2;
     var originY = height / 2; 

    function animateSolarSystem() {
        //clearing canvas
        ctx.clearRect(0, 0, width, height);

        //creating black background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        
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

            x = x - planet.radius / Math.sqrt(2);
            y = y - planet.radius / Math.sqrt(2);

            // ctx.fillStyle = planet.color;
            // ctx.beginPath();
            // ctx.arc(x, y, planet.radius, 0, 2 * Math.PI);
            // ctx.fill();

            var img = new Image();
            img.src = planet.img; 

            ctx.drawImage(img, x, y, planet.radius * Math.sqrt(2), planet.radius * Math.sqrt(2));

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
    }
});