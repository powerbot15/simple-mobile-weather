function CreateWelcomeView(){

	var welcomeView = Ti.UI.createWindow({
			layout:'vertical',
			backgroundColor:'#79BD9A'
	});

	welcomeView.addEventListener('androidback', function(event){
		welcomeView.close();
	});
	return(welcomeView);
}

module.exports = CreateWelcomeView;