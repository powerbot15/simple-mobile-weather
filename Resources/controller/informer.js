var mainWin = require('../views/main-window'), 
	weatherView = require('../views/weather');

function WeatherInformer(){
	this.init();
}

WeatherInformer.prototype.init = function(){
	var now = new Date();
	this.timetoWeather = [ {'today' : now} ];
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
