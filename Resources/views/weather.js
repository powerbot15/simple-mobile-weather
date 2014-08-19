function CreateWeatherView(weather){
	var view = Ti.UI.createScrollView({
		width : '100%',
		height : '100%',
		backgroundColor:'#FFFFFF',
		scrollType: 'vertical',
		layout:'vertical'
	});
	
	for(var i = 0, n = weather.list.length; i < n; i++ ){
		var hourView = Ti.UI.createView({
			width:'100%',
			layout:horizontal
		}),
		caption = Ti.UI.createLabel({
			color:'#000000',
			text : weather.city.name,
			width:'30%'
		}),
		picture = Ti.UI.createImageView({
			width:'80px',
			height:'80px',
			image:'http://openweathermap.org/img/w/'+ weather.list[i].weather[0].icon +'.png'
		}),
		temperature = Ti.UI.createLabel({
			text : (weather.list[i].main.temp - 273.15).toFixed(2) + ' C',
			font : {fontsize : '14pt'}, 
			width:'30%'
		});
		hourView.add(caption);
		hourView.add(picture);
		hourView.add(temperature);
		view.add(hourView);
	}
	
	return view;
	
}
module.exports = CreateWeatherView;