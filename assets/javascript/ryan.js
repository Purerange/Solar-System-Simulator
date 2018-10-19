// example function plot 

$(document).ready(function() {

    var planetsAndFriends = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Ceres", "Pluto-Charon", "Haumea", "Makemake", "Eris"];
    var distanceFromSun = [.39, .72, 1, 1.52, 5.20, 9.58, 19.22, 30.11, 2.77, 39.48, 43.22, 45.72, 67.78];
    var declination = [6.34, 2.19, 1.58, 1.67, .032, .093, 1.02, .72, 9.2, 17.16, 28.19, 29, 44];

    var distancePlot_terrestrial = { 
        x: distanceFromSun.slice(0, 4),
        y: declination.slice(0, 4),
        type: 'scatter',
        name: 'Terrestrial Planets',
        text: planetsAndFriends.slice(0, 4),
        mode: 'markers',
        marker: {size: 10,
            color: 'blue',
        },
    }

    var distancePlot_gas = { 
        x: distanceFromSun.slice(4, 8),
        y: declination.slice(4, 8),
        type: 'scatter',
        name: 'Gas Giants',
        text: planetsAndFriends.slice(4, 8),
        mode: 'markers',
        marker: {size: 12,
            color: 'red',
        },
    }

    var distancePlot_dwarf = { 
        x: distanceFromSun.slice(8),
        y: declination.slice(8),
        type: 'scatter',
        name: 'Dwarf Planets',
        text: planetsAndFriends.slice(8),
        mode: 'markers',
        marker: {size: 8,
            color: 'green',
        },
    }

    var distDisplay = document.getElementById('distance-container');
    var dataDist = [distancePlot_terrestrial, distancePlot_gas, distancePlot_dwarf];

    var layoutDist = {
        title: 'Orbital Distance from Sun and Inclination from Barycenter Plane',
        xaxis: {title: "Distance from Sun (AU)"},
        yaxis: {title: "Inclination (degrees)"},
    }

    Plotly.newPlot(distDisplay, dataDist, layoutDist);

    var mass = [.055, .815, 1, .107, 318, 95, 14.5, 17, .00015]

    var massBar = { 
        x: planetsAndFriends.slice(0, 8),
        y: mass,
        type: 'bar',
        marker: {color: ['gray', 'goldenrod', 'green', 'orangered', 'orange', 'gold', 'turquoise', 'blue']},
    }

    var massDisplay = document.getElementById('mass-container');
    var dataMass = [massBar];

    var layoutMass = {
        title: 'Mass of Planets Relative to Earth',
        xaxis: {title: 'Planets'},
        yaxis: {title: 'Mass / M_Earth'},
    }

    Plotly.newPlot(massDisplay, dataMass, layoutMass);

    var apparentMag_avg = [-26.74, .23, -4.14, 6.5, -12.74, .71, -2.2, -.46, 5.68, 7.78, -.27, -1.47, .5];
    var absoluteMag = [4.83, 5.71, 1.42, -5.85]

    var AppMagnitudeBar = {
        x: ["Sun", "Mercury", "Venus", "Human Eye Limit", "Full Moon", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Alpha Centauri", "Sirius", "Betelgeuse"],
        y: apparentMag_avg,
        type: 'bar',
        name: 'Apparent Magnitude',
        text: ["Sun", "Mercury", "Venus", "Eye Limit", "Full Moon", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Alpha Centauri", "Sirius", "Betelgeuse"],
        marker: {
            color: ['blue', 'blue', 'blue', 'green', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
            opacity: .5,
            line: {
                color: 'black',
                width: 1.5
            }},
    }

    var AbsMagnitudeBar = {
        x: ["Sun", "Alpha Centauri", "Sirius", "Betelgeuse"],
        y: absoluteMag,
        type: 'bar',
        name: 'Absolute Magnitude',
        text: ["Sun", "Alpha Centauri", "Sirius", "Betelgeuse"],
        marker: {
            color: 'orangered',
            line: {
                color: 'black',
                width: 1.5
            }},
    }

    var magnitudeDisplay = document.getElementById("magnitude-container");
    var dataMagnitude = [AppMagnitudeBar, AbsMagnitudeBar];

    var layoutMagnitude = {
        title: 'Average Apparent Magnitude of Celestial Bodies and Absolute Magnitude of Several Stars',
        xaxis: {title: 'Sun, Moon, Planets, and Stars'},
        yaxis: {title: 'Magnitude'},
    }

    Plotly.newPlot(magnitudeDisplay, dataMagnitude, layoutMagnitude);

    var timescale = [-.05, 0, 4.57, 9.84, 11.6, 12.27, 12.27001, 12.37, 12.39, 12.3905];
    var solar_radius = [0, .93, 1, 1.75, 3.5, 180, 10, 20, 200, .03];
    var solar_lum = [0, .87, 1, 1.75, 2.2, 2800, 50, 100, 2000, .01];

    for (i = 0; i < timescale.length; i++) {
        solar_radius[i] = Math.log(solar_radius[i]);
        solar_lum[i] = Math.log(solar_lum[i]);
    }

    var evolution_text = [
        "Proto-star",
        "Zero-Age Main Sequence",
        "Current Age",
        "Hydrogen Core Exhaustion - Hydrogen Shell Burning",
        "First Dredge-Up",
        "Helium Core Flash",
        "Helium Core Burning: Horizontal Branch: Triple Alpha",
        "Second Dredge-Up: Helium Shell Burning - Asymptotic Giant Branch",
        "Thermal Pulse",
        "Planetary Nebula - White Dwarf"]

    var sunPlot_radius = { 
        x: timescale,
        y: solar_radius,
        name: 'Radius',
        text: evolution_text,
        mode: 'lines+markers',
        marker: {size: [10, 10, 20, 10, 10, 10, 10, 10, 10, 10],
            color: 'blue'}
    }

    var sunPlot_lum = { 
        x: timescale,
        y: solar_lum,
        name: 'Luminosity',
        text: evolution_text,
        mode: 'lines+markers',
        marker: {size: [10, 10, 20, 10, 10, 10, 10, 10, 10, 10],
            color: 'orangered'}
    }

    var sunDisplay = document.getElementById("sun-container");
    var dataSun = [sunPlot_radius, sunPlot_lum];

    var layoutSun = {
        title: 'Characteristics of the Sun from Formation to White Dwarf',
        xaxis: {title: 'Time (Billion Years)'},
        yaxis: {title: 'Log (Value/Value_current)'},
    }

    Plotly.newPlot(sunDisplay, dataSun, layoutSun);

    // astronomical constants
    var AU = 149597870700;

    // nitty gritty math
    function SphericalCoordinates(longitude, latitude, radius) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.radius = radius;
    }

    function AngleClass() {
        this.DEG_FROM_RAD = 180.0 / Math.PI;
        this.RAD_FROM_DEG = Math.PI / 180.0;
        this.HOURS_FROM_RAD = 12.0 / Math.PI;
        this.RAD_FROM_HOURS = Math.PI / 12.0;

        this.CosDeg = function (degrees) {
            return Math.cos(this.RAD_FROM_DEG * degrees);
        }

        this.SinDeg = function (degrees) {
            return Math.sin(this.RAD_FROM_DEG * degrees);
        }

        this.TanDeg = function (degrees) {
            return Math.tan(this.RAD_FROM_DEG * degrees);
        }

        this.CosHour = function (hours) {
            return Math.cos(this.RAD_FROM_HOURS * hours);
        }

        this.SinHour = function (hours) {
            return Math.sin(this.RAD_FROM_HOURS * hours);
        }

        this.AtanDeg2 = function (y, x) {
            return this.DEG_FROM_RAD * Math.atan2(y, x);
        }

        this.FixHours = function (hours) {
            return this.FixCycle(hours, 24.0);
        }

        this.FixDegrees = function (degrees) {
            return this.FixCycle(degrees, 360.0);
        }

        this.FixCycle = function (angle, cycle) {
            var fraction = angle / cycle;
            return cycle * (fraction - Math.floor(fraction));
        }

        this.Polar = function (x, y, z) {
            var rho = (x * x) + (y * y);
            var radius = Math.sqrt(rho + (z * z));
            var phi = Angle.AtanDeg2(y, x);
            if (phi < 0) {
                phi += 360.0;
            }
            var rho = Math.sqrt(rho);
            var theta = Angle.AtanDeg2(z, rho);
            return new SphericalCoordinates(phi, theta, radius);
        }

        this.DMS = function (x) {
            var a = {};

            a.negative = (x < 0);
            if (a.negative) {
                x = -x;
            }

            a.degrees = Math.floor(x);
            x = 60.0 * (x - a.degrees);
            a.minutes = Math.floor(x);
            x = 60.0 * (x - a.minutes);
            a.seconds = Math.round(10.0 * x) / 10.0;   // Round to the nearest tenth of an arcsecond.

            if (a.seconds == 60) {
                a.seconds = 0;
                if (++a.minutes == 60) {
                    a.minutes = 0;
                    ++a.degrees;
                }
            }

            return a;
        }

        this.DMM = function (x) {
            var a = {};
            a.negative = (x < 0);
            if (a.negative) {
                x = -x;
            }

            a.degrees = Math.floor(x);
            x = 60.0 * (x - a.degrees);
            a.minutes = Math.round(100.0 * x) / 100.0;     // Round to nearest hundredth of an arcminute.
            a.seconds = 0.0;        // Fill in just for consistency with Angle.DMS

            if (a.minutes >= 60.0) {
                a.minutes -= 60.0;
                ++a.degrees;
            }

            return a;
        }

        this.SafeArcSinInDegrees = function (z) {
            var abs = Math.abs(z);
            if (abs > 1.0) {
                // Guard against blowing up due to slight roundoff errors in Math.Asin ...
                if (abs > 1.00000001) {
                    throw "Invalid argument to SafeArcSinInDegrees";
                } else if (z < -1.0) {
                    return -90.0;
                } else {
                    return +90.0;
                }
            } else {
                return this.DEG_FROM_RAD * Math.asin(z);
            }
        }
    }

    var Angle = new AngleClass();

    function GreenwichTime(day) {
        var midnight = Math.floor(day);
        var T0 = midnight / 36525;
        var tUT = (day - midnight) * 24.0;
        var SG = (6.6974 + 2400.0513 * T0) + (366.2422 / 365.2422) * tUT;
        SG = Angle.FixHours(SG);
        return SG;
    }

    var helioToGeo = function (planets, p) {

        var earthx = planets[3]["position"]["x"]
        var earthy = planets[3]["position"]["y"]
        var earthz = planets[3]["position"]["z"]

        var geoCoor = [];

        var heliox = planets[p]["position"]["x"]
        var helioy = planets[p]["position"]["y"]
        var helioz = planets[p]["position"]["z"]

        var geox = heliox - earthx
        var geoy = helioy - earthy
        var geoz = helioz - earthz

        geoCoor.push(geox, geoy, geoz);

        return geoCoor;
    }

    $("#coor-btn").on("click", function (event) {
        event.preventDefault();

        $("#topo").append($("<div id='mercury' class='planetDiv'>"));
        $("#topo").append($("<div id='venus' class='planetDiv'>"));
        $("#topo").append($("<div id='mars' class='planetDiv'>"));
        $("#topo").append($("<div id='jupiter' class='planetDiv'>"));
        $("#topo").append($("<div id='saturn' class='planetDiv'>"));
        $("#topo").append($("<div id='uranus' class='planetDiv'>"));
        $("#topo").append($("<div id='neptune' class='planetDiv'>"));
        $("#topo").append($("<div id='pluto' class='planetDiv'>"));
        $("#topo").append($("<div id='moon' class='planetDiv'>"));

        setInterval(function () {
            var userCoor = [$("#lat-input").val(), $("#long-input").val()];

            var planets = window.lagrange.planet_positions.getPositions(new Date());
            var daysSinceJ2000 = (new Date().getTime() - Date.UTC(2000, 0, 1)) / 86400000

            for (p = 0; p < planets.length; p++) {

                if (planets[p].name === "earth" || planets[p].name === "halley" || planets[p].name === "sun") {
                    continue;
                } else {
                    var geoCoor = helioToGeo(planets, p);
                    // console.log(planets[p].name);
                    var RaDec = geoToRaDec(daysSinceJ2000, geoCoor);
                    // console.log(RaDec)
                    var altAz = TopocentricCoor(RaDec, userCoor, daysSinceJ2000);
                    $(".planetDiv").each(function() {
                        if (planets[p].name === $(this).attr("id")) {
                            $(this).text(altAz[0] + "  ,  " + altAz[1])
                        }
                    })
                    // $(".container-fluid").append($("<p>" +
                    //     planets[p].name + ": " + altAz[0] + "     " + altAz[1] + "</p>"))
                }
            }
        }, 1000)
    })

    function geoToRaDec (day, coordinates) {
        var gx = coordinates[0] / AU;
        var gy = coordinates[1] / AU;
        var gz = coordinates[2] / AU;
        
        // centuries since J2000
        var T = day / 36525;
        // obliquity of the ecliptic
        var K = 23.4392911 - ((46.8150 * T) - (0.00059 * T * T) + (0.001813 * T * T * T))/3600.0;   
        // convert to equatorial cartesian coordinates
        var cosK = Angle.CosDeg(K);
        var sinK = Angle.SinDeg(K);
    
        var eqx = gx;
        var eqy = (gy * cosK) - (gz * sinK);
        var eqz = (gy * sinK) + (gz * cosK);
        
        // convert to right ascension (in degrees) and declination
        var eq = Angle.Polar (eqx, eqy, eqz);
        eq.longitude /= 15;       // convert degrees to sidereal hours       
        return eq;
    }

    function TopocentricCoor(objectCoor, userCoor, day) {

        var GST = GreenwichTime(day);
        var LST = GST + (userCoor[1] / 15.0);
        var hourAngle = Angle.FixHours(LST - objectCoor.longitude);

        var sinLat = Angle.SinDeg(userCoor[0]);
        var cosLat = Angle.CosDeg(userCoor[0]);

        var sinHourAngle = Angle.SinHour(hourAngle);
        var cosHourAngle = Angle.CosHour(hourAngle);

        var sinDec = Angle.SinDeg(objectCoor.latitude);
        var cosDec = Angle.CosDeg(objectCoor.latitude);

        var altitudeRatio = (sinLat * sinDec) + (cosLat * cosDec * cosHourAngle);
        // Correct for values that are out of range for inverse sine function...
        var absAltitudeRatio = Math.abs(altitudeRatio);

        if (absAltitudeRatio > 1.0) {
            this.altitude = (altitudeRatio < 0) ? -90.0 : +90.0;
            this.azimuth = 90;    // doesn't really matter what angle we assign: use this value to assist culmination algorithm.            
        
        } else {
            this.altitude = Angle.DEG_FROM_RAD * Math.asin(altitudeRatio);
            this.azimuth = Angle.FixDegrees(Angle.AtanDeg2(-cosDec * sinHourAngle, (cosLat * sinDec) - (sinLat * cosDec * cosHourAngle)));
        }
        return [this.azimuth, this.altitude];
    }
        
})



// List of stuff we would want in our model:
//  -the 8 planets
//  -several dwarf planets:
//      ceres, pluto-charon system, eris, haumea, makemake
//  -natural satellites:
//      the moon
//      jovian: ganymede, europa, io, callisto
//      saturnian: titan, enceladus
//      neptunian: triton
//  asteroid belt
//  kuiper belt
//  oort cloud

// optional stuff for the plots:
//  error bars for magnitude

// plots: temperature vs time
//  kuiper belt, oort cloud, alpha centauri system
// satellite api and locations
// possibility of life in solar system
// convert Ra Dec to alt,az