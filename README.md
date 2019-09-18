# Solar-System-Simulator

### Main Canvas

This project models the Solar System, depicting the Sun, planets, and dwarf planets. Notably, this model depicts the Sun, planets, and dwarf planets orbiting the true barycenter of the Solar System, which on average lies outside of the Sun due to primarily the gravitation influence of Jupiter.

Distances and sizes are not to scale, but the relative orbital velocities are. All the orbits are approximated as circles or ellipses; the shapes of the dwarf planet orbits are almost relatively to scale. Pluto is accurately depicted as the Pluto-Charon two-body system, similarly to how our System is technically a two-body system of the Sun and Jupiter (with pertubation contributions from the other gas giants).

The Fate of the Sun page depicts the Sun as it ages past its main sequence stage, becoming a red giant and engulfing Mercury, Venus, and Earth before ultimately becoming a White Dwarf stellar remnant. Color, timescale, and size are not to scale.

### Simple Plots

The Data page visualizes certain relationship and characteristics of the Solar System: distances and orbital inclinations of planets and dwarf planets; relative masses of the planets; apparent magnitude of objects (along with absolute magnitude of few stars); the luminosity and radius of the Sun as a function of time.

### Coordinates

The Coordinates page allows users to input values for their latitude and longitude to retrieve the topocentric coordinates of select solar system bodies for the given latitude and longitude. Applying linear algebra and equations commonly used in astronomy with the help Martin Vezina's coordinate transformation code, I created a pseudo-tracker that displays the location of celestial objects in the sky relative to the input location in current time. Most of the coordinates should be accurate within 1 degrees.

### Credits

Heliocentric Cartesian Coordinates: Martin Vezina; https://github.com/mgvez/planet-positions/blob/master/vendor/three/math/Vector3.js

Coordinate Transformation: Don Cross; cosinekitty.com/astronomy.js

All pictures of planetary bodies credit to NASA.