import { locService } from './loc.service.js';

export const mapService = {
	initMap,
	addMarker,
	panTo
};

var gMap;
var gMarker;
function initMap(lat = 32.0749831, lng = 34.9120554) {
	console.log('InitMap');
	return _connectGoogleApi().then(() => {
		console.log('google available');
		gMap = new google.maps.Map(document.querySelector('#map'), {
			center: { lat, lng },
			zoom: 15
		});
		gMap.addListener('click', (e) => {
			addMarker(e.latLng);
			console.log(e);
			locService.addLocation('amir', e.latLng.lat(), e.latLng.lng(), Date.now());
		});
		console.log('Map!', gMap);
	});
}

function addMarker(loc) {
	if (gMarker) gMarker.setMap(null);
	gMarker = new google.maps.Marker({
		position: loc,
		map: gMap,
		title: 'Hello World!'
	});
	return gMarker;
}

function panTo(lat, lng) {
	var laLatLng = new google.maps.LatLng(lat, lng);
	gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
	if (window.google) return Promise.resolve();
	const API_KEY = 'AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ';
	var elGoogleApi = document.createElement('script');
	elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
	elGoogleApi.async = true;
	document.body.append(elGoogleApi);

	return new Promise((resolve, reject) => {
		elGoogleApi.onload = resolve;
		elGoogleApi.onerror = () => reject('Google script failed to load');
	});
}
