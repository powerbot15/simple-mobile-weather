function CreateWelcomeView(){

	var welcomeView = Ti.UI.createWindow({
			layout:'vertical',
			backgroundColor:'#79BD9A'
			//backgroundColor: '#FAE59B'
	});

	welcomeView.addEventListener('androidback', function(event){
		welcomeView.close();
	});
	return(welcomeView);
}

module.exports = CreateWelcomeView;