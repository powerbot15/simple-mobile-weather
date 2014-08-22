var searchView = require('../views/search'), 
	weatherView = require('../views/weather'),
	welcomeView = require('../views/welcome'),
	favoritesView = require('../views/favorites'),
	loader = require('../views/loader');

function WeatherInformer(){
	this.init();
}

WeatherInformer.prototype.init = function(){
	// this.window = searchView();
	this.lastForecast = JSON.parse(Ti.App.Properties.getString('lastForecast', '{}'));
	this.favorites = JSON.parse(Ti.App.Properties.getString('favorites','[]'));
	console.log(this.favorites);
	this.window = welcomeView();
	this.window.add(favoritesView(this.favorites));
	// this.window.add(welcomeView(this.favorites));
	this.window.open();
};

WeatherInformer.prototype.goSearchView = function(){
	this.window.remove(this.window.getChildren()[0]);
	this.window.add(searchView());
};

WeatherInformer.prototype.search = function(searchString){
		var app = this;
		if(app.notFirstRender){
			app.window.remove(app.window.getChildren()[1]);
		}
		else{
			app.notFirstRender = true;	
		}
		app.window.add(loader());
		app.getForecast(searchString);	
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
	         self.renderWeather();
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	         Ti.API.debug(e.error);
	         self.weather = Ti.App.Properties.getString('lastForecast', 'empty');
	         alert('Are you online?');
	         if(self.weather != 'empty'){
	         	self.renderWeather();	
	         }
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

WeatherInformer.prototype.addToFavorites = function(value){
	this.favorites.push(value);
	Ti.App.Properties.setString('favorites', JSON.stringify(this.favorites));
};

WeatherInformer.prototype.renderWeather = function(){
	var weatherViewPrepared = weatherView(this.weather); 
	this.window.add(weatherViewPrepared);
	this.window.remove(this.window.getChildren()[1]);
	this.notFirstRender = true;
};
module.exports = WeatherInformer;
