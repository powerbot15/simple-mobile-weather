function CreateWeatherView(weather){
	var view = Ti.UI.createView({
		width : '100%',
		height : '100%',
		backgroundColor:'#FFFFFF',
		layout:'vertical'
	}),
		closeButton = Ti.UI.createButton({
			width : '98%',
			height : '20px',
			backgroundColor:'#8118B3'
			
		}),
		caption = Ti.UI.createLabel({
			color:'#000000',
			text : weather.name
		});
		
	closeButton.addEventListener('click', function(event){
		view.remove();
	});
	view.add(closeButton);
	view.add(caption);	
	return view;
	
}
module.exports = CreateWeatherView;