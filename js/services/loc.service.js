import { storService } from './storage.service.js';

export const locService = {
	getLocs,
	setLocation,
	addLocation,
	removeLocation
};

var id = 0;
const KEY = 'saveLoc';
const locs = storService.load(KEY) || [];
var tempLoc;

function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(locs);
		}, 2000);
	});
}

function setLocation(name, lat, lng, createdAt = Date.now(), api) {
	const location = {
		id: id++,
		name,
		lat,
		lng,
		weather: null,
		createdAt: new Date().toUTCString(),
		lastUpdate: Date.now(),
		img: `
        https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=150x100&key=${api}
        `
	};
	tempLoc = location;
}

function addLocation(title) {
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
