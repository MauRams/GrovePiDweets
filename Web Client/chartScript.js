/*****************Initialise arrays*****************/
var data = []

mauramspi_array = []

var temperature = []

var noise = []

var humidity = []
/*******************End arrays*******************/
/*******************Start Function******************/
$(document).ready(function() {
	var name = 'mauramspi'
/*******************Set up charts for each reading*******************/
   var chartNoise = {
      type: 'spline',
	  animation: Highcharts.svg, // don't animate in IE < IE 10.
      marginRight: 10,
   };

	 var chartTemp = {
      type: 'spline',
	  animation: Highcharts.svg, // don't animate in IE < IE 10.
      marginRight: 10,
   };

	 var chartHum = {
      type: 'spline',
	  animation: Highcharts.svg, // don't animate in IE < IE 10.
      marginRight: 10,
   };
/*******************End Titles *******************/
/*******************Start Titles *******************/
   var titleNoise = {
      text: 'Noise Level'
   };

	 var titleTemp = {
      text: 'Temperature'
   };

	 var titleHum = {
      text: 'Humidity'
   };
/*******************End Titles*******************/
/*******************Set up x axes, same used for each chart*******************/
   var xAxis = {
      type: 'datetime',
      tickPixelInterval: 150
   };
/*******************Set up Y axes for each chart*******************/
   var yAxisNoise = {
      title: {
         text: 'Noise'
      },
      plotLines: [{
         value: 0,
         width: 1,
         color: '#808080'
      }]
   };

	 var yAxisTemp = {
			title: {
				 text: 'Temperature'
			},
			plotLines: [{
				 value: 0,
				 width: 1,
				 color: '#00ff00'
			}]
	 };

	 var yAxisHum = {
			title: {
				 text: 'Humidity'
			},
			plotLines: [{
				 value: 0,
				 width: 1,
				 color: '#ff0000'
			}]
	 };
/*******************Tooltip, plotOptions, legend settings same for all charts*******************/
   var tooltip = {
      formatter: function () {
      return '<b>' + this.series.name + '</b><br/>' +
         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
         Highcharts.numberFormat(this.y, 2);
      }
   };

   var plotOptions = {
      area: {
         pointStart: 1940,
         marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
               hover: {
                 enabled: true
               }
            }
         }
      }
   };
   var legend = {
      enabled: false
   };
   var exporting = {
      enabled: false
   };


   var series = []

