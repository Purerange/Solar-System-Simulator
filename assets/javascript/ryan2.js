$(document).ready(function() {

    // astronomical unit
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

    $("#coor-btn").on("click", function (event) {
        event.preventDefault();

        setInterval(function () {
            var userCoor = [$("#lat-input").val(), $("#long-input").val()];

            var planets = window.lagrange.planet_positions.getPositions(new Date());
            var daysSinceJ2000 = (new Date().getTime() - Date.UTC(2000, 0, 1)) / 86400000

            for (p = 0; p < planets.length; p++) {

                if (planets[p].name === "earth" || planets[p].name === "halley" || planets[p].name === "sun") {
                    continue;
                } else {
                    var geoCoor = helioToGeo(planets, p);
                    var RaDec = geoToRaDec(daysSinceJ2000, geoCoor);
                    var altAz = TopocentricCoor(RaDec, userCoor, daysSinceJ2000);

                    $(".planet-row").each(function() {
                        if ($(this).attr("data-planet") === planets[p].name) {
                            $(this).find("td.az-box").text(altAz[0]);
                            $(this).find("td.alt-box").text(altAz[1]);
                        }
                    })
                }
            }
        }, 1000)
    })
})