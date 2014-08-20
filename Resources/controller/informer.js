var mainWin = require('../views/main-window'), 
	weatherView = require('../views/weather');

function WeatherInformer(){
	this.init();
}

WeatherInformer.prototype.init = function(){
	this.window = mainWin();
	this.lastForecast=Ti.App.Properties.getString('lastForecast', 'empty');
	console.log(this.lastForecast);
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
	         Ti.App.Properties.setString('lastForecast', JSON.stringify(responceObj));
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
	     timeout : 20000  // in milliseconds
	 });
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
	
};

WeatherInformer.prototype.parseForecast = function(forecast){
	var pressure = forecast.pressure * 0.75008;
};

WeatherInformer.prototype.renderWeather = function(){
	var weatherViewPrepared = weatherView(this.weather); 
	this.window.add(weatherViewPrepared);
	this.window.remove(this.window.getChildren()[1]);
	this.notFirstRender = true;
	

};
module.exports = WeatherInformer;
