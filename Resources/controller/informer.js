var mainWin = require('../views/main-window'), 
	weatherView = require('../views/weather');

function WeatherInformer(){
	this.init();
}

WeatherInformer.prototype.init = function(){
	this.window = mainWin();
	this.window.open();
};

WeatherInformer.prototype.getForecast = function(cityName){
	var	 self = this,
		 url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&mode=json',
	 	 client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	 var responceObj = JSON.parse(client.responseText);
   	         if(responceObj.cod === "404"){
	         	alert('City not found');
	         	return;
	         }
	         self.weather = responceObj;
	         // alert(self.forecast.city.name);
	         // self.renderWeather();
	         // alert('success');
	         self.renderWeather();
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	         Ti.API.debug(e.error);
	         alert('error');
	     },
	     timeout : 5000  // in milliseconds
	 });
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
	
};

WeatherInformer.prototype.renderForecast = function(){
	
};

WeatherInformer.prototype.renderWeather = function(){
	 
	this.window.add(weatherView(this.weather));
	this.notFirstRender = true;

};
module.exports = WeatherInformer;
