
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


}
