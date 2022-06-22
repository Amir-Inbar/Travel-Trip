import { storService } from './storage.service.js';

export const locService = {
	getLocs,
	setLocation,
	addLocation,
	removeLocation,
	findPlaceByid,
	getFetch,
	getCurrentPosLink
};

const API_KEY2 = 'AIzaSyC5AdyF7bsIu-MHECxquQ5JEDaP0yS0ILQ';
const API_WEATHER = '0fd6d4b7116d27c353beaa8a65f0d88a';

var id = 0;
const KEY = 'saveLoc';
const locs = storService.load(KEY) || _createDemo();
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

function getCurrentPosLink() {
	if (!tempLoc) return;
	return navigator.clipboard.writeText(
		`https://amir-inbar.github.io/Travel-Trip/index.html?lat=${tempLoc.lat}&lng=${tempLoc.lng}`
	);
}

function getFetch(url) {
	return fetch(url).then((res) => res.json()).then((data) => data);
}

function _createDemo() {
	return [
		{
			id: 0,
			name: 'Hadar Shopping Centre',
			lat: 32.0852999,
			lng: 34.78176759999999,
			weather: 21.38,
			createdAt: 'Wed, 03 Nov 2021 19:55:17 GMT',
			lastUpdate: 1635969317536,
			img:
				'https://maps.googleapis.com/maps/api/staticmap?center=32.0852999,34.78176759999999&zoom=12&size=150x100&key=AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ'
		},
		{
			id: 1,
			name: 'Club Hotel Eilat',
			lat: 31.7535746,
			lng: 35.2134627,
			weather: 16.51,
			createdAt: 'Wed, 03 Nov 2021 19:55:24 GMT',
			lastUpdate: 1635969324482,
			img:
				'https://maps.googleapis.com/maps/api/staticmap?center=31.7535746,35.2134627&zoom=12&size=150x100&key=AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ'
		},
		{
			id: 2,
			name: 'Tel Aviv University',
			lat: 29.5494499,
			lng: 34.9522146,
			weather: 24.03,
			createdAt: 'Wed, 03 Nov 2021 19:55:33 GMT',
			lastUpdate: 1635969333821,
			img:
				'https://maps.googleapis.com/maps/api/staticmap?center=29.5494499,34.9522146&zoom=12&size=150x100&key=AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ'
		},
		{
			id: 3,
			name: 'Haifa Airport',
			lat: 32.1133141,
			lng: 34.80438770000001,
			weather: 21.38,
			createdAt: 'Wed, 03 Nov 2021 19:55:51 GMT',
			lastUpdate: 1635969351217,
			img:
				'https://maps.googleapis.com/maps/api/staticmap?center=32.1133141,34.80438770000001&zoom=12&size=150x100&key=AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ'
		},
		{
			id: 4,
			name: 'Nesher Park',
			lat: 32.8116274,
			lng: 35.04038099999999,
			weather: 19.45,
			createdAt: 'Wed, 03 Nov 2021 19:57:17 GMT',
			lastUpdate: 1635969437595,
			img:
				'https://maps.googleapis.com/maps/api/staticmap?center=32.8116274,35.04038099999999&zoom=12&size=150x100&key=AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ'
		},
		{
			id: 5,
			name: 'Eilat Central Bus Station',
			lat: 32.7682535,
			lng: 35.03053869999999,
			weather: 19.35,
			createdAt: 'Wed, 03 Nov 2021 19:57:23 GMT',
			lastUpdate: 1635969443146,
			img:
				'https://maps.googleapis.com/maps/api/staticmap?center=32.7682535,35.03053869999999&zoom=12&size=150x100&key=AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ'
		},
		{
			id: 6,
			name: 'Jerusalem central bus station- תחנה מרכזית ירושלים',
			lat: 29.5564853,
			lng: 34.9524497,
			weather: 24.03,
			createdAt: 'Wed, 03 Nov 2021 19:57:28 GMT',
			lastUpdate: 1635969448908,
			img:
				'https://maps.googleapis.com/maps/api/staticmap?center=29.5564853,34.9524497&zoom=12&size=150x100&key=AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ'
		},
		{
			id: 7,
			name: 'Golan Heights View',
			lat: 31.78918599999999,
			lng: 35.2029714,
			weather: 16.94,
			createdAt: 'Wed, 03 Nov 2021 19:57:32 GMT',
			lastUpdate: 1635969452976,
			img:
				'https://maps.googleapis.com/maps/api/staticmap?center=31.78918599999999,35.2029714&zoom=12&size=150x100&key=AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ'
		},
		{
			id: 8,
			name: 'Haifa Hostel',
			lat: 33.10873400000001,
			lng: 35.800857,
			weather: 14.16,
			createdAt: 'Wed, 03 Nov 2021 19:57:39 GMT',
			lastUpdate: 1635969459390,
			img:
				'https://maps.googleapis.com/maps/api/staticmap?center=33.10873400000001,35.800857&zoom=12&size=150x100&key=AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ'
		},
		{
			id: 9,
			name: 'New Gate',
			lat: 32.8232574,
			lng: 34.9927825,
			weather: 19.48,
			createdAt: 'Wed, 03 Nov 2021 19:57:49 GMT',
			lastUpdate: 1635969469550,
			img:
				'https://maps.googleapis.com/maps/api/staticmap?center=32.8232574,34.9927825&zoom=12&size=150x100&key=AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ'
		}
	];
}
