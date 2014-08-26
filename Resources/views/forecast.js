function renderForecast(forecast){
	var pages = [],
		months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
	// app.window.add(scrollableView);
	headerView, 
	dateHeader,dateLabelDate, dateLabelDay, commonDayInfo,
	hoursList, hoursRow,
	row;
	console.log(forecast.length);
	for(var i = 0; i < forecast.length; i++){
		var day, month, dayOfWeek,
			temp, page, rowHeight,
			minPressure = {
				pressure : 10000,
				time : new Date()
			}, 
			maxPressure = {
				pressure : 0,
				time : new Date()
			}, 
			minTemp = {
				temp : 10000,
				time : new Date()
			}, 
			maxTemp = {
				temp : 0,
				time : new Date()
			}, 
			humidity;
		page = Ti.UI.createView({
			width:'100%',
			height:'100%',
			layout:'vertical'
		});
		headerView = Ti.UI.createView({
			width:'100%',
			height:'50%',
			layout:'horizontal'
		});
		dateHeader = Ti.UI.createView({
			width:'50%',
			height:'100%',
			backgroundColor:'#60BFAE',
			layout:'vertical'
			
		});
		day = forecast[i].date.getDate() < 10 ?  '0' + forecast[i].date.getDate() : forecast[i].date.getDate();
		month = months[forecast[i].date.getMonth()];
		dayOfWeek = weekDays[forecast[i].date.getDay()];
		dateLabelDate = Ti.UI.createLabel({
			font:{fontSize : '16pt'},
			height: '50%',
			text : day + ' ' + month,
			verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
			color : '#666666'
			
		});
		dateLabelDay = Ti.UI.createLabel({
			font:{fontSize : '14pt'},
			height:'50%',
			text : dayOfWeek,
			verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
			color : '#666666'
		});
		dateHeader.add(dateLabelDate);
		dateHeader.add(dateLabelDay);
		commonDayInfo = Ti.UI.createView({
			width:'50%',
			height:'100%',
			backgroundColor:'#83DEBB',
			layout:'vertical'
		});
		headerView.add(dateHeader);
		
		
		hoursList = Ti.UI.createView({
			width : '100%',
			height : '50%',
			backgroundColor: '#B8F5D1',
			layout : 'vertical'
		});
		rowHeight = (100 / forecast[i].times.length).toFixed(2) + '%'; 
		for(var j = 0; j < forecast[i].times.length; j++){
			if(forecast[i].times[j].main.temp < minTemp.temp){
				minTemp.temp = forecast[i].times[j].main.temp;
				minTemp.time = new Date(forecast[i].times[j].dt * 1000);
			}
			if(forecast[i].times[j].main.temp > maxTemp.temp){
				maxTemp.temp = forecast[i].times[j].main.temp;
				maxTemp.time = new Date(forecast[i].times[j].dt * 1000);
			}
			if(forecast[i].times[j].main.pressure < minPressure.pressure){
				minPressure.pressure = forecast[i].times[j].main.pressure;
				minPressure.time = new Date(forecast[i].times[j].dt * 1000);
			}
			if(forecast[i].times[j].main.pressure > maxPressure.pressure){
				maxPressure.pressure = forecast[i].times[j].main.pressure;
				maxPressure.time = new Date(forecast[i].times[j].dt * 1000);
			}
			
			hoursRow = Ti.UI.createView({
				height : rowHeight,
				layout : 'horizontal',
				borderColor :'#777777',
				borderWidth : '1px'
			});
			var pictureContainer = Ti.UI.createView({
				width:'30%',
				height:'100%'
				// layout:'horizontal'
			}),
			picture = Ti.UI.createImageView({
				// width:'80px',
				// height:'80px',
				height : '100%',
				image:'http://openweathermap.org/img/w/'+ forecast[i].times[j].weather[0].icon +'.png'
			}),
			temperatureContainer = Ti.UI.createView({
				width:'30%',
				height:'100%'
			}),
			
			temperature = Ti.UI.createLabel({
				color:'#6CA15C',
				text : 't:' + (forecast[i].times[j].main.temp - 273.15).toFixed(0) + 'C'
				// font : {fontSize : '12pt'}, 
			}),
			timeContainer = Ti.UI.createView({
				width:'30%',
				height:'100%'
			});
			var hourlyTime = new Date(forecast[i].times[j].dt * 1000);
			var hoursCurrent = hourlyTime.getHours() < 9 ? '0' + hourlyTime.getHours() : '' + hourlyTime.getHours(),
				minutesCurrent = hourlyTime.getMinutes() < 9 ? '0' + hourlyTime.getMinutes() : '' + hourlyTime.getMinutes(); 
			var timeString = Ti.UI.createLabel({
				color:'#000000',
				text : hoursCurrent + ':' + minutesCurrent 
			});
			
			pictureContainer.add(picture);
			timeContainer.add(timeString);
			temperatureContainer.add(temperature);
			// captionContainer.add(caption);
			hoursRow.add(timeContainer);
			hoursRow.add(pictureContainer);
			hoursRow.add(temperatureContainer);
			// hoursRow.add(captionContainer);
			hoursList.add(hoursRow);
			
		}
		
		var commonDayLabel = Ti.UI.createLabel({
			text : 'In this day : ',
			color:'#666666'
		});
		var minTempContainer = Ti.UI.createView({
			height : '10%',
			layout : 'horizontal'
		});
		var maxTempContainer = Ti.UI.createView({
			height : '10%',
			layout : 'horizontal'
		});

		var minPressureContainer = Ti.UI.createView({
			height : '10%',
			layout : 'horizontal'
		});
		var maxPressureContainer = Ti.UI.createView({
			height : '10%',
			layout : 'horizontal'
		});
		var minTempValue = Ti.UI.createLabel({
			width:'100%',
			text : 'Min temp : t' + (minTemp.temp - 273.15).toFixed(0) + 'C',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER, 
			color:'#666666'
		});
		var maxTempValue = Ti.UI.createLabel({
			width:'100%',
			text : 'Max temp : t' + (minTemp.temp - 273).toFixed(0) + 'C',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			color:'#666666'
		});
		
		var minPressureValue = Ti.UI.createLabel({
			width:'100%',
			text : 'Min pressure : ' + (minPressure.pressure * 0.75008).toFixed(0),
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER, 
			color:'#666666'
		});
		var maxPressureValue = Ti.UI.createLabel({
			width:'100%',
			text : 'Max pressure : ' + (maxPressure.pressure * 0.75008).toFixed(0),
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			color:'#666666'
		});
		minTempContainer.add(minTempValue);
		maxTempContainer.add(maxTempValue);
		minPressureContainer.add(minPressureValue);
		maxPressureContainer.add(maxPressureValue);
		commonDayInfo.add(commonDayLabel);
		commonDayInfo.add(minTempContainer);
		commonDayInfo.add(maxTempContainer);
		commonDayInfo.add(minPressureContainer);
		commonDayInfo.add(maxPressureContainer);
		headerView.add(commonDayInfo);
		page.add(headerView);
		page.add(hoursList);
		pages.push(page);
		
	}
	var scrollableView = Ti.UI.createScrollableView({
  		views:pages,
  		showPagingControl:true
	});	
	
	return scrollableView;
}

module.exports = renderForecast;