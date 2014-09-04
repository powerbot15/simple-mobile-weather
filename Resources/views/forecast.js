function renderForecast(forecast){
	var pages = [],
		months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
		headerView, 
		dateHeader,dateLabelDate, dateLabelDay, commonDayInfo,
		hoursList, hoursRow,
		row;
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
			backgroundColor:'#79BD9A',
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
			color : '#444444'
			
		});
		dateLabelDay = Ti.UI.createLabel({
			font:{fontSize : '14pt'},
			height:'50%',
			text : dayOfWeek,
			verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
			color : '#444444'
		});
		dateHeader.add(dateLabelDate);
		dateHeader.add(dateLabelDay);
		headerView.add(dateHeader);
		
		
		hoursList = Ti.UI.createView({
			width : '100%',
			height : '50%',
			backgroundColor: '#CFF09E',
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
			}),
			picture = Ti.UI.createImageView({
				height : '100%',
				image:'http://openweathermap.org/img/w/'+ forecast[i].times[j].weather[0].icon +'.png'
			}),
			temperatureContainer = Ti.UI.createView({
				width:'30%',
				height:'100%'
			}),
			
			temperature = Ti.UI.createLabel({
				color: app.convertTempToColor(forecast[i].times[j].main.temp - 273.15, forecast[i].times[j].main.temp - 273.15),//'#6CA15C',
				text : 't:' + (forecast[i].times[j].main.temp - 273.15).toFixed(0) + '\u00B0' + 'C',
				font : {fontWeight : 'bold', fontSize:'10pt'},
				shadowColor: '#000000',
  				shadowOffset: {x:0, y:0},
  				shadowRadius: 2, 
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
			hoursRow.add(timeContainer);
			hoursRow.add(pictureContainer);
			hoursRow.add(temperatureContainer);
			hoursList.add(hoursRow);
			
		}
		commonDayInfoContainer = Ti.UI.createView({
			width:'50%',
			height:'100%',
			backgroundColor:'#A8DBA8'
		});
		var commonDayInfoTop, commonDayInfoHeight;
		if(i != 0){
			commonDayInfoTop = '25%';
			commonDayInfoHeight = '50%';
		}
		else{
			commonDayInfoTop = '15%';
			commonDayInfoHeight = '70%';
		}
		commonDayInfo = Ti.UI.createView({
			top:commonDayInfoTop,
			height:commonDayInfoHeight,
			width:'100%',
			// height:'50%',
			
			layout:'vertical'
		});

		minTemp.temp -= 273.15;
		maxTemp.temp -= 273.15;
		var commonDayLabelContainer = Ti.UI.createView({
			height:'30%',
		});
		var commonDayLabel = Ti.UI.createLabel({
			text : 'At this day : ',
			font:{
				fontSize : '10pt',
				fontWeight : 'bold'
			},
			color:'#444444',
			verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP
		});
		var containersHeight, windContainer;
		if(i != 0){
			containersHeight = '35%';
		}
		else{
			containersHeight = '25%';
			windContainer = Ti.UI.createView({
				height : containersHeight
			});
			windValue = Ti.UI.createLabel({
				text: 'Wind : ' + forecast[0].times[1].wind.speed + 'mps, ' + app.convertWindDirection(forecast[0].times[1].wind.deg),
				color:'#444444'
			});
			windContainer.add(windValue);
		}
		var tempContainer = Ti.UI.createView({
			height : containersHeight
		});
		var pressureContainer = Ti.UI.createView({
			height : containersHeight
		});
		var tempTime = {
			minHour : minTemp.time.getHours() < 10 ? '0' + minTemp.time.getHours() : '' + minTemp.time.getHours(),
			minMinute : minTemp.time.getMinutes() < 10 ? '0' + minTemp.time.getMinutes() : '' + minTemp.time.getMinutes(),
			maxHour : maxTemp.time.getHours() < 10 ? '0' + maxTemp.time.getHours() : '' + maxTemp.time.getHours(),
			maxMinute : maxTemp.time.getMinutes() < 10 ? '0' + maxTemp.time.getMinutes() : '' + maxTemp.time.getMinutes() 
		};

		var temperature = Ti.UI.createLabel({
			width:'100%',
			text : 't' + minTemp.temp.toFixed(0) + '\u00B0' + 'C-' + 't' + maxTemp.temp.toFixed(0) + '\u00B0' + 'C',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER, 
			font:{
				fontWeight : 'bold', 
				fontSize:'10pt'
			},
			shadowColor: '#000000',
  			shadowOffset: {x:0, y:0},
  			shadowRadius: 2,
			color:app.convertTempToColor(minTemp.temp, maxTemp.temp)
		});
			
		var pressure = Ti.UI.createLabel({
			width:'100%',
			text : 'Pressure : ' + (minPressure.pressure * 0.75008).toFixed(0) + '-' + (maxPressure.pressure * 0.75008).toFixed(0),
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER, 
			color:'#444444'
		});
		commonDayLabelContainer.add(commonDayLabel);
		tempContainer.add(temperature);
		pressureContainer.add(pressure);
		commonDayInfo.add(commonDayLabelContainer);
		commonDayInfo.add(tempContainer);
		commonDayInfo.add(pressureContainer);
		if(i == 0){
			commonDayInfo.add(windContainer);
		}
		commonDayInfoContainer.add(commonDayInfo);
		headerView.add(commonDayInfoContainer);
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
