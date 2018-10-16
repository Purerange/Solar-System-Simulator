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

    //planet specs for inner planet view
    var innerViewPlanets = {
        sun: {
            name: "Sun",
            radius: 60,
            revolution: 9, //in earth days
            sunDistance: 62, //this is actually distance from baricenter
            orbitDirection: "clockwise",
            angle: 0,
            color: "yellow",
            img: "assets/images/sun.png",
        },
        mercury: {
            name: "Mercury",
            radius: 15,
            revolution: 88,
            sunDistance: 170,
            orbitDirection: "clockwise",
            angle: 0,
            color: "lightgrey",
            img: "assets/images/mercury.png"
        },
        venus: {
            name: "Venus",
            radius: 20,
            revolution: 225,
            sunDistance: 235,
            orbitDirection: "counterclockwise",
            angle: 0,
            color: "gold",
            img: "assets/images/venus.png"
        },
        earth: {
            name: "Earth",
            radius: 22,
            revolution: 365,
            sunDistance: 295,
            orbitDirection: "clockwise",
            angle: 0,
            color: "green",
            img: "assets/images/earth2.png"
        },
        mars: {
            name: "Mars",
            radius: 17,
            revolution: 687,
            sunDistance: 350,
            orbitDirection: "clockwise",
            angle: 0,
            color: "red",
            img: "assets/images/mars.png"
        },
        ceres: {
            name: "Ceres",
            radius: 10,
            revolution: 1682,
            sunDistance: 400,
            orbitDirection: "clockwise",
            angle: 0,
            color: "white",
            img: "assets/images/ceres.png"
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
            x: width - 130,
            y: 30,
            width: 100,
            height: 40,
            left: 10,
            top: 28
        },
        terrestrial: {
            x: 30,
            y: height - 150,
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
                bg.strokeStyle = "#828180";
                bg.beginPath();
                bg.arc(originX, originY, planet.sunDistance, 0, 2 * Math.PI);
                bg.stroke();
            }
        });

        //creating pause button
        drawButton(buttons.pause, "Pause");

        console.log(buttons.pause);

        //creating terrestrial planets button
        drawButton(buttons.terrestrial, "Inner Planets");
    }


    //animates the planets and other movig objects in model
    function animateSolarSystem() {

        //clearing canvas
        ctx.clearRect(0, 0, width, height);

        //drawing all the planets for this particular instance of time
        $.each(spaceBodies, function (key, planet) {
            //console.log(key);
            //console.log(planet);
            //console.log(key.color);

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
        });

        //white border
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.strokeRect(0, 0, width, height);
    }

    //button click event for canvas buttons
    $(canvas).on("click", function (event) {
        console.log("clicked");

        //user clicked pause
        if (buttonClicked(buttons.pause, this) && paused === false) {
            clearInterval(time);
            clearInterval(firebaseInterval);
            paused = true;
            drawButton(buttons.pause, "Play");

        }
        //user clicked play
        else if (buttonClicked(buttons.pause, this) && paused === true) {
            time = setInterval(animateSolarSystem, 1000 / 60);
            firebaseInterval = setInterval(updateFirebase, 1000);
            paused = false;
            drawButton(buttons.pause, "Pause");
        }

        //user clicked inner planets
        if (buttonClicked(buttons.terrestrial, this)) {
            spaceBodies = innerViewPlanets;
            timeSpeed = 10000;
            drawBackground();
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

    //redraws a canvas button with certain text
    function drawButton(button, text) {
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
        bg.fillText(text, button.x + button.left, button.y + button.top);
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
    var spaceBodies = innerViewPlanets;

    drawBackground();

    var timeSpeed = .10;

    //runs at 60fps
    var time = setInterval(animateSolarSystem, 1000 / 60);
    var firebaseInterval = setInterval(updateFirebase, 1000);
    var paused = false;
});
