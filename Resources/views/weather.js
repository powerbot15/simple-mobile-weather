function CreateWeatherView(weather){
	var view = Ti.UI.createView({
		width : '100%',
		height : '100%',
		backgroundColor:'#FFFFFF',
		layout:'vertical'
	}),
		closeButton = Ti.UI.createButton({
			width : '98%',
			// height : '20px',
			backgroundColor:'#8118B3',
			title: 'CLOSE'
			
		}),
		caption = Ti.UI.createLabel({
			color:'#000000',
			text : weather.name
		}),
		picture = Ti.UI.createImageView({
			width:'80px',
			height:'80px',
			image:'http://openweathermap.org/img/w/'+ weather.weather[0].icon +'.png'
		}),
		temperature = Ti.UI.createLabel({
			text : (weather.main.temp - 32) * 5 / 9 + ' C',
			font : {fontsize : '14pt'} 
		});
		
		
	closeButton.addEventListener('click', function(event){
		view.remove(true);
	});
	view.add(closeButton);
	view.add(caption);
	view.add(picture);
	view.add(temperature);	
	return view;
	
}
module.exports = CreateWeatherView;