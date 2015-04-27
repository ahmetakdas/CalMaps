// MAP
var oMap;
var bFirst = true;
var bFinished = false;
var aMarkers = [];
var aFilteredEvents = [];
var aGarages = [];
var aDistances = [];
var sImage = 'images/golfbal.png';
var aLocations = [];
var oGarages;
var oGarageStates;
var aClosestGarage;

var aMapOptions = {
	center: { lat: 51.92442, lng: 4.47774},
	zoom: 15,
	zoomControl: false,
	mapTypeControl: false,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	disableDefaultUI: true,
	draggable: true,
	scrollwheel: false,
	disableDoubleClickZoom: true
};

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

// Calendar
var CLIENT_ID = '###';
var API_KEY = '###';
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

