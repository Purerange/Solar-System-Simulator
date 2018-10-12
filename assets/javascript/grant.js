//file containing code for animating solar system model
$(document).ready(function () {

    //needed for drawing on canvas
    var canvas = document.getElementById("solarSystem");
    var ctx = canvas.getContext("2d");

    //drawing on canvas
    var angle = 0;
    var width = canvas.width;
    var height = canvas.height;
    var originX = width / 2;
    var originY = height / 2;

    var spaceBodies = {
        sun: {
            name: "Sun",
            radius: height / 12,
            revolution: 200, //in earth days
            sunDistance: 0,
            orbitDirection: "clockwise",
            angle: 0,
            color: "yellow"
        },
        mercury: {
            name: "Mercury",
            radius: height / 30,
            revolution: 87.97,
            sunDistance: height / 7,
            orbitDirection: "clockwise",
            angle: 0,
            color: "orangered"
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
            var x = originX + planet.sunDistance * Math.cos(angle);
            var y = originY + planet.sunDistance * Math.sin(angle);

            ctx.fillStyle = planet.color;
            ctx.beginPath();
            ctx.arc(x, y, planet.radius, 0, 2 * Math.PI);
            ctx.fill();

            //1 earth day = 1 frame
            var orbitRate = 2 * Math.PI / planet.revolution;
            angle += orbitRate;
        });
    }
});
