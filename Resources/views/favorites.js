function createFavoritesView(favorites){
	var favoritesView = Ti.UI.createView({
		width:'100%',
		height:'100%',
		layout:'vertical'
	}),
	favoritesHeader = Ti.UI.createLabel({
		width:'100%',
		height:'80px',
		color:'#666666',
		font:{fontSize : '12pt'},
		text: favorites.length > 0 ? 'Favorites :' : 'No favorites',
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
		
	}),
	goSearch = Ti.UI.createButton({
		width:'90%',
		height:'80px',
		top:'10px',// bottom:'60px',
		title:'Go to Search',
		color:'#AA0000',
		backgroundColor:'#009900',
		borderRadius:'15px'
	}),
	favoritesContent = Ti.UI.createScrollView({
		top:'10px',
		// bottom:'100px',
		width : '95%',
		height : '80%',
		borderColor:'#685D1E',
		borderWidth:'1px',
		contentWidth:'100%',
		contentHeight:'auto',
		backgroundColor:'#FAE59B',
		scrollType: 'vertical',
		layout:'vertical',
		borderRadius:'15px'
	}),
	favoriteRow, favoriteNameContainer, favoriteName, favoriteRemoveContainer,favoriteRemoveButton;
	
	goSearch.addEventListener('click', function(){
		app.goSearchView();
	});
	
	favoritesView.add(favoritesHeader);
	
		favoriteRow = Ti.UI.createView({
			width:'100%',
			height: '80px',
			layout : 'horizontal',
			id : i
			
		});
		favoriteNameContainer = Ti.UI.createView({
			width:'80%',
			borderWidth:'1px',
			borderColor:'#685D1E',
			color:'#FFFFFF',
			backgroundColor:'#D3EB9E'
		});
		favoriteName = Ti.UI.createLabel({
			text : 'City',
			color : '#000000'
		});
		favoriteNameContainer.add(favoriteName);
		
		favoriteRemoveContainer = Ti.UI.createView({
			width:'20%',
			borderWidth:'1px',
			borderColor:'#685D1E',
			backgroundColor:'#D3EB9E'
			// backgroundColor:'#'
			
		});
		favoriteRemove = Ti.UI.createLabel({
			text : 'Remove',
			color : '#000000'
		});
		favoriteRemoveContainer.add(favoriteRemove);
		// favoriteRemoveButton = Ti.UI.createButton({
			// width : '32px',
			// height : '32px',
			// backgroundImage : '../img/remove.png',
			// id : favorites[i]
		// });
	favoriteRow.add(favoriteNameContainer);
	favoriteRow.add(favoriteRemoveContainer);
	favoritesContent.add(favoriteRow);
	
	for(var i = 0; i < favorites.length; i++){
		
		favoriteRow = Ti.UI.createView({
			width:'100%',
			height: '60px',
			layout : 'horizontal',
			id : favorites[i]
		});
		favoriteNameContainer = Ti.UI.createView({
			width:'80%',
			borderWidth:'1px',
			borderColor:'#685D1E',
			backgroundFocusedColor:'#BBBBBB',
			backgroundSelectedColor:'#BBBBBB',
			id:favorites[i]
		});
		favoriteName = Ti.UI.createLabel({
			text : favorites[i],
			color : '#333333'
		});
		favoriteNameContainer.add(favoriteName);
		
		favoriteRemoveContainer = Ti.UI.createView({
			width:'20%',
			borderWidth:'1px',
			borderColor:'#685D1E'
			// backgroundColor:'#'
			
		});
		favoriteRemoveButton = Ti.UI.createButton({
			width : '32px',
			height : '32px',
			backgroundImage : '../img/remove.png',
			id : favorites[i]
		});
		favoriteNameContainer.addEventListener('click', function(event){
			console.log(this.id);
			this.setBackgroundColor('#BBBBBB');
			app.goSearchView(this.id);
			// console.log(event.source);
		});
		favoriteRemoveContainer.addEventListener('click', function(event){
			this.setBackgroundColor('#C64668');
			favoritesContent.remove(this.getParent());
			
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