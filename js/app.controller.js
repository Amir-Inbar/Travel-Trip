import { pageService } from './pagination.controller.js';
import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onAddLocation = onAddLocation;

function onInit() {
	mapService
		.initMap()
		.then(() => {
			console.log('Map is ready');
			renderMap();
		})
		.catch(() => console.log('Error: cannot init map'));
	pageService.render(1, 10, 8);
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
	console.log('Getting Pos');
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}

function onAddMarker() {
	console.log('Adding a marker');
	mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
	return locService.getLocs().then((locs) => {
		return locs;
	});
}

function onGetUserPos() {
	getPosition()
		.then((pos) => {
			console.log('User position is:', pos.coords);
			document.querySelector('.user-pos').innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords
				.longitude}`;
		})
		.catch((err) => {
			console.log('err!!!', err);
		});
}
function onPanTo() {
	console.log('Panning the Map');
	mapService.panTo(35.6895, 139.6917);
}

function renderMap() {
	let strHmtl = `<div class="weather"></div>`;
	const placeCards = document.querySelector('.sidebar');
	const locs = onGetLocs();
	console.log(locs);
	placeCards.forEach((place) => {
		// 	strHmtl += `
		// <span>
		// `;
	});
}

function onAddLocation() {}
