function createLoader(){
	
	var loaderView = Ti.UI.createView({
		width:'100%',
		height:'90%',
		backgroundColor:'##FAE59B'
	}),
		loader = Ti.UI.createImageView({
		image : '../img/loading.gif',
		width : '50%'
	});
	loaderView.add(loader);
	
	return loaderView;
	
}

module.exports = createLoader;
