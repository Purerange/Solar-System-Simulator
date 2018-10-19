$(document).ready(function () {
    console.log("nasa script active");

    var planetButtons = {
        sun: {
            name: "Sun",
            img: "assets/images/sun.png",
        },
        mercury: {
            name: "Mercury",
            img: "assets/images/mercury.png"
        },
        venus: {
            name: "Venus",
            img: "assets/images/venus.png"
        },
        earth: {
            name: "Earth",
            img: "assets/images/earth2.png"
        },
        moon: {
            name: "Moon",
            img: "assets/images/moon.png"
        },
        mars: {
            name: "Mars",
            img: "assets/images/mars.png"
        },
        ceres: {
            name: "Ceres",
            img: "assets/images/ceres.png"
        },
        jupiter: {
            name: "Jupiter",
            img: "assets/images/jupiter.png"
        },
        saturn: {
            name: "Saturn",
            img: "assets/images/saturnScaled.png"
        },
        uranus: {
            name: "Uranus",
            img: "assets/images/uranus.png"
        },
        neptune: {
            name: "Neptune",
            img: "assets/images/neptune.png"
        },
        pluto: {
            name: "Pluto",
            img: "assets/images/pluto.png"
        },
        charon: {
            name: "Charon",
            img: "assets/images/charon.png"
        },
        eris: {
            name: "Eris",
            img: "assets/images/makemake.png",
        }
    }

    //makes the planet buttons beneath the model
    function makeButtons() {
        console.log("making buttons");
        $.each(planetButtons, function(key, button) {
            var btn = $("<button>");
            btn.addClass("planet-btn");
            btn.attr("data-planet",button.name);
            btn.text(button.name);
            $("#buttons").append(btn);
            console.log("button created");
        });
    }

    //user clicked a planet button
    $(document).on("click", ".planet-btn", planetButtonHandler);

    //displays images and information for that planet
    function planetButtonHandler() {
        //clearing current images
        $("#images").empty();

        var key = "spoz2THM4jRWW0CSQC8rmKgT5gDGhOqqqZF7Fe0Z";
        var search = $(this).attr("data-planet");
        console.log(search);
        var queryURL = "https://images-api.nasa.gov/search?q=" + search + "&media_type=image";

        //calling nasa image api
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);

            var pictures = response.collection.items;
            //console.log(pictures);

            var endpoint = Math.min(5, pictures.length);
            //console.log(endpoint);

            //displaying images
            for(var i=0; i< endpoint; i++) {
                var imgObject = pictures[i];
                console.log(imgObject);

                var title = imgObject.data[0].title;
                var date = imgObject.data[0].date_created;
                var description = imgObject.data[0].description;
                var image = imgObject.links[0].href;

                var container = $("<div>");

                var h3 = $("<h3>");
                h3.addClass("img-title")
                h3.text(title);

                var img = $("<img/>");
                img.addClass("planet-pic");
                img.attr("src",image);

                var caption = $("<p>");
                caption.addClass("blurb")
                caption.text(description);

                container.append(h3);
                container.append(img);
                container.append(caption);

                $("#images").append(container);
            }

        });



    }

    // $.ajax({
    //     method: "GET",
    //     query: 
    
    makeButtons();

});