/*get the dweets using built in dweet library and draw the charts*/
	dweetio.get_latest_dweet_for(name, function(err, dweets){
		console.log(err)
	    for(theDweet in dweets.reverse())
	    {		/**********Assign the data from the dweets array**************/
	        var dweet = dweets[theDweet];
					//get each value from the dweet data for each chart in here
	        valNoise = dweet.content["Noise Level"]
					valTemp = dweet.content["Temperature"]
					valHumid = dweet.content["Humidity"]
					valLatlong = dweet.content["Latitude, Longitude"]
		}
		/*******************Set up series data for each chart*******************/
		seriesNoise= [{
	      name: 'Noise Level',
	      data: noise
	   }]

		 seriesTemp= [{
 	      name: 'Temperature',
 	      data: temperature
 	   }]

		 seriesHum= [{
 	      name: 'Humidity',
 	      data: humidity
 	   }]

/*******************Set up JSON Object for each chart*******************/

	   var jsonNoise = {};
	   jsonNoise.chart = chartNoise;
	   jsonNoise.title = titleNoise;
	   jsonNoise.tooltip = tooltip;
	   jsonNoise.xAxis = xAxis;
	   jsonNoise.yAxis = yAxisNoise;
	   jsonNoise.legend = legend;
	   jsonNoise.exporting = exporting;
	   jsonNoise.series = seriesNoise;
	   jsonNoise.plotOptions = plotOptions;

		 var jsonTemp = {};
	   jsonTemp.chart = chartTemp;
	   jsonTemp.title = titleTemp;
	   jsonTemp.tooltip = tooltip;
	   jsonTemp.xAxis = xAxis;
	   jsonTemp.yAxis = yAxisTemp;
	   jsonTemp.legend = legend;
	   jsonTemp.exporting = exporting;
	   jsonTemp.series = seriesTemp;
	   jsonTemp.plotOptions = plotOptions;

		 var jsonHum = {};
	   jsonHum.chart = chartHum;
	   jsonHum.title = titleHum;
	   jsonHum.tooltip = tooltip;
	   jsonHum.xAxis = xAxis;
	   jsonHum.yAxis = yAxisHum;
	   jsonHum.legend = legend;
	   jsonHum.exporting = exporting;
	   jsonHum.series = seriesHum;
	   jsonHum.plotOptions = plotOptions;

/*******************End JSON Object*******************/
	   Highcharts.setOptions({
	      global: {
	         useUTC: false
	      }
	   });
/*******************Send each chart to it's respective Div*******************/
	   $('#containerNoise').highcharts(jsonNoise);
		 $('#containerTemp').highcharts(jsonTemp);
		 $('#containerHum').highcharts(jsonHum);
/*******************Set the chart data in each chart*******************/
		chartNoise = $('#containerNoise').highcharts()
		chartTemp = $('#containerTemp').highcharts()
		chartHum = $('#containerHum').highcharts()
/*******************Set up xaxis equal to array with DateTime data for each chart*******************/
		chartNoise.xAxis[0].update({categories: mauramspi_array}, true);
		chartTemp.xAxis[0].update({categories: mauramspi_array}, true);
		chartHum.xAxis[0].update({categories: mauramspi_array}, true);
	});
	//async call
	var noise100 = []
	dweetio.listen_for(name, function(dweet){
	        valNoise = dweet.content["Noise Level"]
					valTemp = dweet.content["Temperature"]
					valHumid = dweet.content["Humidity"]
          valLatlong = dweet.content["Latitude, Longitude"]
          valHost = dweet.content["Hostname"]
			//log the event
			console.log("Dweet retrieved!!")
			//local vars for assigning data to each Div arynchronously
			var chartNoise = $('#containerNoise').highcharts();
			var chartTemp = $('#containerTemp').highcharts();
			var chartHum = $('#containerHum').highcharts();
      console.log("LatLong: " + valLatlong);
      console.log("Hostname: " + valHost);
			//add the points to each chart asynchronously
			chartNoise.series[0].addPoint(parseInt(valNoise));
			chartTemp.series[0].addPoint(parseInt(valTemp));
			chartHum.series[0].addPoint(parseInt(valHumid));
			///push the date created and all values to their respective arrays
			mauramspi_array.push(dweet.created)
			temperature.push(valTemp)
			noise.push(valNoise)
			humidity.push(valHumid)
			//update the charts
			chartNoise.xAxis[0].update({categories: mauramspi_array}, true);
			chartTemp.xAxis[0].update({categories: mauramspi_array}, true);
			chartHum.xAxis[0].update({categories: mauramspi_array}, true);

			// console.log("Noise after slice: " + noise);
			/*****************slice the arrays for sending to localStorage***************************/
      // https://stackoverflow.com/questions/6473858/in-a-javascript-array-how-do-i-get-the-last-5-elements-excluding-the-first-ele
			noise100 = noise.slice(Math.max(noise.length - 100, 1));
			humidity100 = humidity.slice(Math.max(humidity.length -100, 1));
			temperature100 = temperature.slice(Math.max(temperature.length -100, 1));
			/************************Send to localStorage***************************/
      // https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
			localStorage.setItem("Noise", JSON.stringify(noise100));
			localStorage.setItem("Temperature", JSON.stringify(temperature100));
			localStorage.setItem("Humidity", JSON.stringify(humidity100));
	});


});
