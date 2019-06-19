var map, lodgingMap;

function initMap() {
    // Create the map.
    var orlando = { lat: 28.47413, lng: -81.46969 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: orlando,
        zoom: 14
    });
    lodgingMap = new google.maps.Map(document.getElementById('lodgingMap'), {
        center: orlando,
        zoom: 14
    });
    var infowindow = new google.maps.InfoWindow();


    // Create the places service.
    var service = new google.maps.places.PlacesService(map);
    var service2 = new google.maps.places.PlacesService(lodgingMap);
    var getNextPage = null;
    var getNextPage2 = null;
    var moreButton = document.getElementById('more');
    var moreButton2 = document.getElementById('lodgingmore');

    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };

    moreButton2.onclick = function(){
        moreButton2.disabled = true;
        if (getNextPage2) getNextPage();
    }
    // Perform a nearby search.
    service.nearbySearch(
        { location: orlando, radius: 20000, type: ['restaurant'] },
        function (results, status, pagination) {
            if (status !== 'OK') return;
            createMarkers(results);
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };
        });
    
        service2.nearbySearch(
            { location: orlando, radius: 20000, type: ['lodging'] },
            function (results, status, pagination) {
                if (status !== 'OK') return;
                createMarkers(results);
                moreButton2.disabled = !pagination.hasNextPage;
                getNextPage2 = pagination.hasNextPage && function () {
                    pagination.nextPage();
                };
            });    
    var request = {
        fields: ['name', 'formatted_address', 'photos', 'place_id', 'geometry']
    };
}

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.getElementById('places');

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        var li = document.createElement('li');
        li.textContent = place.name;
        placesList.appendChild(li);

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}

