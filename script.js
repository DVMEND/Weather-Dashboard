$(document).ready(function(){
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
        $("#today").addClass("border");
        $("#today p").empty();
        $("#today h2").empty();
        $("#cards").empty();

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
        
        localStorage.setItem(noSpace + "Current", JSON.stringify(response));
      });
      


  })
  $("#search-button").click(function(event){
    event.preventDefault();
    var cityInput = $("#search-value").val();
    var noSpace = cityInput.replace(/\s/g, '+')
    
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + noSpace + "&units=imperial&appid=62e3185f6eb6074c28be5645cf545d09";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      $("#5day").text("5-Day Forecast:")
      
    

      for (var i=0; i<response.list.length; i++){
        if (response.list[i].dt_txt.includes("12:00:00")){
        
        var dates = response.list[i].dt_txt;
        var datesFormat = moment(dates);
        var datesFormat = moment(dates).format("MM/DD/YYYY");
        var datesTemp = response.list[i].main.temp;
        var datesHumidity = response.list[i].main.humidity;
        var datesIcon = response.list[i].weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + datesIcon + ".png";
        console.log(iconURL);
        console.log(datesIcon);


        $("#cards").append(
          '<div id="card' + i + '" class="card bg-info mx-3" style="width: 10rem;"><div class="card-body"><h5 class="card-title">Card title</h5><img src="" alt="Weather Icon"><p class="card-text temp">Temp: </p><p class="card-text humidity">Humidity: </p></div></div>'
        );
        $("#card"+i+" h5").text(datesFormat);
        $("#card"+i).find(".temp").append(datesTemp + "℉");
        $("#card"+i).find(".humidity").append(datesHumidity+"%");
        $("#card"+i).find("img").attr("src",iconURL);
      }}
      localStorage.setItem(noSpace + "5Day", JSON.stringify(response));

      console.log(queryURL);
    

      console.log(datesTemp);

      console.log(datesFormat);
       
    })
  })

});

