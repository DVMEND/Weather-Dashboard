
$("#search-button").click(function(event){
  event.preventDefault();
  var cityInput = $("#search-value").val();
  var noSpace = cityInput.replace(/\s/g, '+')
  console.log(noSpace);
  //apiKey= "62e3185f6eb6074c28be5645cf545d09";

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + noSpace + "&units=imperial&appid=62e3185f6eb6074c28be5645cf545d09";
  console.log(queryURL); 


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        $("#history").append("<li>" + cityInput + "</li>");
        var cityName= response.name;

        var currentDate = moment()
        var currentDate = moment().format("MM/DD/YYYY");
        var iconCode = response.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        $('icon').attr('src', iconUrl);

        var cityTemperature = response.main.temp;
        var feelsLike = response.main.feels_like;
        var tempMin = response.main.temp_min;
        var tempMax = response.main.temp_max;
        var cityHumidity = response.main.humidity;
        var windSpeed = response.wind.speed;

        
        
        $("#today").append("<h2>" + cityName + " (" + currentDate + ")" + "<img id= 'icon' src='' alt='Weather Icon'></h2>");
        $('#icon').attr('src', iconUrl);

        $("#today").append("<p>Temperature: " + cityTemperature + " ℉</p>");
        $("#today").append("<p>Feels Like: " + feelsLike + " ℉</p>");
        $("#today").append("<p>Min Temperature: " + tempMin + " ℉</p>");
        $("#today").append("<p>Max Temperature: " + tempMax + " ℉</p>");
        $("#today").append("<p>Humidity: " + cityHumidity + "%</p>");
        $("#today").append("<p>Wind Speed: " + windSpeed + " MPH</p>");
        
      });


})
$("#search-button").click(function(event){
  event.preventDefault();
  var cityInput = $("#search-value").val();
  var noSpace = cityInput.replace(/\s/g, '+')
  
  var queryURL = 

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

  })
})

