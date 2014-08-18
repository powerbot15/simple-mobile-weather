function createMainWindow(){
	var winMain = Ti.UI.createWindow({
		backgroundColor: '#000000',
		layout:'vertical'
	}),
		inputView = Ti.UI.createView({
			width:'100%',
			layout:'horizontal',
			height:'60px'
		}),
		cityInput = Ti.UI.createTextField({
			width:'90%',
			height:'50px',
			font:{fontSize:'14pt', fontWeight:'bold'}
		}),
		acceptButton = Ti.UI.createButton({
			width:'9.5%',
			height:'50px',
			font:{fontSize:'14pt'},
			title:'Show'
		});
	inputView.add(cityInput);
	inputView.add(acceptButton);
	winMain.add(inputView);
	return winMain;
}

module.exports = createMainWindow;
