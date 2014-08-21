function createLoader(){
	
	var loaderView = Ti.UI.createView({
		width:'100%',
		height:'90%'
	}),
		loader = Ti.UI.createImageView({
		image : '../img/loader.png',
		width : '80px',
		height:'80px'
	});
	var matrix2d = Ti.UI.create2DMatrix();
	matrix2d = matrix2d.rotate(360); // in degrees
	var a = Ti.UI.createAnimation({
		transform: matrix2d,
		duration: 2000,
		autoreverse: false,
		repeat: 1000
	});
	
	loaderView.add(loader);
	loader.animate(a); // set the animation in motion
	return loaderView;
	
}

module.exports = createLoader;
