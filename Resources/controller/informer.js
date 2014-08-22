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

WeatherInformer.prototype.goSearchView = function(searchValue){
	this.window.remove(this.window.getChildren()[0]);
	this.window.add(searchView(searchValue));
	if(searchValue){
		this.search(searchValue);
	}
};

WeatherInformer.prototype.search = function(searchString){
		var app = this;
		if(app.notFirstRender){
			app.window.remove(app.window.getChildren()[1]);
		}
		else{
			app.notFirstRender = true;	
		}
		
// var view1 = Ti.UI.createView({ backgroundColor:'#123' });
// var view2 = Ti.UI.createView({ backgroundColor:'#246' });
// var view3 = Ti.UI.createView({ backgroundColor:'#48b' });
// 
// var scrollableView = Ti.UI.createScrollableView({
  // views:[view1,view2,view3],
  // showPagingControl:true
// });
// 
// app.window.add(scrollableView);
		
		app.window.add(loader());
		app.getForecast(searchString);	
};

WeatherInformer.prototype.getForecast = function(cityName){
	var	 self = this,
		 url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&mode=json',
	 	 client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	 var responceObj = JSON.parse(client.responseText);
   	         if(responceObj.cod === "404"){
	         	alert('City not found');
	         	self.window.remove(self.window.getChildren()[1]);
	         	return;
	         }
	         Ti.App.Properties.setString('lastForecast', JSON.stringify(responceObj));
	         self.weather = responceObj;
	         self.parseForecast(responceObj);
	         self.canFavorite = true;
	         self.renderWeather();
	     },
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
	client.open("GET", url);
	client.send();
};

WeatherInformer.prototype.parseForecast = function(apiForecast){
	var forecastDays = [],
		oneDay = {
			
		}, 
		time;
	for(var i = 0; i < apiForecast.list.length; i++){
		time = new Date(apiForecast.list[i].dt * 1000);//this.convertUnixTime(apiForecast.list[i].dt);
		if(forecastDays.length > 0 && time.getDate() == forecastDays[forecastDays.length - 1].date){
			forecastDays[forecastDays.length - 1].times.push(apiForecast.list[i]);
		}
		else{
			forecastDays.push({
				date : time.getDate(),
				times : [] 
			});

		}
	}
	console.log(forecastDays.length);
	// var time = app.convertUnixTime(weather.list[i].dt);
	// var pressure = apiForecast.pressure * 0.75008;
};

WeatherInformer.prototype.addToFavorites = function(value){
	if(!app.canFavorite){return;}
	app.canFavorite = false;
	for(var i = 0; i < this.favorites.length; i++){
		if(value == this.favorites[i]){return;}
	}
	this.favorites.push(value);
	Ti.App.Properties.setString('favorites', JSON.stringify(this.favorites));
};

WeatherInformer.prototype.renderWeather = function(){
	var weatherViewPrepared = weatherView(this.weather); 
	this.window.add(weatherViewPrepared);
	this.window.remove(this.window.getChildren()[1]);
	this.notFirstRender = true;
};
WeatherInformer.prototype.convertUnixTime = function(unixTime){
	var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
	var jsTime = new Date(unixTime * 1000),
		day = jsTime.getDate(),
		hour = jsTime.getHours(),
		minute = jsTime.getMinutes(),
		dayOfWeek = weekDays[jsTime.getDay()],
		resultString = ''; 
	if(day < 10){
		resultString += '0' + day;
	}
	else{
		resultString += day;
	}
	resultString += ', ' + dayOfWeek + ' ';
	if(hour < 10){
		resultString += '0' + hour;
	}
	else{
		resultString += hour;
	}
	resultString += ':';
	if(minute < 10){
		resultString += '0' + minute;
	}
	else{
		resultString += hour;
	}
	
	return resultString;
};
module.exports = WeatherInformer;
