import { pageService } from './pagination.controller.js';
import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onAddLocation = onAddLocation;
window.renderLocs = renderLocs;
window.onRemoveLocation = onRemoveLocation;
window.toggleNewLoactionIcon = toggleNewLoactionIcon;

function onInit() {
	mapService
		.initMap()
		.then(() => {
			console.log('Map is ready');
			toggleNewLoactionIcon();
			renderLocs();
		})
		.catch(() => console.log('Error: cannot init map'));
	pageService.set(1, 10, 8);
}
function onPaginationClick(idx) {
	const locations = getLocs();
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
	console.log('Getting Pos');
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}

function onAddMarker(lat, lng) {
	console.log('Adding a marker');
	mapService.addMarker({ lat: lat, lng: lng });
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
function onPanTo(lat, lng) {
	console.log('Panning the Map');
	mapService.panTo(lat, lng);
	onAddMarker(lat, lng);
	renderLocs();
}

function renderLocs() {
	var strHmtl = `<div class="weather"></div>`;
	const elSideBar = document.querySelector('.sidebar');
	locService.getLocs().then((locations) => {
		locations.forEach((place) => {
			strHmtl += `
            <div class="item" onclick="onPanTo(${place.lat},${place.lng}),toggleNewLoactionIcon(${place.id})">
            <span onclick="onRemoveLocation(${place.id})">X</span>
        <img src="${place.img}">
        <div>    
		<h1>${place.name}</h1>
        <div>${place.lat.toFixed(6)} , ${place.lng.toFixed(6)}</div>
        <div>${place.weather}</div>
        <div>Create At:${place.createdAt} </div>
        <div>Last Update: ${place.lastUpdate}</div>
        </div>
        </div>
        `;
		});
		elSideBar.innerHTML = strHmtl;
	});
}

function onAddLocation() {
	const placeName = prompt('Write your place');
	locService.addLocation(placeName);
	toggleNewLoactionIcon();
	renderLocs();
}

function onRemoveLocation(placeId) {
	locService.removeLocation(placeId);
	renderLocs();
}

function toggleNewLoactionIcon(placeId) {
	document.querySelector('.add-loc').classList.toggle('hide');
}
