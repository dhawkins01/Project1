
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;

function initMap() {
    // Create the map.
    var orlando = { lat: 28.47413, lng: -81.46969 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: orlando,
        zoom: 17
    });
    var infowindow = new google.maps.InfoWindow();


    // Create the places service.
    var service = new google.maps.places.PlacesService(map);
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
        moreButton.disabled = true;
        if (getNextPage) getNextPage();
    };

    // Perform a nearby search.
    service.nearbySearch(
        { location: orlando, radius: 20000, type: ['amusement_park'] },
        function (results, status, pagination) {
            if (status !== 'OK') return;

            createMarkers(results);
            moreButton.disabled = !pagination.hasNextPage;
            getNextPage = pagination.hasNextPage && function () {
                pagination.nextPage();
            };
        });

    var request = {
        fields: ['name', 'formatted_address', 'photos', 'place_id', 'geometry']
    };
    // service.getDetails(request, function (place, status) {
    //     google.maps.event.addListener(marker, 'click', function () {
    //         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
    //             'Place ID: ' + place.place_id + '<br>' +
    //             place.formatted_address + '</div>' +
    //             '<img src=' + place.photos[0].getUrl() + ' height="100" width="100">'
    //         );
    //         infowindow.open(map, this);
    //     });
    // })

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