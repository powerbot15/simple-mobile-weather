function CreateWelcomeView(){
	
	var welcomeView = Ti.UI.createWindow({
			// width:'100%',
			// height:'100%',
			layout:'vertical',
			backgroundColor: '#FAE59B'
	});
		// favoritesView = Ti.UI.createListView({
// 			
		// }),
		// favoritesList = Ti.UI.createListSection({
			// headerTitle : 'favorites',
			// sections : []
// 		
		// });
	
	
	// plainTemplate = {
	    // childTemplates: [
	    	// {
	    		// type:'Ti.UI.ImageView',
	    		// bindId: 'star',
	    		// image:'../img/star.png',
	    		// width:'50px',
	    		// height:'50px',
	    		// left:'10px'
	    	// },
	        // {
	            // type: 'Ti.UI.Label', // Use a label
	            // bindId: 'rowtitle',  // Bind ID for this label
	            // properties: {        // Sets the Label.left property
	                // left: '65px',
	                // height: '50px',
	                // color:'#222222'
	            // }
	        // },                    
	        // {
	            // type: 'Ti.UI.Button',   // Use a button
	            // bindId: 'button',       // Bind ID for this button
	            // properties: {           // Sets several button properties
	                // width: '100px',
	                // height: '50px',                        	
	                // right: '10px',
	                // title: 'Del',
	                // color: '#FFFFFF',
	                // backgroundColor : '#834D1D'
	            // },
	            // events: { click : removeItem }  // Binds a callback to the button's click event
	        // }
	    // ]
	// };
// 	
	// if(!favorites.length){
		// return(welcomeView);
	// }
// 	
	// var listfavorites = Ti.UI.createListView({
	    // // Maps the plainTemplate object to the 'plain' style name
	    // templates: { 'plain': plainTemplate },
	    // // Use the plain template, that is, the plainTemplate object defined earlier
	    // // for all data list items in this list view
	    // defaultItemTemplate: 'plain'               
	// });
// 
	// var data = [];
	// for (var i = 0; i < favorites.length; i++) {
	    // data.push({
	        // // Maps to the rowtitle component in the template
	        // // Sets the text property of the Label component
	        // rowtitle : { text: favorites[i] },
	        // // Sets the regular list data properties
	        // properties : {
	            // itemId: favorites[i],
	            // accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE,
	            // borderWidth : '1px',
	            // borderColor : '#777777'
	        // }
	    // });
	// }
// 	
	// var section = Ti.UI.createListSection({items: data});
	// listFavorites.sections = [section];
	// listFavorites.addEventListener('itemclick', function(e){
	    // // Only respond to clicks on the label (rowtitle) or image (pic)
	    // if (e.bindId == 'rowtitle' || e.bindId == 'pic') {
	        // var item = e.section.getItemAt(e.itemIndex);
	        // if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
	            // item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
	        // }
	        // else {
	            // item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
	        // }
	        // e.section.updateItemAt(e.itemIndex, item);
	    // }      
	// });
	
	return(welcomeView);
}

/*	function removeItem(e) {
		Ti.API.info(e.type);
	}*/


module.exports = CreateWelcomeView;