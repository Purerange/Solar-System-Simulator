$(document).ready(function () {
    console.log("entered sun page");

    var planets = {
        sun: {
            name: "Sun",
            radius: 42,
            revolution: 9, //in earth days
            sunDistance: 0, //this is actually distance from baricenter
            orbitDirection: "clockwise",
            angle: 0,
            color: "yellow",
            img: "assets/images/sun.png",
        },
        mercury: {
            name: "Mercury",
            radius: 9,
            revolution: 88,
            sunDistance: 97,
            orbitDirection: "clockwise",
            angle: 0,
            color: "lightgrey",
            img: "assets/images/mercury.png"
        },
        venus: {
            name: "Venus",
            radius: 12,
            revolution: 220,
            sunDistance: 140,
            orbitDirection: "clockwise",
            angle: 0,
            color: "gold",
            img: "assets/images/venus.png"
        },
        earth: {
            name: "Earth",
            radius: 12,
            revolution: 365,
            sunDistance: 196,
            orbitDirection: "clockwise",
            angle: 0,
            color: "green",
            img: "assets/images/earth2.png",
            satellites: {
                moon: {
                    name: "Moon",
                    radius: 7,
                    revolution: 30,
                    planetDistance: 30,
                    orbitDirection: "clockwise",
                    angle: 2 * Math.PI,
                    color: "white",
                    img: "assets/images/moon.png"
                },
            }
        },
        mars: {
            name: "Mars",
            radius: 10,
            revolution: 687,
            sunDistance: 255,
            orbitDirection: "clockwise",
            angle: 0,
            color: "red",
            img: "assets/images/mars.png"
        }
    }

    //needed for drawing on canvas
    var background = document.getElementById("modelBackdrop");
    var bg = background.getContext("2d");

    var canvas = document.getElementById("solarSystem");
    var ctx = canvas.getContext("2d");

    var foreground = document.getElementById("foreground");
    var fg = foreground.getContext("2d");

    //helpful canvas values
    var width = canvas.width;
    var height = canvas.height;
    var originX = width / 2;
    var originY = height / 2;

    //draws static elements of model including background color and orbit rings
    function drawBackground() {
        //creating black background
        bg.fillStyle = "black";
        bg.fillRect(0, 0, width, height);
        bg.lineWidth = 1;

        //drawing orbits
        $.each(spaceBodies, function (key, planet) {
            //drawing planet orbit
            if (planet.name !== "Sun") {
                bg.strokeStyle = "#3a3a3a";

                bg.beginPath();
                bg.arc(originX, originY, planet.sunDistance, 0, 2 * Math.PI);
                bg.stroke();

            }
        });

        //creating pause button
        //drawButton(buttons.pause);

        //console.log(buttons.pause);

        //creating terrestrial planets button
        //drawButton(buttons.switchView);

        //white border
        fg.strokeStyle = "white";
        fg.lineWidth = 5;
        fg.strokeRect(0, 0, width, height);
    }

    //self-explanatory
    function animateExplosion() {
        //clearing canvas
        ctx.clearRect(0, 0, width, height);

        //drawing all the planets for this particular instance of time
        $.each(spaceBodies, function (key, planet) {
            //drawing planet
            var sunDist = planet.sunDistance;
            var x = originX + sunDist * Math.cos(planet.angle);
            var y = originY + sunDist * Math.sin(planet.angle);

            var planetX = x - planet.radius;
            var planetY = y - planet.radius;

            //planet has an image representation
            if (planet.img !== null) {
                //console.log(planet.name);
                var img = new Image();
                img.src = planet.img;

                ctx.drawImage(img, planetX, planetY, planet.radius * 2, planet.radius * 2);
            }

            //1 earth day = 1 frame
            var orbitRate = 2 * Math.PI / planet.revolution;
            orbitRate = orbitRate * timeSpeed;

            //planet has retrograde motion
            planet.angle += orbitRate;
            
            //planet has moons
            //console.log(planet.hasOwnProperty("satellites"));
            if (planet.hasOwnProperty("satellites")) {
                //console.log(planet.satellites);
                $.each(planet.satellites, function (key, moon) {
                    //console.log("drawing moon");
                    //drawing satellite
                    var satelliteX = x + moon.planetDistance * Math.cos(moon.angle);
                    var satelliteY = y + moon.planetDistance * Math.sin(moon.angle);

                    moonX = satelliteX - moon.radius;
                    moonY = satelliteY - moon.radius;

                    var img = new Image();
                    img.src = moon.img;

                    ctx.drawImage(img, moonX, moonY, moon.radius * 2, moon.radius * 2);

                    //at normal time speed, 1 earth day = 1 frame
                    var orbitRate = 2 * Math.PI / moon.revolution;

                    //adjusting time speed
                    orbitRate = orbitRate * timeSpeed;

                    //planet has retrograde motion
                    if (moon.orbitDirection === "clockwise") {
                        moon.angle += orbitRate;
                    }
                    //planet has prograde motion
                    else {
                        moon.angle -= orbitRate;
                    }
                });
            }
        });
    }

    var spaceBodies = planets;
    var timeSpeed = .2;
    drawBackground();
    var time = setInterval(animateExplosion, 1000 / 60);
});