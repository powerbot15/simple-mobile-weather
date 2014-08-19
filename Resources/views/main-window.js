function createMainWindow(){
	var winMain = Ti.UI.createWindow({
		backgroundColor: '#FAE59B',
		layout:'vertical'
	}),
		inputView = Ti.UI.createView({
			width:'100%',
			layout:'horizontal',
			height:'80px'
		}),
		cityInput = Ti.UI.createTextField({
			width:'80%',
			height:'80px',
			hintText:'Type city name',
			backgroundColor:'#CDDB7F',
			backgroundFocusedColor:'#CDDB7F',
			color:'#FFFFFF'
			
		}),
		acceptButton = Ti.UI.createButton({
			width:'20%',
			height:'80px',
			font:{fontSize:'8pt'},
			title:'GO',
			focusable:'true',
			backgroundColor:'#6CA15C',
			backgroundSelectedColor:'#4C813C',
			backgroundFocusedColor:'#4C813C',
		});
	acceptButton.addEventListener('click', function(event){
		app.getForecast(cityInput.value);	
		// app.getNowWeather(cityInput.value);
	});
	inputView.add(cityInput);
	inputView.add(acceptButton);
	winMain.add(inputView);
	return winMain;
}

module.exports = createMainWindow;
