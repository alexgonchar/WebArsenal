function initMap(mapCanvas) {
	var myOptions = {
		zoom: 16,
		center: new google.maps.LatLng(48.4269290, 35.0319420),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(mapCanvas, myOptions);

	//var image = 'images/beachflag.png';
	var myLatLng = new google.maps.LatLng(48.4269290, 35.0319420);
	var beachMarker = new google.maps.Marker({
		position: myLatLng,
		map: map
	});
}