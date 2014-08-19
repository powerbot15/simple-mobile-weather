var mainWin = require('../views/main-window'), 
	weatherView = require('../views/weather');

function WeatherInformer(){
	this.init();
}

WeatherInformer.prototype.init = function(){

};

WeatherInformer.prototype.getCityID = function(sityName){
	var	 self = this,
		 url = 'http://api.openweathermap.org/data/2.5/weather?q=' + sityName,
	 	 client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	         self.cityId = JSON.parse(client.responseText).id;
	         self.getForecast(self.cityId);
	         // alert('success');
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
WeatherInformer.prototype.getForecast = function(id){
	var	 self = this,
		 url = 'http://api.openweathermap.org/data/2.5/forecast?id=' + id,
	 	 client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	         self.forecast = JSON.parse(client.responseText);
	         alert(self.forecast.city.name);
	         // self.renderWeather();
	         // alert('success');
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

WeatherInformer.prototype.getNowWeather = function(){
	var	 self = this,
		 url = 'http://api.openweathermap.org/data/2.5/weather?q=Cherkasy',
	 	 client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	         self.weather = JSON.parse(client.responseText);
	         self.renderWeather();
	         // alert('success');
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
WeatherInformer.prototype.renderWeather = function(){
	this.window = mainWin();
	this.window.add(weatherView(this.weather));
	this.window.open();
};
module.exports = WeatherInformer;
