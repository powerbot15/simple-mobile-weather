function CreateWeatherView(weather){
	// var view1 = Ti.UI.createView({ backgroundColor:'#123' });
// var view2 = Ti.UI.createView({ backgroundColor:'#246' });
// var view3 = Ti.UI.createView({ backgroundColor:'#48b' });

var pages = [];
// app.window.add(scrollableView);
	var view = Ti.UI.createScrollView({
		width : '100%',
		height : '100%',
	
		contentWidth:'100%',
		contentHeight:'auto',
		backgroundColor:'#FAE59B',
		scrollType: 'vertical',
		layout:'vertical'
		
		
	});
	
	for(var i = 0, n = weather.list.length; i < n; i++ ){
		var time = app.convertUnixTime(weather.list[i].dt);
		var hourView = Ti.UI.createView({
			width:'100%',
			height:'100px',
			layout:'vertical',
			borderWidth:'1px',
			borderColor:'#444444',
			backgroundSelectedColor:'#999999'
		}),
		captionContainer = Ti.UI.createView({
			width:'100%',
			height: '10%'
		}),
		caption = Ti.UI.createLabel({
			color:'#000000',
			text : weather.city.name + ', ' + weather.city.country
		}),
		pictureContainer = Ti.UI.createView({
			width:'100%',
			height:'82px'
			// layout:'horizontal'
		}),
		picture = Ti.UI.createImageView({
			width:'80px',
			height:'80px',
			image:'http://openweathermap.org/img/w/'+ weather.list[i].weather[0].icon +'.png'
		}),
		temperatureContainer = Ti.UI.createView({
			width:'100%',
			height:'10%'
		}),
		
		temperature = Ti.UI.createLabel({
			color:'#6CA15C',
			text : 't:' + (weather.list[i].main.temp - 273.15).toFixed(0) + 'C'
			// font : {fontSize : '12pt'}, 
		}),
		timeContainer = Ti.UI.createView({
			width:'100%',
			height:'10%'
		}),
		timeString = Ti.UI.createLabel({
			color:'#000000',
			text : time
		});
		pictureContainer.add(picture);
		timeContainer.add(timeString);
		temperatureContainer.add(temperature);
		captionContainer.add(caption);
		hourView.add(timeContainer);
		hourView.add(pictureContainer);
		hourView.add(temperatureContainer);
		hourView.add(captionContainer);
		
		// view.add(hourView);
		pages.push(hourView);
	}
	var scrollableView = Ti.UI.createScrollableView({
  		views:pages,
  		showPagingControl:true
	});

	// return view;
	return scrollableView;
	
}
// function convertUnixTime(unixTime){
	// var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
	// var jsTime = new Date(unixTime * 1000),
		// day = jsTime.getDate(),
		// hour = jsTime.getHours(),
		// minute = jsTime.getMinutes(),
		// dayOfWeek = weekDays[jsTime.getDay()],
		// resultString = ''; 
	// if(day < 10){
		// resultString += '0' + day;
	// }
	// else{
		// resultString += day;
	// }
	// resultString += ', ' + dayOfWeek + ' ';
	// if(hour < 10){
		// resultString += '0' + hour;
	// }
	// else{
		// resultString += hour;
	// }
	// resultString += ':';
	// if(minute < 10){
		// resultString += '0' + minute;
	// }
	// else{
		// resultString += hour;
	// }
// 	
	// return resultString;
// }
module.exports = CreateWeatherView;