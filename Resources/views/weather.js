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
			image:'http://openweathermap.org/img/w/'+ weather.weather[0].icon +'.png'
		});
		
	closeButton.addEventListener('click', function(event){
		view.remove();
	});
	view.add(closeButton);
	view.add(caption);
	view.add(picture);	
	return view;
	
}
module.exports = CreateWeatherView;