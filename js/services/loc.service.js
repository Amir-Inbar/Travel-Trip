import { storService } from './storage.service.js';

export const locService = {
	getLocs,
	setLocation,
	addLocation
};

var id = 0;
const locs = [];
const KEY = 'saveLoc';
var tempLoc;

function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(locs);
		}, 2000);
	});
}

function setLocation(name, lat, lng, lastUpdateAt = Date.now(), api) {
	const location = {
		id: id++,
		name,
		lat,
		lng,
		weather: null,
		createAt: Date.now(),
		lastUpdateAt,
		img: `
        https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=200x100&key=${api}
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
