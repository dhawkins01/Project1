$(".dropdown-item").on("click", function() {

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
    });
}); // end of on.click