var searchView = require('../views/search'), 
	forecast = require('../views/forecast'),
	welcomeView = require('../views/welcome'),
	favoritesView = require('../views/favorites'),
	loader = require('../views/loader');

function WeatherInformer(){
	this.tempColors = {
			cold:['#07093D', '#0C0F66', '#0B108C', '#0E4EAD'],
			nearCold : ['#107FC9'],
			warm:['#59A80F', '#E0E05A', '#F7C41F', '#FC930A']
		};

	this.init();
}

WeatherInformer.prototype.init = function(){
	this.lastForecast = JSON.parse(Ti.App.Properties.getString('lastForecast', '{}'));
	this.favorites = JSON.parse(Ti.App.Properties.getString('favorites','[]'));
	this.window = welcomeView();
	this.window.add(favoritesView(this.favorites));
	this.window.open();
};
WeatherInformer.prototype.convertTempToColor = function(minTemp, maxTemp){
	var avgTemp = (minTemp + maxTemp) / 2, 
		color;
	
	if(avgTemp < -30){
		color = this.tempColors.cold[0];
	}
	else if(avgTemp < -20){
		color = this.tempColors.cold[1];
	}
	else if(avgTemp < -10){
		color = this.tempColors.cold[2];
	}
	else if(avgTemp < 0){
		color = this.tempColors.cold[3];
	}
	else if(avgTemp < 10){
		color = this.tempColors.nearCold[0];
	}
	else if(avgTemp < 20){
		color = this.tempColors.warm[0];
	}
	else if(avgTemp < 30){
		color = this.tempColors.warm[1];
	}
	else if(avgTemp < 40){
		color = this.tempColors.warm[2];
	}

	return color;
};
WeatherInformer.prototype.convertWindDirection = function(meteorologicalDegrees){
	var windPoint;
	if(meteorologicalDegrees < 22.5 && meteorologicalDegrees > 337.5){
		windPoint = 'S';
	}
	else if(meteorologicalDegrees < 67.5){
		windPoint = 'SW';
	}
	else if(meteorologicalDegrees < 112.5){
		windPoint = 'W';
	}
	else if(meteorologicalDegrees < 157.5){
		windPoint = 'NW';
	}
	else if(meteorologicalDegrees < 202.5){
		windPoint = 'N';
	}
	else if(meteorologicalDegrees < 247.5){
		windPoint = 'NE';
	}
	else if(meteorologicalDegrees < 292.5){
		windPoint = 'E';
	}
	else if(meteorologicalDegrees < 337.5){
		windPoint = 'SE';
	}
	
	return windPoint;
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
	         self.renderForecast(self.forecast);
	     },
	     onerror : function(e) {
	         Ti.API.debug(e.error);
	         self.forecast = Ti.App.Properties.getString('lastForecast', 'empty');
	         alert('Are you online?');
	         if(self.forecast != 'empty'){
	         	self.forecast = JSON.parse(self.forecast);
	         	self.parseForecast(self.forecast);
	         	self.renderForecast(self.forecast);
	         }
	     },
	     timeout : 20000  // in milliseconds
	 });
	client.open("GET", url);
	client.send();
};

WeatherInformer.prototype.parseForecast = function(apiForecast){
	var forecastDays = [],
		oneDay = {}, 
		time;
	for(var i = 0; i < apiForecast.list.length; i++){
		time = new Date(apiForecast.list[i].dt * 1000);//this.convertUnixTime(apiForecast.list[i].dt);
		if(forecastDays.length > 0 && time.getDate() == forecastDays[forecastDays.length - 1].date.getDate()){
			forecastDays[forecastDays.length - 1].times.push(apiForecast.list[i]);
		}
		else{
			forecastDays.push({
				date : time,
				times : [apiForecast.list[i]] 
			});

		}
	}
	this.forecast = forecastDays; 
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
WeatherInformer.prototype.renderForecast = function(){
	var weatherViewPrepared = forecast(this.forecast); 
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
