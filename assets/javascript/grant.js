//file containing code for animating solar system model
$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDcDfKZ4Bw5G7wC9aOW_LnUrNli-TzjetE",
        authDomain: "solar-system-simulator.firebaseapp.com",
        databaseURL: "https://solar-system-simulator.firebaseio.com",
        projectId: "solar-system-simulator",
        storageBucket: "solar-system-simulator.appspot.com",
        messagingSenderId: "711323614670"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //planets for outer planet view
    var outerViewPlanets = {
        sun: {
            name: "Sun",
            radius: 42,
            revolution: 100, //in earth days
            sunDistance: 2, //this is actually distance from baricenter
            orbitDirection: "clockwise",
            angle: 0,
            color: "yellow",
            img: "assets/images/sun.png",
        },
        mercury: {
            name: "Mercury",
            radius: 7,
            revolution: 88,
            sunDistance: 72,
            orbitDirection: "clockwise",
            angle: 0,
            color: "lightgrey",
            img: "assets/images/mercury.png"
        },
        venus: {
            name: "Venus",
            radius: 10,
            revolution: 225,
            sunDistance: 107,
            orbitDirection: "counterclockwise",
            angle: 0,
            color: "gold",
            img: "assets/images/venus.png"
        },
        earth: {
            name: "Earth",
            radius: 11,
            revolution: 365,
            sunDistance: 145,
            orbitDirection: "clockwise",
            angle: 0,
            color: "green",
            img: "assets/images/earth2.png",
        },
        mars: {
            name: "Mars",
            radius: 9,
            revolution: 687,
            sunDistance: 185,
            orbitDirection: "clockwise",
            angle: 0,
            color: "red",
            img: "assets/images/mars.png"
        },
        ceres: {
            name: "Ceres",
            radius: 2,
            revolution: 1682,
            sunDistance: 214,
            orbitDirection: "clockwise",
            angle: 0,
            color: "white",
            img: "assets/images/ceres.png"
        },
        jupiter: {
            name: "Jupiter",
            radius: 39,
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

    //planet specs for inner planet view
    var innerViewPlanets = {
        sun: {
            name: "Sun",
            radius: 48,
            revolution: 9, //in earth days
            sunDistance: 62, //this is actually distance from baricenter
            orbitDirection: "clockwise",
            angle: 0,
            color: "yellow",
            img: "assets/images/sun.png",
        },
        mercury: {
            name: "Mercury",
            radius: 14,
            revolution: 88,
            sunDistance: 145,
            orbitDirection: "clockwise",
            angle: 0,
            color: "lightgrey",
            img: "assets/images/mercury.png"
        },
        venus: {
            name: "Venus",
            radius: 18,
            revolution: 220,
            sunDistance: 200,
            orbitDirection: "counterclockwise",
            angle: 0,
            color: "gold",
            img: "assets/images/venus.png"
        },
        earth: {
            name: "Earth",
            radius: 18,
            revolution: 365,
            sunDistance: 290,
            orbitDirection: "clockwise",
            angle: 0,
            color: "green",
            img: "assets/images/earth2.png",
            satellites: {
                moon: {
                    name: "Moon",
                    radius: 10,
                    revolution: 30,
                    planetDistance: 48,
                    orbitDirection: "clockwise",
                    angle: 2 * Math.PI,
                    color: "white",
                    img: "assets/images/moon.png"
                },
            }
        },
        mars: {
            name: "Mars",
            radius: 15,
            revolution: 687,
            sunDistance: 370,
            orbitDirection: "clockwise",
            angle: 0,
            color: "red",
            img: "assets/images/mars.png"
        },
        ceres: {
            name: "Ceres",
            radius: 6,
            revolution: 1682,
            sunDistance: 441,
            orbitDirection: "clockwise",
            angle: 0,
            color: "white",
            img: "assets/images/ceres.png"
        },
    }

    var dwarfViewPlanets = {
        sun: {
            name: "",
            radius: 25,
            revolution: 100, //in earth days
            sunDistance: 2, //this is actually distance from baricenter
            orbitDirection: "clockwise",
            angle: 0,
            color: "yellow",
            img: "assets/images/sun.png",
        },
        mercury: {
            name: "",
            radius: 5,
            revolution: 88,
            sunDistance: 40,
            orbitDirection: "clockwise",
            angle: 0,
            color: "lightgrey",
            img: "assets/images/mercury.png"
        },
        venus: {
            name: "",
            radius: 7,
            revolution: 225,
            sunDistance: 57,
            orbitDirection: "counterclockwise",
            angle: 0,
            color: "gold",
            img: "assets/images/venus.png"
        },
        earth: {
            name: "",
            radius: 7,
            revolution: 365,
            sunDistance: 75,
            orbitDirection: "clockwise",
            angle: 0,
            color: "green",
            img: "assets/images/earth2.png",
        },
        mars: {
            name: "",
            radius: 4,
            revolution: 687,
            sunDistance: 93,
            orbitDirection: "clockwise",
            angle: 0,
            color: "red",
            img: "assets/images/mars.png"
        },
        ceres: {
            name: "Ceres",
            radius: 3,
            revolution: 1682,
            sunDistance: 115,
            orbitDirection: "clockwise",
            angle: 0,
            color: "white",
            img: "assets/images/ceres.png"
        },
        jupiter: {
            name: "",
            radius: 8,
            revolution: 12 * 365,
            sunDistance: 135,
            orbitDirection: "clockwise",
            angle: 0,
            color: "orange",
            img: "assets/images/jupiter.png"
        },
        saturn: {
            name: "",
            radius: 6 * 2,
            revolution: 29 * 365,
            sunDistance: 157,
            orbitDirection: "clockwise",
            angle: 0,
            color: "khaki",
            img: "assets/images/saturnScaled.png"
        },
        uranus: {
            name: "",
            radius: 7,
            revolution: 84 * 365,
            sunDistance: 179,
            orbitDirection: "counterclockwise",
            angle: 0,
            color: "turquoise",
            img: "assets/images/uranus.png"
        },
        neptune: {
            name: "",
            radius: 20,
            revolution: 165 * 365,
            sunDistance: 225,
            orbitDirection: "clockwise",
            angle: 0,
            color: "blue",
            img: "assets/images/neptune.png"
        },
        pluto: {
            name: "Pluto",
            radius: 3,
            revolution: 165 * 365,
            sunDistance: 265,
            orbitDirection: "clockwise",
            angle: 0,
            color: "blue",
            img: "assets/images/neptune.png"
        },

    }

    //needed for drawing on canvas
    var background = document.getElementById("modelBackdrop");
    var bg = background.getContext("2d");

    var canvas = document.getElementById("solarSystem");
    var ctx = canvas.getContext("2d");

    //helpful canvas values
    var width = canvas.width;
    var height = canvas.height;
    var originX = width / 2;
    var originY = height / 2;

    //canvas button specs
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
        switchView: {
            text: "Inner Planets",
            x: 30,
            y: height - 80,
            width: 170,
            height: 40,
            left: 10,
            top: 30
        }
    }

    //ctx.scale(.75,.75);

    //draws static elements of model including background color and orbit rings
    function drawBackground() {
        //creating black background
        bg.fillStyle = "black";
        bg.fillRect(0, 0, width, height);

        //shading asteroid belt
        // bg.fillStyle = "#3b3939";
        // bg.beginPath();
        // bg.arc(originX, originY, spaceBodies.jupiter.sunDistance, 0, 2 * Math.PI);
        // bg.fill();

        // bg.fillStyle = "black";
        // bg.beginPath();
        // bg.arc(originX, originY, spaceBodies.mars.sunDistance, 0, 2 * Math.PI);
        // bg.fill();

        //labeling asteroid belt
        // var rectX = 25;
        // var rectY = 25;
        // var rectWidth = 35;
        // var rectHeight = 30;

        // bg.fillStyle = "#3b3939";
        // bg.fillRect(rectX, rectY, rectWidth, rectHeight);

        // bg.beginPath();
        // bg.strokeStyle = "white";
        // bg.lineWidth = 2;
        // bg.rect(rectX, rectY, rectWidth, rectHeight);
        // bg.stroke();

        // bg.font = "25px Arial";
        // bg.fillStyle = "white";
        // bg.textAlign = "left";
        // bg.fillText("= Asteroid Belt", rectX + 45, rectY + 22);

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

        //console.log(buttons.pause);

        //creating terrestrial planets button
        drawButton(buttons.switchView);
    }


    //animates the planets and other movig objects in model
    function animateSolarSystem() {

        //clearing canvas
        ctx.clearRect(0, 0, width, height);

        //drawing all the planets for this particular instance of time
        $.each(spaceBodies, function (key, planet) {
            //drawing the planet
            var x = originX + planet.sunDistance * Math.cos(planet.angle);
            var y = originY + planet.sunDistance * Math.sin(planet.angle);

            planetX = x - planet.radius;
            planetY = y - planet.radius;

            var img = new Image();
            img.src = planet.img;

            ctx.drawImage(img, planetX, planetY, planet.radius * 2, planet.radius * 2);

            //writing planet name
            ctx.font = "12px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";

            var textX = x;
            var textY = y + planet.radius + 10;
            //special coordinates for saturn
            if (planet.name === "Saturn") {
                textY = y + planet.radius / 2 + 5;
            }
            ctx.fillText(planet.name, textX, textY);


            //1 earth day = 1 frame
            var orbitRate = 2 * Math.PI / planet.revolution;
            orbitRate = orbitRate * timeSpeed;

            //planet has retrograde motion
            if (planet.orbitDirection === "clockwise") {
                planet.angle += orbitRate;
            }
            //planet has prograde motion
            else {
                planet.angle -= orbitRate;
            }

            //planet has moons
            //console.log(planet.hasOwnProperty("satellites"));
            if (planet.hasOwnProperty("satellites")) {
                //console.log(planet.satellites);
                $.each(planet.satellites, function (key, moon) {
                    console.log("drawing moon");
                    //drawing satellite
                    var satelliteX = x + moon.planetDistance * Math.cos(moon.angle);
                    var satelliteY = y + moon.planetDistance * Math.sin(moon.angle);

                    moonX = satelliteX - moon.radius;
                    moonY = satelliteY - moon.radius;

                    var img = new Image();
                    img.src = moon.img;

                    ctx.drawImage(img, moonX, moonY, moon.radius * 2, moon.radius * 2);

                    //writing satellite name
                    ctx.font = "12px Arial";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";

                    var textX = satelliteX;
                    var textY = satelliteY + moon.radius + 10;
                    ctx.fillText(moon.name, textX, textY);

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

        //white border
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.strokeRect(0, 0, width, height);
    }

    //draw space body

    //button click event for canvas buttons
    $(canvas).on("click", function (event) {
        console.log("clicked");

        //user clicked pause
        if (buttonClicked(buttons.pause, this) && paused === false) {
            clearInterval(time);
            clearInterval(firebaseInterval);
            paused = true;
            buttons.pause.text = "Play";
            drawButton(buttons.pause);

        }
        //user clicked play
        else if (buttonClicked(buttons.pause, this) && paused === true) {
            time = setInterval(animateSolarSystem, 1000 / 60);
            //firebaseInterval = setInterval(updateFirebase, 1000);
            paused = false;
            buttons.pause.text = "Pause";
            drawButton(buttons.pause);
        }

        //user entering inner planet view
        if (buttonClicked(buttons.switchView, this) && spaceBodies === outerViewPlanets) {
            spaceBodies = innerViewPlanets;
            timeSpeed = .10;
            drawBackground();
            buttons.switchView.text = "Dwarf Planets"
            drawButton(buttons.switchView);
            //letting screen switch planets between views while paused
            if (paused) {
                animateSolarSystem();
            }
        }
         //user entering dwarf planet view
         else if (buttonClicked(buttons.switchView, this) && spaceBodies === innerViewPlanets) {
            spaceBodies = dwarfViewPlanets;
            timeSpeed = 1;
            drawBackground();
            buttons.switchView.text = "Outer Planets"
            drawButton(buttons.switchView);
            //letting screen switch planets between views while paused
            if (paused) {
                animateSolarSystem();
            }
        }
        //user entering outer planet view
        else if (buttonClicked(buttons.switchView, this) && spaceBodies === dwarfViewPlanets) {
            spaceBodies = outerViewPlanets;
            timeSpeed = 1;
            drawBackground();
            buttons.switchView.text = "Inner Planets"
            drawButton(buttons.switchView);
            //letting screen switch planets between views while paused
            if (paused) {
                animateSolarSystem();
            }
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
        //clearing existing button text
        //bg.clearRect(button.x, button.y, button.width, button.height);

        //black background
        bg.fillStyle = "black";
        bg.fillRect(button.x, button.y, button.width, button.height);

        //white border
        bg.strokeStyle = "white";
        bg.lineWidth = 2;
        bg.strokeRect(button.x, button.y, button.width, button.height);

        //white text
        bg.fillStyle = "white";
        bg.font = "25px Arial";
        bg.textAlign = "left";
        bg.lineWidth = 5;
        bg.fillText(button.text, button.x + button.left, button.y + button.top);
    }

    //stores the planet angles in firebase
    function updateFirebase() {
        $.each(spaceBodies, function (key, planet) {

            database.ref("planets/" + planet.name).set({
                angle: planet.angle
            });

        });
    }

    //running program for first time
    var spaceBodies = dwarfViewPlanets;

    drawBackground();

    var timeSpeed = 1;

    //runs at 60fps
    var time = setInterval(animateSolarSystem, 1000 / 60);
    //var firebaseInterval = setInterval(updateFirebase, 1000);
    var paused = false;
});
