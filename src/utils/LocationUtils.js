/**
 * @name LocationUtils.js
 * @description This file contains utility functions for getting
 *              user's location.
*/

let geoLocationOptions = {

    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 100
};

export const fetchCoordinatesData = (onGeoLocationSuccess, onGeoLocationFailure) => navigator.geolocation.getCurrentPosition(onGeoLocationSuccess, onGeoLocationFailure, geoLocationOptions);

