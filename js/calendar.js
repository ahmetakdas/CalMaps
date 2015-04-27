function checkAuth() {
	gapi.auth.authorize(
	{
		'client_id': CLIENT_ID,
		'scope': SCOPES,
		'immediate': true
	}, handleAuthResult);
}

function handleAuthResult(authResult) {
	var authorizeDiv = $("#authorize");
	if (authResult && !authResult.error) {
		$("#authorize").slideUp(300);
		initialize();
	} else {
		$("#authorize").slideDown(300);
	}
}

function handleAuthClick(event) {
	gapi.auth.authorize(
		{client_id: CLIENT_ID, scope: SCOPES, immediate: false},
		handleAuthResult
	);
	return false;
}

function loadCalendarApi() {
	gapi.client.load('calendar', 'v3', getLocations);
}
function getLocations(){
	var start = new Date();
	start.setHours(0,0,0,999);
	
	var end = new Date();
	end.setHours(23,59,59,999);
	
	var request = gapi.client.calendar.calendarList.list();
	
	request.execute(function(resp) {
		var iCalendars = resp.items.length;
		var iCal = 0;
		$.each(resp.items, function(iIndex, oItem){
			iCal++;
			var oRequestEvents = gapi.client.calendar.events.list({
				'calendarId': oItem.id,
				'timeMin': start.toISOString(),
				'timeMax': end.toISOString(),
				'showDeleted': false,
				'singleEvents': true,
				'maxResults': 100,
				'orderBy': 'startTime'
			});
			
			oRequestEvents.execute(function(respEvents) {
				var oEvents = respEvents.items;
				var iEvents = oEvents.length;
				var iEvent = 0;
				
				$.each(oEvents, function(iIndexEvents, oEvent){
					iEvent++;
					var sLocation = encodeURIComponent(oEvent.location);
					
					if(sLocation.length < 1 || sLocation == 'undefined') {
						return true;
					}
					
					$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+sLocation+"&key="+API_KEY, function(data) {
						var oPlace = data.results[0];
						var oLocation = oPlace.geometry.location;
						var aLocation = [oEvent.summary, oLocation.lat, oLocation.lng, 3, '/images/afspraak.png'];
						
						if(bFirst){
							aMapOptions.center = {lat: oLocation.lat, lng: oLocation.lng};
							
							bFirst = false;	
						}
						aFilteredEvents.push(aLocation);
						aLocations.push(aLocation);
					}).done(function(){
						if(iEvent == iEvents && iCal == iCalendars){
							calculateDistances();
						}
					});
				});
			});
		});
	});
}