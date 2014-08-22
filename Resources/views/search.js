
function createSearchView(searchValue){
	var searchView = Ti.UI.createView({
		width:'100%',
		height:'82px',
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
			value: searchValue ? searchValue : '',
			font:{fontWeight:'bold'},
			borderWidth:'2px',
			borderColor:'#8D9B2F',
			borderRadius:'25px'
			
			
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
		if(cityInput.value.length > 0){
			app.search(cityInput.value);
		}
		else{
			cityInput.focus();
		}
		// app.getNowWeather(cityInput.value);
	});
	
	cityInput.addEventListener('return', function(){
		cityInput.blur();
		app.search(cityInput.value);
	});
	
	starFavourites.addEventListener('click', function(){

		app.addToFavorites(cityInput.value);	

	});
	inputView.add(starFavourites);
	inputView.add(cityInput);
	inputView.add(acceptButton);
	searchView.add(inputView);
	return searchView;
}

module.exports = createSearchView;
