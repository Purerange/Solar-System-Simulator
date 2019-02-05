$(document).ready(function () {
    console.log("entered sun page");

    var planets = {
        sun: {
            name: "Sun",
            radius: 21,
            revolution: 9, //in earth days
            sunDistance: 0, //this is actually distance from baricenter
            orbitDirection: "clockwise",
            angle: 0,
            color: "yellow",
            img: "assets/images/sun.png",
            show: true
        },
        mercury: {
            name: "Mercury",
            radius: 9,
            revolution: 88,
            sunDistance: 130,
            orbitDirection: "clockwise",
            angle: 0,
            color: "lightgrey",
            img: "assets/images/mercury.png",
            show: true
        },
        venus: {
            name: "Venus",
            radius: 12,
            revolution: 220,
            sunDistance: 210,
            orbitDirection: "clockwise",
            angle: 0,
            color: "gold",
            img: "assets/images/venus.png",
            show: true
        },
        earth: {
            name: "Earth",
            radius: 12,
            revolution: 365,
            sunDistance: 310,
            orbitDirection: "clockwise",
            angle: 0,
            color: "green",
            img: "assets/images/earth2.png",
            show: true,
            satellites: {
                moon: {
                    name: "Moon",
                    radius: 7,
                    revolution: 30,
                    planetDistance: 30,
                    orbitDirection: "clockwise",
                    angle: 2 * Math.PI,
                    color: "white",
                    img: "assets/images/moon.png",
                    show: true
                },
            }
        },
        mars: {
            name: "Mars",
            radius: 10,
            revolution: 687,
            sunDistance: 420,
            orbitDirection: "clockwise",
            angle: 0,
            color: "red",
            img: "assets/images/mars.png",
            show: true
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

    var buttons = {
        pause: {
            text: "Pause",
            x: width - 130,
            y: 30,
            width: 100,
            height: 40,
            left: 10,
            top: 28
        },
        explode: {
            text: "Explode Sun",
            x: width / 2 - 85,
            y: height - 60,
            width: 170,
            height: 40,
            left: 10,
            top: 30
        },
        reset: {
            text: "Reset",
            x: 40,
            y: 30,
            width: 100,
            height: 40,
            left: 10,
            top: 28
        }
    }

    //sun explosion data
    var timescale = [-.05, 0, 4.57, 9.84, 11.6, 12.27, 12.27001, 12.37, 12.39, 12.3905];
    var solar_radius = [0, .93, 1, 1.75, 3.5, 180, 10, 20, 200, .03];

    //this data is NOT to scale!
    var sunStates = [
        {
            startRadius: 1,
            endRadius: 1.75,
            radius: 1,
            startTime: 4.57,
            endTime: 9.84,
            intervals: 47
        },
        {
            startRadius: 1.75,
            endRadius: 3.5,
            radius: 1.75,
            startTime: 9.84,
            endTime: 11.6,
            intervals: 40
        },
        {
            startRadius: 3.5,
            endRadius: 14,
            radius: 3.5,
            startTime: 11.6,
            endTime: 12.27,
            intervals: 30
        },
        {
            startRadius: 14,
            endRadius: 5,
            radius: 14,
            startTime: 12.27,
            endTime: 12.27001,
            intervals: 5
        },
        {
            startRadius: 5,
            endRadius: 8,
            radius: 5,
            startTime: 12.27001,
            endTime: 12.37,
            intervals: 11
        },
        {
            startRadius: 8,
            endRadius: 15,
            radius: 8,
            startTime: 12.37,
            endTime: 12.39,
            intervals: 6
        },
        {
            startRadius: 15,
            endRadius: .5,
            radius: 15,
            startTime: 12.39,
            endTime: 15,
            intervals: 255
        }
    ];


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
        drawButton(buttons.pause);

        //creating explosion button
        drawButton(buttons.explode);
        //console.log(buttons.explode);

        drawButton(buttons.reset);

        //white border
        // fg.strokeStyle = "white";
        // fg.lineWidth = 5;
        // fg.strokeRect(0, 0, width, height);
    }

    //self-explanatory
    function animateSolarSystem() {
        //clearing canvas
        ctx.clearRect(0, 0, width, height);

        //animating sun explosion
        if (explodingSunMode) {
            //console.log("exploding");
            $.each(sunStates, function (key, timeframe) {
                //console.log(planets.sun.radius);

                var start = timeframe.startTime * timeNormalizer;
                var end = timeframe.endTime * timeNormalizer;

                // console.log(start);
                // console.log(end);
                // console.log(year);

                //figuring out which moment of time the sun is at
                if (start <= year && year < end) {
                    console.log(year);
                    //console.log(timeframe.radius);
                    console.log(planets.sun.radius);
                    //finding number of years between start/end date
                    //var numInterals = end - start;

                    //for scaling Sun's final radius so that it reaches earth's orbit in end
                    //var earthScaler = startingSunRadius * 

                    //how much the Sun's radius multiplier will change
                    var radiusIncrease = (timeframe.endRadius - timeframe.startRadius) / timeframe.intervals;
                    console.log(radiusIncrease);

                    //the new Sun radius multiplier, a number indicating size relative to when explode button first clicked
                    timeframe.radius += radiusIncrease;

                    //changing Sun's radius
                    planets.sun.radius = startingSunRadius * timeframe.radius;
                    year += (end - start) / timeframe.intervals;
                }
            });
        }

        //drawing all the planets for this particular instance of time
        $.each(spaceBodies, function (key, planet) {
            if (planets.sun.radius >= planet.sunDistance && planet.name !== "Sun") {
                planet.show = false;
            }

            //drawing planet
            var sunDist = planet.sunDistance;
            var x = originX + sunDist * Math.cos(planet.angle);
            var y = originY + sunDist * Math.sin(planet.angle);

            var planetX = x - planet.radius;
            var planetY = y - planet.radius;

            //planet has an image representation
            if (planet.img !== null && planet.show === true) {
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
                    if (planets.earth.show === false) {
                        moon.show = false;
                    }

                    //console.log("drawing moon");
                    //drawing satellite
                    var satelliteX = x + moon.planetDistance * Math.cos(moon.angle);
                    var satelliteY = y + moon.planetDistance * Math.sin(moon.angle);

                    moonX = satelliteX - moon.radius;
                    moonY = satelliteY - moon.radius;

                    if (moon.show == true) {
                        var img = new Image();
                        img.src = moon.img;

                        ctx.drawImage(img, moonX, moonY, moon.radius * 2, moon.radius * 2);
                    }

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

    $(foreground).on("click", function (event) {
        console.log("clicked");

        //user clicked pause
        if (buttonClicked(buttons.pause, this) && paused === false) {
            clearInterval(time);
            // clearInterval(firebaseInterval);
            paused = true;
            buttons.pause.text = "Play";
            drawButton(buttons.pause);
        }
        //user clicked play
        else if (buttonClicked(buttons.pause, this) && paused === true) {
            time = setInterval(animateSolarSystem, 1000 / 60);
            // firebaseInterval = setInterval(updateFirebase, 1000);
            paused = false;
            buttons.pause.text = "Pause";
            drawButton(buttons.pause);
        }

        //user clicked explode sun
        if (buttonClicked(buttons.explode, this) && explodingSunMode === false) {
            console.log("explosion requested");
            explodingSunMode = true;
        }

        //user clicked reset button
        if (buttonClicked(buttons.reset, this)) {
            explodingSunMode = false;
            year = sunStates[0].startTime * timeNormalizer;

            //restoring planets
            $.each(planets, function(key, planet) {
                if(planet.name === "Sun") {
                    planet.radius = startingSunRadius;
                }
                
                planet.show = true;
            });

            //restoring sun states
            $.each(sunStates, function(key, timeframe) {
                timeframe.radius = timeframe.startRadius;
            });
        }

    });

    //obtains pixel on canvas that mouse hovers over
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    //checks if user clicked a particular canvas button
    function buttonClicked(button, canvas) {
        //obtaining coordinates of pixel clicked
        var mousePos = getMousePos(canvas, event);
        var x = mousePos.x;
        var y = mousePos.y;

        //bounding rectangle of button
        var x1 = button.x;
        var x2 = button.x + button.width;
        var y1 = button.y;
        var y2 = button.y + button.height;

        //checking if a pixel is within a button's boundaries
        if (x1 <= x && x <= x2 && y1 <= y && y <= y2) {
            return true;
        }

        return false;
    }

    //draws a canvas button
    function drawButton(button) {
        console.log("drawing button");

        //black background
        fg.fillStyle = "black";
        fg.fillRect(button.x, button.y, button.width, button.height);

        //white border
        fg.strokeStyle = "white";
        fg.lineWidth = 2;
        fg.strokeRect(button.x, button.y, button.width, button.height);

        //white text
        fg.fillStyle = "white";
        fg.font = "25px Arial";
        fg.textAlign = "left";
        fg.lineWidth = 5;
        fg.fillText(button.text, button.x + button.left, button.y + button.top);
    }

    //exploding sun parameters
    var explodingSunMode = false;
    //var sunIterator = 
    var explosionSpeed = 1;

    var startingSunRadius = planets.sun.radius;
    var radiusMultiplier = 1;

    //used to ensure all time values for sun explosion are integers
    var timeNormalizer = 100000000000;
    var year = 4.57 * timeNormalizer;

    var paused = false;
    var spaceBodies = planets;
    var timeSpeed = .2;
    drawBackground();
    var time = setInterval(animateSolarSystem, 1000 / 60);
});