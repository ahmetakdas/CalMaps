function addMarker(oLocation) {
	var marker = new google.maps.Marker({
		position: oLocation,
		map: oMap,
		icon: sImage
	});
	aMarkers.push(marker);
}

function setAllMap(map) {
	for (var i = 0; i < aMarkers.length; i++) {
		aMarkers[i].setMap(map);
	}
}

function clearMarkers() {
  	setAllMap(null);
}

function showMarkers() {
  	setAllMap(oMap);
}

function deleteMarkers() {
	clearMarkers();
  	aMarkers = [];
}
function distance(lat1, lng1, lat2, lng2) {
	var radlat1 = Math.PI * lat1 / 180;
	var radlat2 = Math.PI * lat2 / 180;
	var radlon1 = Math.PI * lng1 / 180;
	var radlon2 = Math.PI * lng2 / 180;
	var theta = lng1 - lng2;
	var radtheta = Math.PI * theta / 180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180 / Math.PI;
	dist = dist * 60 * 1.1515;
	
	//Get in in kilometers
	dist = dist * 1.609344;
	
	return dist;
}
function addMarkers(){
	 for (var i = 0; i < aLocations.length; i++) {	
	 	var aLocation = aLocations[i];
		var oLocation = new google.maps.LatLng(aLocation[1], aLocation[2]);
		var sIcon = aLocation[4];
		
		if(aLocation[1] == aClosestGarage[1] && aLocation[2] == aClosestGarage[2]){
			sIcon = '/images/parkeerplaats_aangeraden.png';
			oMap.setCenter(new google.maps.LatLng(aClosestGarage[1], aClosestGarage[2]));
		}
		var oMarker = new google.maps.Marker({
			position: oLocation,
			map: oMap,
			icon: sIcon,
			title: aLocation[0],
			zIndex: aLocation[3]
		});
		aMarkers.push(oMarker);
	 }
}

function getGarages(){
	$.getJSON("/js/garages.json", function(data) {
		oGarages = data;
		$.getJSON("/js/garages_states.json", function(data) {
			oGarageStates = data;
			addGarages();
		});
	});
}

function addGarages(){
	var iGar = 0;
	$.each(oGarages, function(iGarage, oGarage){
		iGar++;
		var iSta = 0;
		$.each(oGarageStates, function(iState, oState){
			iSta++;
			if(oState.KEY == oGarage.KEY){
				if(oState.AVAILABLE_SLOTS == 0){
					var sImage = '/images/parkeerplaats_rood.png'; 
				}
				else if(oState.AVAILABLE_SLOTS < oState.CAPACITY / 2){
					var sImage = '/images/parkeerplaats_oranje.png';	
				}
				else {
					var sImage = '/images/parkeerplaats_groen.png';
				}
				var aLocation = [oGarage.NAME, oGarage.LATITUDE, oGarage.LONGITUDE, 2, sImage];
				aGarages.push(aLocation);
				aLocations.push(aLocation);
			}
			
			if(iGar == oGarages.length && iSta == oGarageStates.length){
				calculateDistances();
			}
		});
	});
}

function calculateDistances(){
	if(bFirst){
		return true;
	}
	aDistances = [];
	
	for (var i = 0; i < aGarages.length; i++) {	
		var aLocation = aGarages[i];		
		var iTotalDistance = 0;
		
		for (var j = 0; j < aFilteredEvents.length; j++) {
			var aLocationEvent = aFilteredEvents[j];
			var afstand = distance(aLocation[1], aLocation[2], aLocationEvent[1], aLocationEvent[2]);
			iTotalDistance = iTotalDistance + afstand;
			if(j + 1 == aFilteredEvents.length){
				var aDistance = [i, iTotalDistance];
				aDistances.push(aDistance);
				
				if(i + 1 == aGarages.length){
					calculateClosest();
				}
			}
		}
	}
}

function calculateClosest(){
	var iClosest = 0;
	console.log(aDistances);
	for (var i = 0; i < aDistances.length; i++) {	
		var aDistance = aDistances[i];
		var iDistance = aDistance[1];
		
		if(iClosest == 0 || iDistance < iClosest){
			iClosest = iDistance;
			console.log(iClosest);
			aClosestGarage = aGarages[aDistance[0]];	
		}
		
		if(i + 1 == aDistances.length){	
			createMap();
		}
	}
}

function createMap(){
	oMap = new google.maps.Map(document.getElementById('map'), aMapOptions);
	console.log(aClosestGarage);
	deleteMarkers();
	addMarkers();	
}