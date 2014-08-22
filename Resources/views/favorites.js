function createFavoritesView(favorites){
	var favoritesView = Ti.UI.createView({
		width:'100%',
		height:'100%',
		layout:'vertical'
	}),
	favoritesHeader = Ti.UI.createLabel({
		width:'100%',
		height:'80px',
		color:'#000000',
		font:{fontSize : '12pt'},
		text: favorites.length > 0 ? 'Favorites :' : 'No favorites',
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
		
	}),
	favoritesBody = Ti.UI.createView({
		width:'100%'
	}),
	goSearch = Ti.UI.createButton({
		width:'90%',
		height:'80px',
		title:'Go to Search',
		color:'#AA0000',
		backgroundColor:'#009900'
	}),
	favoritesContent = Ti.UI.createScrollView({
		width : '100%',
		height : '80%',
	
		contentWidth:'100%',
		contentHeight:'auto',
		backgroundColor:'#FAE59B',
		scrollType: 'vertical',
		layout:'vertical',
		
		
	}),
	favoriteRow, favoriteNameContainer, favoriteName, favoriteRemoveContainer,favoriteRemoveButton;
	
	goSearch.addEventListener('click', function(){
		app.goSearchView();
	});
	
	favoritesView.add(favoritesHeader);
	for(var i = 0; i < favorites.length; i++){
		
		favoriteRow = Ti.UI.createView({
			width:'100%',
			layout : 'horizontal',
			id : favorites[i]
		});
		favoriteNameContainer = Ti.UI.createView({
			width:'60%',
			borderWidth:'1px',
			borderColor:'#685D1E'
		});
		favoriteName = Ti.UI.createLabel({
			text : favorites[i],
			color : '#333333'
		});
		favoriteNameContainer.add(favoriteName);
		
		favoriteRemoveContainer = Ti.UI.createView({
			width:'40%',
			borderWidth:'1px',
			borderColor:'#685D1E'
		});
		favoriteRemoveButton = Ti.UI.createButton({
			width : '32px',
			height : '32px',
			backgroundImage : '../img/remove.png',
			id : favorites[i]
		});
		favoriteRemoveContainer.add(favoriteRemoveButton);
		favoriteRow.add(favoriteNameContainer);
		favoriteRow.add(favoriteRemoveContainer);
		favoritesContent.add(favoriteRow);
	}
	
	 
	favoritesView.add(favoritesContent);
	favoritesView.add(goSearch);
	//welcomeView.add(favoritesView);
	return favoritesView;
}	
	
module.exports = createFavoritesView;