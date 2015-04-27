<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="robots" content="index, follow" />
<meta name="viewport" content="width=device-width, maximum-scale=1.0" />
<title>CalMaps</title>
<link rel="shortcut icon" type="image/png" href="/favicon.png">
<link rel="stylesheet" type="text/css" href="css/reset.css" />
<link rel="stylesheet" type="text/css" href="css/font_awesome.css" />
<link rel="stylesheet" type="text/css" href="css/main.css" />
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=false"></script>
<script type="text/javascript" src="js/calendar.js"></script>
<script type="text/javascript" src="js/jquery.js"></script> 
<script type="text/javascript" src="js/vars.js"></script>
<script type="text/javascript" src="js/markers.js"></script> 
<script type="text/javascript" src="js/init.js"></script>
<script type="text/javascript" src="https://apis.google.com/js/client.js?onload=checkAuth"></script>
</head>
<body>

<div class="inner">
    <div id="authorize">
        <h3>Geef toegang tot je Google Calendar</h3>
        <p>Klik op de knop hieronder om Google toegang te geven tot al je agenda's.</p>
        <button id="authorize-button" onClick="handleAuthClick(event)" class="btn"><i class="icon-google-plus"></i>Geef toegang</button>
    </div>
</div>

<div id="map"></div>

</body>
</html>