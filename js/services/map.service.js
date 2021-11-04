import { locService } from './loc.service.js';

export const mapService = {
	initMap,
	addMarker,
	panTo
};
const API_KEY = 'AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ';
var gMap;
var gMarker;

function initMap(lat, lng) {
	console.log('InitMap');
	return _connectGoogleApi().then(() => {
		console.log('google available');
		gMap = new google.maps.Map(document.querySelector('#map'), {
			center: { lat, lng },
			zoom: 15
		});
		gMap.addListener('click', (e) => {
			addMarker(e.latLng);
			locService.setLocation('amir', e.latLng.lat(), e.latLng.lng(), Date.now(), API_KEY);
			onToggleNewLoaction();
		});
		// gMap.addEventListener('mapsMouseEvent', (e) => {
		// 	console.log(e);
		// });
		console.log('Map!', gMap);
	});
}

function addMarker(loc) {
	if (gMarker) gMarker.setMap(null);
	gMarker = new google.maps.Marker({
		position: loc,
		map: gMap
	});
	return gMarker;
}

function panTo(lat, lng) {
	var laLatLng = new google.maps.LatLng(lat, lng);
	gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
	if (window.google) return Promise.resolve();
	var elGoogleApi = document.createElement('script');
	elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
	elGoogleApi.async = true;
	document.body.append(elGoogleApi);

	return new Promise((resolve, reject) => {
		elGoogleApi.onload = resolve;
		elGoogleApi.onerror = () => reject('Google script failed to load');
	});
}
