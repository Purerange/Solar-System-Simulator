//file containing code for animating solar system model
$(document).ready(function () {

    //needed for drawing on canvas
    var canvas = document.getElementById("solarSystem");
    var ctx = canvas.getContext("2d");

    //drawing on canvas
    var width = canvas.width;
    var height = canvas.height;
    var originX = width / 2;
    var originY = height / 2;

    var spaceBodies = {
        sun: {
            name: "Sun",
            radius: 35,
            revolution: 200, //in earth days
            sunDistance: 2, //this is actually distance from baricenter
            orbitDirection: "clockwise",
            angle: 0,
            color: "yellow"
        },
        mercury: {
            name: "Mercury",
            radius: 12,
            revolution: 88,
            sunDistance: 60,
            orbitDirection: "clockwise",
            angle: 0,
            color: "lightgrey"
        },
        venus: {
            name: "Venus",
            radius: 15,
            revolution: 225,
            sunDistance: 100,
            orbitDirection: "counterclockwise",
            angle: 0,
            color: "gold"
        },
        earth: {
            name: "Earth",
            radius: 16,
            revolution: 365,
            sunDistance: 145,
            orbitDirection: "clockwise",
            angle: 0,
            color: "green"
        },
        mars: {
            name: "Mars",
            radius: 13,
            revolution: 687,
            sunDistance: 180,
            orbitDirection: "clockwise",
            angle: 0,
            color: "red"
        },
        jupiter: {
            name: "Jupiter",
            radius: 30,
            revolution: 12*365,
            sunDistance: 230,
            orbitDirection: "clockwise",
            angle: 0,
            color: "orange"
        },
        saturn: {
            name: "Saturn",
            radius: 25,
            revolution: 29*365,
            sunDistance: 300,
            orbitDirection: "clockwise",
            angle: 0,
            color: "khaki"
        },
        uranus: {
            name: "Uranus",
            radius: 20,
            revolution: 84*365,
            sunDistance: 360,
            orbitDirection: "counterclockwise",
            angle: 0,
            color: "turquoise"
        },
        neptune: {
            name: "Neptune",
            radius: 18,
            revolution: 165*365,
            sunDistance: 405,
            orbitDirection: "clockwise",
            angle: 0,
            color: "blue"
        }
    }

    //runs at 60fps
    setInterval(animateSolarSystem, 1000 / 60);

    function animateSolarSystem() {
        //clearing canvas
        ctx.clearRect(0, 0, width, height);

        //creating black background, white border
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.strokeRect(0, 0, width, height);

        ctx.lineWidth = 3;

        //drawing all the planets for this particular instance of time
        $.each(spaceBodies, function (key, planet) {
            //console.log(key);
            //console.log(planet);
            //console.log(key.color);

            //drawing planet orbit
            if (planet !== "Sun") {
                ctx.strokeStyle = "white";
                ctx.beginPath();
                ctx.arc(originX, originY, planet.sunDistance, 0, 2 * Math.PI);
                ctx.stroke();
            }

            //drawing the planet
            var x = originX + planet.sunDistance * Math.cos(planet.angle);
            var y = originY + planet.sunDistance * Math.sin(planet.angle);

            ctx.fillStyle = planet.color;
            ctx.beginPath();
            ctx.arc(x, y, planet.radius, 0, 2 * Math.PI);
            ctx.fill();

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
    }
});
