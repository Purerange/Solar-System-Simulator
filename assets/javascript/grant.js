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
            orbitDirection: "clockwise",
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
            orbitDirection: "clockwise",
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
            orbitDirection: "clockwise",
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
            name: "Sun",
            radius: 25,
            revolution: 100, //in earth days
            sunDistance: 0, //this is actually distance from baricenter
            orbitDirection: "clockwise",
            angle: 0,
            color: "yellow",
            img: "assets/images/sun.png",
        },
        mercury: {
            name: "Mercury",
            radius: 5,
            revolution: 88,
            sunDistance: 32,
            orbitDirection: "clockwise",
            angle: 0,
            color: "lightgrey",
            img: null
        },
        venus: {
            name: "Venus",
            radius: 7,
            revolution: 225,
            sunDistance: 35,
            orbitDirection: "clockwise",
            angle: 0,
            color: "gold",
            img: null
        },
        earth: {
            name: "Earth",
            radius: 7,
            revolution: 365,
            sunDistance: 38,
            orbitDirection: "clockwise",
            angle: 0,
            color: "green",
            img: null
        },
        mars: {
            name: "Mars",
            radius: 4,
            revolution: 687,
            sunDistance: 42,
            orbitDirection: "clockwise",
            angle: 0,
            color: "red",
            img: null
        },
        ceres: {
            name: "Ceres",
            radius: 5,
            revolution: 1682,
            sunDistance: 57,
            orbitDirection: "clockwise",
            angle: 0,
            color: "white",
            img: "assets/images/ceres.png"
        },
        jupiter: {
            name: "Jupiter",
            radius: 15,
            revolution: 12 * 365,
            sunDistance: 88,
            orbitDirection: "clockwise",
            angle: 0,
            color: "orange",
            img: "assets/images/jupiter.png"
        },
        saturn: {
            name: "Saturn",
            radius: 10 * 2,
            revolution: 29 * 365,
            sunDistance: 140,
            orbitDirection: "clockwise",
            angle: 0,
            color: "khaki",
            img: "assets/images/saturnScaled.png"
        },
        uranus: {
            name: "Uranus",
            radius: 10,
            revolution: 84 * 365,
            sunDistance: 180,
            orbitDirection: "clockwise",
            angle: 0,
            color: "turquoise",
            img: "assets/images/uranus.png"
        },
        neptune: {
            name: "Neptune",
            radius: 10,
            revolution: 165 * 365,
            sunDistance: 215,
            orbitDirection: "clockwise",
            angle: 0,
            color: "blue",
            img: "assets/images/neptune.png"
        },
        plutoBarycenter: {
            name: "Pluto Barycenter",
            radius: 5,
            revolution: 248 * 365,
            sunDistance: 250,
            orbitDirection: "clockwise",
            angle: 0,
            color: "blue",
            img: null,
            ellipse: {
                horizontalScale: .99,
                verticalScale: 1,
                originShiftX: 0,
                originShiftY: 45,
                tilt: 0
            },
            satellites: {
                pluto: {
                    name: "Pluto",
                    radius: 5,
                    revolution: 800,
                    planetDistance: 5,
                    orbitDirection: "clockwise",
                    angle: 0,
                    color: "blue",
                    img: "assets/images/pluto.png"
                },
                charon: {
                    name: "Charon",
                    radius: 3,
                    revolution: 1000,
                    planetDistance: 25,
                    orbitDirection: "clockwise",
                    angle: 2 * Math.PI,
                    color: "white",
                    img: "assets/images/charon.png"
                }
            }
        },
        haumea: {
            name: "Haumea",
            radius: 5,
            revolution: 284 * 365,
            sunDistance: 280,
            orbitDirection: "clockwise",
            angle: Math.PI,
            color: "white",
            img: "assets/images/haumea.png",
            ellipse: {
                horizontalScale: 1,
                verticalScale: .95,
                originShiftX: 35,
                originShiftY: -5,
                tilt: 0
            },
        },
        makemake: {
            name: "Makemake",
            radius: 5,
            revolution: 309 * 365,
            sunDistance: 300,
            orbitDirection: "clockwise",
            angle: Math.PI,
            color: "white",
            img: "assets/images/makemake.png",
            ellipse: {
                horizontalScale: 1,
                verticalScale: .95,
                originShiftX: 0,
                originShiftY: -25,
                tilt: 0
            },
        },
        eris: {
            name: "Eris",
            radius: 5,
            revolution: 558 * 365,
            sunDistance: 440,
            orbitDirection: "clockwise",
            angle: Math.PI,
            color: "white",
            img: "assets/images/makemake.png",
            ellipse: {
                horizontalScale: .87,
                verticalScale: .95,
                originShiftX: 0,
                originShiftY: 164,
                tilt:0
            }
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
        },
        switchSync: {
            text: "Sync",
            x: 30,
            y: 30,
            width: 100,
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

                //console.log(spaceBodies.hasOwnProperty("horizontalScale"));

                //planet has an elliptical orbit in model
                if (planet.hasOwnProperty("ellipse")) {
                    //console.log(planet.name);

                    var xScale = planet.ellipse.horizontalScale;
                    var yScale = planet.ellipse.verticalScale;
                    var x = originX;
                    var y = originY;

                    // console.log(scale);
                    // console.log(x);
                    //console.log(y);

                    //saving current state
                    bg.save();

                    //moving center point
                    bg.translate(originX + planet.ellipse.originShiftX, originY + planet.ellipse.originShiftY);
                   
                    // scale context horizontally
                    bg.scale(xScale, yScale);

                    

                     //rotating canvas
                     //bg.rotate(planet.ellipse.tilt);

                    // draw circle which will be stretched into an oval
                    bg.beginPath();
                    bg.arc(0, 0, planet.sunDistance, 0, 2 * Math.PI);
                    bg.stroke();

                    // restore to original state
                    bg.restore();
                }
                //planet has circular orbit in model
                else {
                    bg.beginPath();
                    bg.arc(originX, originY, planet.sunDistance, 0, 2 * Math.PI);
                    bg.stroke();
                }
            }
        });

        //creating pause button
        drawButton(buttons.pause);

        //console.log(buttons.pause);

        //creating terrestrial planets button
        drawButton(buttons.switchView);

        //creating sync button
        drawButton(buttons.switchSync);

         //white border
         fg.strokeStyle = "white";
         fg.lineWidth = 5;
         fg.strokeRect(0, 0, width, height);
    }


    //animates the planets and other movig objects in model
    function animateSolarSystem() {

        //clearing canvas
        ctx.clearRect(0, 0, width, height);

        //drawing all the planets for this particular instance of time
        $.each(spaceBodies, function (key, planet) {
            //drawing the planet
            var x;
            var y;
            var sunDist;

            //planet has elliptical orbit in model
            if (planet.hasOwnProperty("ellipse")) {

                var a = planet.sunDistance * planet.ellipse.horizontalScale;
                var b = planet.sunDistance * planet.ellipse.verticalScale;
                var theta = planet.angle;


                sunDist = a * b / Math.sqrt((b * Math.cos(theta)) ** 2 + (a * Math.sin(theta)) ** 2);

                x = originX + sunDist * Math.cos(planet.angle + planet.ellipse.tilt) + planet.ellipse.originShiftX;
                y = originY + sunDist * Math.sin(planet.angle + planet.ellipse.tilt) + planet.ellipse.originShiftY;
            }
            //planet has circular orbit in model
            else {
                sunDist = planet.sunDistance;
                x = originX + sunDist * Math.cos(planet.angle);
                y = originY + sunDist * Math.sin(planet.angle);
            }

            planetX = x - planet.radius;
            planetY = y - planet.radius;

            //planet has an image representation
            if (planet.img !== null) {
                //console.log(planet.name);
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
            }


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

            if (planet.name === "plutoBarycenter") {
                console.log(planet.angle);
            }

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
    }

    //draw space body

    //button click event for canvas buttons
    $(foreground).on("click", function (event) {
        console.log("clicked");

        //user clicked pause
        if (buttonClicked(buttons.pause, this) && paused === false) {
            clearInterval(time);
            clearInterval(updateInterval);
            paused = true;
            buttons.pause.text = "Play";
            drawButton(buttons.pause);

        }
        //user clicked play
        else if (buttonClicked(buttons.pause, this) && paused === true) {
            updatePlanetAngles();
            time = setInterval(animateSolarSystem, 1000 / 60);
            updateInterval = setInterval(updateStorage, 500);
            paused = false;
            buttons.pause.text = "Pause";
            drawButton(buttons.pause);
        }

        //user entering inner planet view
        if (buttonClicked(buttons.switchView, this) && spaceBodies === outerViewPlanets) {
            spaceBodies = innerViewPlanets;
            timeSpeed = .10;
            updatePlanetAngles();
            drawBackground();
            buttons.switchView.text = "Dwarf Planets";
            drawButton(buttons.switchView);
            //letting screen switch planets between views while paused
            if (paused) {
                animateSolarSystem();
            }
        }
        //user entering dwarf planet view
        else if (buttonClicked(buttons.switchView, this) && spaceBodies === innerViewPlanets) {
            spaceBodies = dwarfViewPlanets;
            timeSpeed = 10;
            updatePlanetAngles();
            drawBackground();
            buttons.switchView.text = "Outer Planets";
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
            updatePlanetAngles();
            drawBackground();
            buttons.switchView.text = "Inner Planets";
            drawButton(buttons.switchView);
            //letting screen switch planets between views while paused
            if (paused) {
                animateSolarSystem();
            }
        }

        //user clicks
        if (buttonClicked(buttons.switchSync, this) && !syncd) {
            syncd = true;
            updatePlanetAngles();
            drawBackground();
            buttons.switchSync.text = "Isolate";
            drawButton(buttons.switchSync);
            //letting screen switch planets between views while paused
            if (paused) {
                animateSolarSystem();
            }
        } else if (buttonClicked(buttons.switchSync, this) && syncd) {
            syncd = false;
            updatePlanetAngles();
            drawBackground();
            buttons.switchSync.text = "Sync";
            drawButton(buttons.switchSync);
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

    //stores the planet angles in firebase
    function updateStorage() {
        if (syncd) {
            if (spaceBodies === outerViewPlanets) {
                $.each(outerViewPlanets, function (key, planet) {

                    database.ref("outer-planets/" + planet.name).set({
                        angle: planet.angle
                    });

                });
            } else if (spaceBodies === innerViewPlanets) {
                $.each(innerViewPlanets, function (key, planet) {

                    database.ref("inner-planets/" + planet.name).set({
                        angle: planet.angle
                    });
                });
            } else if (spaceBodies === dwarfViewPlanets) {
                $.each(dwarfViewPlanets, function (key, planet) {

                    database.ref("dwarf-planets/" + planet.name).set({
                        angle: planet.angle
                    });
                });
            }
        } else {
            if (spaceBodies === outerViewPlanets) {
                $.each(outerViewPlanets, function (key, planet) {

                    localStorage.setItem("outer-" + planet.name, planet.angle);

                });
            } else if (spaceBodies === innerViewPlanets) {
                $.each(innerViewPlanets, function (key, planet) {

                    localStorage.setItem("inner-" + planet.name, planet.angle);

                });
            } else if (spaceBodies === dwarfViewPlanets) {
                $.each(dwarfViewPlanets, function (key, planet) {

                    localStorage.setItem("dwarf-" + planet.name, planet.angle);

                });
            }

        }
    }

    function updatePlanetAngles() {
        if (syncd) {
            if (spaceBodies === outerViewPlanets) {
                $.each(outerViewPlanets, function (key, planet) {
                    database.ref("outer-planets/" + planet.name).once("value").then(function(snapshot) {
                        planet.angle = snapshot.val().angle;
                    });
                });
            } else if (spaceBodies === innerViewPlanets) {
                $.each(innerViewPlanets, function (key, planet) {
                    database.ref("inner-planets/" + planet.name).once("value").then(function(snapshot){
                        planet.angle = snapshot.val().angle;
                    });
                });
            } else if (spaceBodies === dwarfViewPlanets) {
                $.each(dwarfViewPlanets, function (key, planet) {
                    database.ref("dwarf-planets/" + planet.name).once("value").then(function(snapshot) {
                        planet.angle = snapshot.val().angle;
                    });
                });
            }
        } else {
            if (spaceBodies === outerViewPlanets && localStorage.getItem("outer-Sun") != null) {
                $.each(outerViewPlanets, function (key, planet) {
                    planet.angle = parseFloat(localStorage.getItem("outer-" + planet.name));
                });
            } else if (spaceBodies === innerViewPlanets && localStorage.getItem("inner-Sun") != null) {
                $.each(innerViewPlanets, function (key, planet) {
                    planet.angle = parseFloat(localStorage.getItem("inner-" + planet.name));
                });
            } else if (spaceBodies === dwarfViewPlanets && localStorage.getItem("dwarf-Sun") != null) {
                $.each(dwarfViewPlanets, function (key, planet) {
                    planet.angle = parseFloat(localStorage.getItem("dwarf-" + planet.name));
                });
            }

        }
    }

    function start() {
        updatePlanetAngles();
        drawBackground();

        //var timeSpeed = 10;
        timeSpeed = 1;
    
        //runs at 60fps
        time = setInterval(animateSolarSystem, 1000 / 60);
        updateInterval = setInterval(updateStorage, 100);
        paused = false;
    }

    //running program for first time
    //var spaceBodies = dwarfViewPlanets;
    var spaceBodies = outerViewPlanets;

    var timeSpeed;
    var time;
    var updateInterval;
    var paused;
    var syncd = false;

    setTimeout(start, 300);

<<<<<<< HEAD
});
=======
});
>>>>>>> master
