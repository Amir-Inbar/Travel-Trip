import { storService } from './storage.service.js';

export const locService = {
	getLocs,
	setLocation,
	addLocation,
	removeLocation,
	findPlaceByid,
	getFetch
};
const API_KEY2 = 'AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ';
const API_WEATHER = '0fd6d4b7116d27c353beaa8a65f0d88a';

var id = 0;
const KEY = 'saveLoc';
const locs = storService.load(KEY) || [];
var tempLoc;

function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(locs);
		}, 100);
	});
}

function setLocation(name, lat, lng, createdAt = new Date().toUTCString()) {
	var url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lng}&cnt=10&units=metric&appid=${API_WEATHER}`;
	const data = getFetch(url).then((res) => {
		const location = {
			id: id++,
			name,
			lat,
			lng,
			weather: res.list[1].main.temp,
			createdAt,
			lastUpdate: Date.now(),
			img: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=150x100&key=${API_KEY2}`
		};
		tempLoc = location;
	});
}

function addLocation(title) {
	console.log(tempLoc);
	if (!tempLoc) return;
	tempLoc.name = title;
	locs.push(tempLoc);
	storService.save(KEY, locs);
	tempLoc = null;
}

function removeLocation(placeId) {
	const place = findPlaceByid(placeId);
	locs.splice(place, 1);
}

function findPlaceByid(placeId) {
	return locs.find((location) => location.id === placeId);
}
function getWeather() {
	var url = `https://api.openweathermap.org/data/2.5/find?lat={lat}&lon={lon}&cnt={cnt}&appid=${API_WEATHER}`;
	const data = getFetch(url).then((res) => {});
}

function getFetch(url) {
	return fetch(url).then((res) => res.json()).then((data) => data);
}
