var loader = require('loader');
function createMainWindow(){
	var winMain = Ti.UI.createWindow({
		backgroundColor: '#FAE59B',
		layout:'vertical'
	}),
		inputView = Ti.UI.createView({
			width:'100%',
			layout:'horizontal',
			backgroundColor:'#CDDB7F',
			height:'82px'
		}),
		starFavourites = Ti.UI.createImageView({
			width:'10%',
			// height:'60px',
			image:'../img/star.png',
			backgroundColor:'#CDDB7F',
			focusable:'true',
			backgroundFocusedColor:'#ADBB5F',
			backgroundSelectedColor:'#ADBB5F'
		}),
		cityInput = Ti.UI.createTextField({
			width:'75%',
			height:'80px',
			hintText:'Type city name',
			backgroundColor:'#CDDB7F',
			backgroundFocusedColor:'#CDDB7F',
			color:'#000000',
			font:{fontWeight:'bold'},
			borderWidth:'2px',
			borderColor:'#8D9B2F',
			borderRadius:'25px',
			zIndex:100
			
		}),
		acceptButton = Ti.UI.createButton({
			width:'15%',
			height:'80px',
			font:{fontSize:'8pt'},
			title:'GO',
			focusable:'true',
			backgroundColor:'#6CA15C',
			backgroundSelectedColor:'#4C813C',
			backgroundFocusedColor:'#4C813C',
		});
	acceptButton.addEventListener('click', function(event){
		cityInput.blur();
		if(app.notFirstRender){
			app.window.remove(app.window.getChildren()[1]);
		}
		app.notFirstRender = true;
		winMain.add(loader());
		app.getForecast(cityInput.value);	
		// app.getNowWeather(cityInput.value);
	});
	inputView.add(starFavourites);
	inputView.add(cityInput);
	inputView.add(acceptButton);
	winMain.add(inputView);
	return winMain;
}

module.exports = createMainWindow;
