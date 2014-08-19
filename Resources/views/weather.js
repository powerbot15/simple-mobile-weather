function CreateWeatherView(weather){
	var view = Ti.UI.createScrollView({
		width : '100%',
		height : '100%',
		backgroundColor:'#FAE59B',
		scrollType: 'vertical',
		layout:'vertical'
	});
	
	for(var i = 0, n = weather.list.length; i < n; i++ ){
		var time = new Date(weather.list[i].dt * 1000);
		
		var hourView = Ti.UI.createView({
			width:'100%',
			height:'100px',
			layout:'horizontal',
			borderWidth:'1px',
			borderColor:'#444444',
			backgroundSelectedColor:'#999999'
		}),
		caption = Ti.UI.createLabel({
			color:'#000000',
			text : weather.city.name + ', ' + weather.city.country,
			width:'30%'
		}),
		picture = Ti.UI.createImageView({
			width:'80px',
			height:'80px',
			image:'http://openweathermap.org/img/w/'+ weather.list[i].weather[0].icon +'.png'
		}),
		temperature = Ti.UI.createLabel({
			color:'#000000',
			text : 't:' + (weather.list[i].main.temp - 273.15).toFixed(0) + 'C',
			// font : {fontSize : '12pt'}, 
			width:'20%'
		}),
		pictureContainer = Ti.UI.createView({
			width:'20%',
			layout:'horizontal'
		}),
		time = Ti.UI.createLabel({
			color:'#000000',
			// text : weather.list[i].dt_txt,
			text : weather.list[i].dt_txt,
			// font : {fontSize : '12pt'}, 
			width:'30%'
		});
		pictureContainer.add(picture);
		hourView.add(time);
		hourView.add(pictureContainer);
		hourView.add(temperature);
		hourView.add(caption);
		
		view.add(hourView);
	}
	return view;
	
}
module.exports = CreateWeatherView;