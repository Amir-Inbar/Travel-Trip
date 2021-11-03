import { pageService } from './pagination.controller.js';
import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onAddLocation = onAddLocation;
window.onRemoveLocation = onRemoveLocation;
window.onToggleNewLoaction = onToggleNewLoaction;
window.onPaginationClick = onPaginationClick;

function onInit() {
	mapService
		.initMap()
		.then(() => {
			console.log('Map is ready');
			toggleNewLoactionIcon();
			onPaginationClick();
		})
		.catch(() => console.log('Error: cannot init map'));
}
function onPaginationClick(idx = 0) {
	var strHmtl = `<div class="weather"></div>`;
	const elSideBar = document.querySelector('.sidebar');
	locService.getLocs().then((locations) => {
		locations = pageService.set(idx, 4, locations);
		locations.forEach((place) => {
			strHmtl += `
            <div class="item" onclick="onPanTo(${place.lat},${place.lng}),onToggleNewLoaction(${place.id})">
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
	onPaginationClick();
}

function onAddLocation() {
	const placeName = prompt('Write your place');
	locService.addLocation(placeName);
	onPaginationClick();
}

function onRemoveLocation(placeId) {
	locService.removeLocation(placeId);
	onPaginationClick();
}

function onToggleNewLoaction(placeId) {
	const place = locService.findPlaceByid(placeId);
	if (place) document.querySelector('.add-loc').classList.add('hide');
	else {
		document.querySelector('.add-loc').classList.remove('hide');
	}
}
