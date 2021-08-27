//sets a variable that contains an empty array where the indexes of the days that we want to use for the 5 day forecast will be stored
var forecastArray = [];
//Function that on click submits the text within the search field 
$("#search-button").click(function(event){
  //Allows 5 day forecast to load without issues
  event.preventDefault();
  //hides any elements that are left-over from previous searches
  $("#cityName").remove();
  $(".temperature").remove();
  $(".feelsLike").remove();
  $(".minTemperature").remove();
  $(".maxTemperature").remove();
  $(".humidity").remove();
  $(".windSpeed").remove();

  //capitalizes the any string
  function capitalize(str) {
    const lower = str.toLowerCase()
    return str.charAt(0).toUpperCase()
    + lower.slice(1)
  }
  
  //creates a variable that stores the city input
  var cityInput = $("#search-value").val();
  //removes spacing from the city input for use in API and ID names 
  var noSpace = cityInput.replace(/\s/g, '+')
  

  //Open Weather Map API that is used in the website
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + noSpace + "&units=imperial&appid=62e3185f6eb6074c28be5645cf545d09";
  

  //ajax call that gets the data from the API
  $.ajax({
      url: queryURL,
      method: "GET"
      //respose to the API call 
  }).then(function(response) {
      //empties previous entries to the current weather
      $("#today").addClass("border");
      $("#today p").empty();
      $("#today h2").empty();
      //empties previous forecast cards
      $("#cards").empty();

      //Adds a city name to the history section when the city is submitted in the search bar 
      $("#history").append("<li class='historyItem' id='history" + noSpace +"'>" + cityInput + "</li>");

      //assigns the city name from the api to a variable
      var cityName= response.name;
      
      //Uses Moment api to get current date and format it 
      var currentDate = moment()
      var currentDate = moment().format("MM/DD/YYYY");
      //Gets the icon for the current weather
      var iconCode = response.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      //sets the icon 
      $('icon').attr('src', iconUrl);

      //gets different components of the current weather and assigns them to variables 
      var cityTemperature = response.main.temp;
      var feelsLike = response.main.feels_like;
      var tempMin = response.main.temp_min;
      var tempMax = response.main.temp_max;
      var cityHumidity = response.main.humidity;
      var windSpeed = response.wind.speed;

      
      //Appends the City name and weather icon to the page 
      $("#today").append("<h2 id='cityName'>" + cityName + " (" + currentDate + ")" + "<img id= 'icon' src='' alt='Weather Icon'></h2>");
      $('#icon').attr('src', iconUrl);

      //Appends the current weather components to the page 
      $("#today").append("<p class = 'temperature' id='temperature'>Temperature: " + cityTemperature + " ℉</p>");
      $("#today").append("<p class = 'feelsLike' id='feelsLike'>Feels Like: " + feelsLike + " ℉</p>");
      $("#today").append("<p class = 'minTemperature' id='minTemperature'>Min Temperature: " + tempMin + " ℉</p>");
      $("#today").append("<p class = 'maxTemperature' id='maxTemperature'>Max Temperature: " + tempMax + " ℉</p>");
      $("#today").append("<p class = 'humidity' id='humidity'>Humidity: " + cityHumidity + "%</p>");
      $("#today").append("<p class = 'windSpeed' id='windSpeed'>Wind Speed: " + windSpeed + " MPH</p>");
      
      //saves the API data for current weather for the searched city in local storage.
      localStorage.setItem(noSpace + "Current", JSON.stringify(response));

      //Function that is called when a city in the history section is clicked
      $(".historyItem").click(function(event){
        //makes a new variable that stores the name of the city that is clicked
        var cityName= $(this).text();
        //made a constant that contains the capitalized city name
        const capitalizedHistory = capitalize(cityName);
        //Takes away spaces within cities, which allows the items to be gotten correctly from local storage.
        var noSpace = cityName.replace(/\s/g, '+');
        
        event.preventDefault();
        //assigns a pull of the current weather data that was previously stored in local storage to a variable 
        var pull = JSON.parse(localStorage.getItem(noSpace + 'Current'));
        //assigns a pull of the 5 day forcast data that was previously stored in local storage to a variable 
        var pullForecast= JSON.parse(localStorage.getItem(noSpace + '5Day'));
        
        //gets the weather icon from the current weather local data 
        var iconCode = pull.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
          
        //replaces the City name with the city clicked in the search history 
        $("#cityName").text(capitalizedHistory + " (" + currentDate + ")");
        //appends the weather icon to the city name 
        $("#cityName").append("<img id= 'icon' src='' alt='Weather Icon'></img>")
        $("#icon").attr('src', iconUrl);

        //Replaces current weather components with the components from the history city 
        $("#temperature").text("Temperature: " + pull.main.temp + " ℉");
        $("#feelsLike").text("Feels Like: " + pull.main.feels_like + " ℉");
        $("#minTemperature").text("Min Temperature: " + pull.main.temp_min + " ℉");
        $("#maxTemperature").text("Max Temperature: " + pull.main.temp_max + " ℉");
        $("#humidity").text("Humidity: " + pull.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + pull.wind.speed + " MPH");

        //Replaces the 5 day forecast components with the components for the history city, using the indexes stored in the forecast array
        //and the 5 day forecast data stored in local storage for the clicked history city.
        for (var i=0; i<5; i++){
            $("#card"+forecastArray[i]).find(".temp").text("Temp: "+pullForecast.list[forecastArray[i]].main.temp + "℉");
            $("#card"+forecastArray[i]).find(".humidity").text("Humidity: "+pullForecast.list[forecastArray[i]].main.humidity + "%");
            $("#card"+forecastArray[i]).find("img").attr("src","http://openweathermap.org/img/w/" + pullForecast.list[forecastArray[i]].weather[0].icon + ".png");
          
          };
      

      
      });
    });
    
  var cityInput = $("#search-value").val();
  var noSpace = cityInput.replace(/\s/g, '+')
  
  //variable that stores the Open Weather Map API for 5 day forecasts 
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + noSpace + "&units=imperial&appid=62e3185f6eb6074c28be5645cf545d09";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    $("#5day").text("5-Day Forecast:")
    
  
    //for loop that checks the data gotten from the API and returns items that include the time 15:00. 
    //This ensures that only 1 hour is included per day, giving us our 5 day forecast.
    for (var i=0; i<response.list.length; i++){
      if (response.list[i].dt_txt.includes("15:00:00")){
      //pushes the indexes that include 15:00 to the forecastArray
      forecastArray.push(i);
      //Gets the date for each included index 
      var dates = response.list[i].dt_txt;
      //formats the dates wiht the Moment API 
      var datesFormat = moment(dates);
      var datesFormat = moment(dates).format("MM/DD/YYYY");
      //gets the components for each index and assingns them to a variable 
      var datesTemp = response.list[i].main.temp;
      var datesHumidity = response.list[i].main.humidity;
      var datesIcon = response.list[i].weather[0].icon;
      var iconURL = "http://openweathermap.org/img/w/" + datesIcon + ".png";

        //creates cards, using the bootstrap template, that inlcude the date, icon, temperature, and humidity 
      $("#cards").append(
        '<div id="card' + i + '" class="card bg-info mx-3" style="width: 10rem;"><div class="card-body"><h5 class="card-title">Card title</h5><img src="" alt="Weather Icon"><p class="card-text temp">Temp: </p><p class="card-text humidity">Humidity: </p></div></div>'
      );
      //sets the text of each title to be the date for each card
      $("#card"+i+" h5").text(datesFormat);
      //appends the temperature for each card
      $("#card"+i).find(".temp").append(datesTemp + "℉");
      //appends the humidity for each card
      $("#card"+i).find(".humidity").append(datesHumidity+"%");
      //appends the icon for each card 
      $("#card"+i).find("img").attr("src",iconURL);

      
    }}
    //stores the 5day forecast data in local storage 
    localStorage.setItem(noSpace + "5Day", JSON.stringify(response));
      
  })

});

