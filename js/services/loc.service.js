import { storService } from './storage.service.js';

export const locService = {
    getLocs,
    addLocation
};

var id = 0;
const locs = [];
const KEY = 'saveLoc';

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000);
    });
}

function addLocation(name, lat, lng, lastUpdateAt) {
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
    storService.save(KEY, locs);
}
