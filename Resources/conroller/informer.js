function WeatherInformer(){
	this.init();
}

WeatherInformer.prototype.init = function(){
	var now = new Date();
	this.timetoWeather = [ {'today' : now} ];
};

module.exports = WeatherInformer;
