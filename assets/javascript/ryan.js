// example function plot 

$(document).ready(function() {

    var planetsAndFriends = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Ceres", "Pluto-Charon", "Haumea", "Makemake", "Eris"]
    var distanceFromSun = [.39, .72, 1, 1.52, 5.20, 9.58, 19.22, 30.11, 2.77, 39.48, 43.22, 45.72, 67.78];
    var declination = [6.34, 2.19, 1.58, 1.67, .032, .093, 1.02, .72, 9.2, 17.16, 28.19, 29, 44]
    var mass = [.055, .815, 1, .107]

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

    var dist_inc = document.getElementById('tester');
    var data1 = [distancePlot_terrestrial, distancePlot_gas, distancePlot_dwarf];
    var layout1 = {
        title: 'Orbital Distance from Sun and Inclination from Barycenter Plane',
        xaxis: {title: "Distance from Sun (AU)",
        },
        yaxis: {title: "Inclination (degrees)",
        },
    }

    Plotly.newPlot(dist_inc, data1, layout1);
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
