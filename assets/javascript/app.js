


// function to show the temperature on the footer

function initializeWeather() {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?zip=32812,us&APPID=61f56f48135eb5c36c6c42128d4c142f",
        method: "GET",

    }).then(function (response) {
        console.log(response);
        var kelvin = response.main.temp;
        console.log(kelvin);
        var f = (kelvin - 273.15) * (9 / 5) + 32;
        console.log(f);
        var far = Math.floor(f);
        console.log(far);
        $("#temp").text(far);
    });
    // call the initializeWeather function
    


}; //end of initialize weather
initializeWeather();






// When a city is selected from the dropdown, display the skyscanner api info on the airlines card
$(".dropdown-item").on("click", function () {

    var originCity = $(this).attr("data-id");
    console.log(originCity);

    var queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + originCity + "/JFK-sky/2019-09-01?inboundpartialdate=2019-12-01";

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '7881c40dadmshae1e704891f8867p13bfd1jsn4ca097a54b54'
        },
    }).then(function (response) {
        console.log(response);
        var price = response.Quotes[0].MinPrice;
        console.log(price);
        $("#price").text(price);
        $("#airlines").text("");

        for (i = 0; i < response.Carriers.length; i++) {
            var a = $("<div>");

            $("#airlines").append(a);
            a.append(response.Carriers[i].Name);

        };
    });
});

