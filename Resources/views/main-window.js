function createMainWindow(){
	var winMain = Ti.UI.createWindow({
		backgroundColor: '#83E421',
		layout:'vertical'
	}),
		inputView = Ti.UI.createView({
			width:'100%',
			layout:'horizontal',
			height:'80px'
		}),
		cityInput = Ti.UI.createTextField({
			width:'70%',
			height:'80px',
			backgroundColor:'#8118B3',
			color:'#FFFFFF'
			
		}),
		acceptButton = Ti.UI.createButton({
			width:'30%',
			height:'80px',
			font:{fontSize:'8pt'},
			title:'Show'
		});
	acceptButton.addEventListener('click', function(event){
		app.getCityID(cityInput.value);	
		app.getNowWeather(cityInput.value);
	});
	inputView.add(cityInput);
	inputView.add(acceptButton);
	winMain.add(inputView);
	return winMain;
}

module.exports = createMainWindow;
