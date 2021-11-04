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
window.initAutocomplete = initAutocomplete;
window.displaySuggestions = displaySuggestions;
window.copyClipboard = copyClipboard;

var gLocs;

function onInit() {
	const start = setStartLocation() || [32.0749831, 34.9120554];
	mapService
		.initMap(...start)
		.then(() => {
			onToggleNewLoaction(0);
			locService.getLocs().then((locations) => {
				gLocs = locations;
				onPaginationClick();
				initAutocomplete();
			});
		})
		.catch(() => console.log('Error: cannot init map'));
	copyClipboard();
}

function onPaginationClick(idx = 0) {
	var strHmtl = '';
	const elSideBar = document.querySelector('.sidebar .items');
	const locations = pageService.set(idx, gLocs, 4);
	if (!locations || !locations.length) return;
	locations.forEach((place) => {
		strHmtl += `
            <div class="item" onclick="onPanTo(${place.lat},${place.lng}),onToggleNewLoaction(${place.id})">
            <img src="${place.img}">
            <div>    
            <h1>${place.name}</h1>
            <div>${place.lat.toFixed(6)} , ${place.lng.toFixed(6)}</div>
            <div>Temp:&#8451;${place.weather}</div>
            </div>
            <span onclick="onRemoveLocation(${place.id})">X</span>
        </div>
        `;
	});
	elSideBar.innerHTML = strHmtl;
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
			mapService.panTo(pos.coords.latitude, pos.coords.longitude);
			onAddMarker(pos.coords.latitude, pos.coords.longitude);
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
	onToggleNewLoaction(0);
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

function displaySuggestions(predictions, status) {
	if (status === google.maps.places.PlaceServiceStatus.OK) {
		predictions.forEach((predictions) => {
			console.log(predictions.description);
		});
	}
}

let autocomplete;
function initAutocomplete() {
	autocomplete = new google.maps.places.Autocomplete(document.querySelector('.autocomplete'), {
		types: ['establishment'],
		componentRestrictions: { country: ['ISR'] },
		fields: ['place_id', 'geometry', 'name']
	});
	autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
	const place = autocomplete.getPlace();

	if (!place.geometry) {
		document.querySelector('.autocomplete').value = '';
	} else {
		const lat = place.geometry.location.lat();
		const lng = place.geometry.location.lng();
		onPanTo(lat, lng);
		locService.setLocation(place.name, lat, lng);
		locService.addLocation(place.name);
		document.querySelector('.autocomplete').value = place.name;
		onPaginationClick();
	}
}

function copyClipboard() {
	locService.getCurrentPosLink();
}

function setStartLocation() {
	const search = window.location.search;
	if (!search.includes('lat') || !search.includes('lng')) return;
	const lat = search.substr(search.indexOf('lat') + 4, search.indexOf('&') - 5);
	const lng = search.substr(search.indexOf('lng') + 4, search.indexOf('&') - 5);
	return [parseFloat(lat), parseFloat(lng)];
}
