// example function plot 

$(document).ready(function() {

    var planetsAndFriends = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Ceres", "Pluto-Charon", "Haumea", "Makemake", "Eris"]
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
