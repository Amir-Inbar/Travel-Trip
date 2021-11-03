export const locService = {
	getLocs
};
import { storService } from './storage.service.js';

const id = 0;
const locs = [
	// { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
	// { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
];

function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(locs);
		}, 2000);
	});
}

function addLocation(name, { lat, lng }, lastUpdateAt) {
	const location = {
		id: id++,
		name,
		lat,
		lng,
		weather: null,
		createAt: Date.now(),
		lastUpdateAt
	};
	locs.push(location);
}
