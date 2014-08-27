(function(global) {

	var timer;
	var badgeText = '0';
	var ordersServer;

	function triggerStatusCheck() {
		//clear timer so that multiple checks don't get initiated unnecessarily
		clearTimeout(timer);

		chrome.storage.sync.get({
			serverUrl: 'http://stlnode.esri.com:3080'
		}, function(items) {
			ordersServer = items.serverUrl;
			//hit server to see if there are orders
			checkStatus(function(available, count) {
				if (available) {
					chrome.browserAction.setIcon({
						path: "status-available.png"
					});
					chrome.browserAction.setBadgeBackgroundColor({
						color: '#0d0'
					});
					chrome.browserAction.setBadgeText({
						text: count.toString()
					});

				} else {
					chrome.browserAction.setIcon({
						path: "status-occupied.png"
					});
					chrome.browserAction.setBadgeBackgroundColor({
						color: '#d00'
					});
					chrome.browserAction.setBadgeText({
						text: count.toString()
					});
				}

				//fire off to check again
				timer = setTimeout(triggerStatusCheck, 10000);
			});
		});
	}

	function checkStatus(callback) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var result = xmlhttp.responseText;
				var resultObj = {};
				var orders = true;
				var count = 0;

				if (result) {
					//current return from service is: 
					/*
						Women's Room: Available
						Men's Room: Available
						{ menEmpty: True, womenEmpty: True }
					*/

					//strip out everything except our data
					// result = result.substring(result.indexOf('{'));

					// //todo:remove once json is in proper format (quoted key and lower case values)
					// result = result.split('True').join('true').split('False').join('false');
					// result = result.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');

					//find start of json section
					resultObj = JSON.parse(result);
					console.log(resultObj);

					// available = resultObj[bathroomToCheck + 'Empty'];
					if (resultObj.success && resultObj.count > 0) {
						orders = true;
						count = resultObj.count;
					} else {
						orders = false;
						count = 0;
					}

				}

				callback(orders, count);
			}
		};
		xmlhttp.open("GET", ordersServer + "/orders/count", true);
		xmlhttp.send();
	}

	function init() {

		chrome.browserAction.setBadgeText({
			text: badgeText
		});

		chrome.browserAction.setBadgeBackgroundColor({
			color: '#ddd'
		});

		//make it fire immediately when icon clicked
		chrome.browserAction.onClicked.addListener(function(tab) {
			triggerStatusCheck();
		});

		chrome.storage.sync.get({
			serverUrl: 'http://localhost:3080'
		}, function(items) {
			ordersServer = items.serverUrl;
			//trigger check immediately on load
			triggerStatusCheck();
		});

	}


	init();

}(this));