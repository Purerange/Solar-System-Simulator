// example function plot 

$(document).ready(function() {

    var TESTER = document.getElementById('tester');

    Plotly.plot(TESTER, [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] }], { 
    margin: { t: 1, b: 2,} } );

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
