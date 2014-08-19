var loader = require('loader');
function createMainWindow(){
	var winMain = Ti.UI.createWindow({
		backgroundColor: '#FAE59B',
		layout:'vertical'
	}),
		inputView = Ti.UI.createView({
			width:'100%',
			layout:'horizontal',
			height:'10%'
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
		if(app.notFirstRender){
			app.window.remove(app.window.getChildren()[1]);
		}
		app.notFirstRender = true;
		winMain.add(loader());
		app.getForecast(cityInput.value);	
		// app.getNowWeather(cityInput.value);
	});
	inputView.add(cityInput);
	inputView.add(acceptButton);
	winMain.add(inputView);
	return winMain;
}

module.exports = createMainWindow;
