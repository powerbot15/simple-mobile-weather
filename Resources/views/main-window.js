function createMainWindow(){
	var winMain = Ti.UI.createWindow({
		backgroundColor: '#83E421',
		layout:'vertical'
	}),
		inputView = Ti.UI.createView({
			width:'100%',
			layout:'horizontal',
			height:'60px'
		}),
		cityInput = Ti.UI.createTextField({
			width:'90%',
			height:'70px',
			backgroundColor:'#8118B3',
			color:'#FFFFFF',
			font:{fontSize:'12pt', fontWeight:'bold'}
		}),
		acceptButton = Ti.UI.createButton({
			width:'9.5%',
			height:'70px',
			font:{fontSize:'10pt'},
			title:'Show'
		});
	inputView.add(cityInput);
	inputView.add(acceptButton);
	winMain.add(inputView);
	return winMain;
}

module.exports = createMainWindow;
