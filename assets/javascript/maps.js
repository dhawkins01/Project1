var map, lodgingMap, parkMap;

function initMap() {
    // Create the map.
    var orlando = { lat: 28.47413, lng: -81.46969 };
    var orlando2 = { lat: 28.47411, lng: -81.46190};
    var orlando3 = { lat: 28.43641, lng: -81.47965};
    map = new google.maps.Map(document.getElementById('map'), {
        center: orlando,
        zoom: 11
    });
    lodgingMap = new google.maps.Map(document.getElementById('lodgingMap'), {
        center: orlando2,
        zoom: 14
    });
    parkMap = new google.maps.Map(document.getElementById('parkMap'), {
        center: orlando3,
        zoom: 11
    });

    var infowindow = new google.maps.InfoWindow();


    // Create the places service.
    var service = new google.maps.places.PlacesService(map);
    var service2 = new google.maps.places.PlacesService(lodgingMap);
    var service3 = new google.maps.places.PlacesService(parkMap);
    var getNextPage = null;
    var getNextPage2 = null;
    var getNextPage3 = null;
    var moreButton = document.getElementById('more');
    var moreButton2 = document.getElementById('lodgingmore');
    var moreButton3 = document.getElementById('parkmore');

    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };

    moreButton2.onclick = function () {
        moreButton2.disabled = true;
        if (getNextPage2) getNextPage();
    }
    moreButton3.onclick = function () {
        moreButton3.disabled = true;
        if (getNextPage3) getNextPage();
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
        { location: orlando2, radius: 20000, type: ['lodging'] },
        function (results, status, pagination) {
            if (status !== 'OK') return;
            createMarkers2(results);
            moreButton2.disabled = !pagination.hasNextPage;
            getNextPage2 = pagination.hasNextPage && function () {
                pagination.nextPage();
            };
        });
    service3.nearbySearch(
        { location: orlando3, radius: 20000, type: ['amusement_park'] },
        function (results, status, pagination) {
            if (status !== 'OK') return;
            createMarkers3(results);
            moreButton3.disabled = !pagination.hasNextPage;
            getNextPage3 = pagination.hasNextPage && function () {
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
    // map.fitBounds(bounds);
}

function createMarkers2(places) {
    var bounds2 = new google.maps.LatLngBounds();
    var placesList2 = document.getElementById('lodgingplaces');

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker2 = new google.maps.Marker({
            map: lodgingMap,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        var li = document.createElement('li');
        li.textContent = place.name;
        placesList2.appendChild(li);

        bounds2.extend(place.geometry.location);
    }
    // lodgingMap.fitBounds(bounds2);
}

function createMarkers3(places) {
    var bounds3 = new google.maps.LatLngBounds();
    var placesList3 = document.getElementById('parkplaces');

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker2 = new google.maps.Marker({
            map: parkMap,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        var li = document.createElement('li');
        li.textContent = place.name;
        placesList3.appendChild(li);

        bounds3.extend(place.geometry.location);
    }
    // parkMap.fitBounds(bounds3);
}