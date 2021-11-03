import { storService } from './storage.service.js';

export const locService = {
    getLocs,
    setLocation,
    addLocation,
    removeLocation,
    findPlaceByid,
    getCurrentPosLink
};

const API_KEY2 = 'AIzaSyCsws2HKpTeFtrOSEHhq1Elss5JpUYK4pQ';
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
    const location = {
        id: id++,
        name,
        lat,
        lng,
        weather: null,
        createdAt,
        lastUpdate: Date.now(),
        img: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=150x100&key=${API_KEY2}`
    };
    tempLoc = location;
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
    return navigator.clipboard.writeText(`https://amir-inbar.github.io/Travel-Trip/index.html?lat=${tempLoc.lat}&lng=${tempLoc.lng}`);
}
