/**
 *  ? This file fetches data from Environment Canada weather API and
 *  ? store the ID, city and cordinates for cities in Ontario in the 'ontarioCities'
 *  ? variable. 'getCities()' checks if 'ontarioCities' is empty or not. This helps to
 *  ? prevent the server from having to re-fetching data multiple times.
 */

import fetchData from '../../fetchData.js';

let ontarioCities = [];

// Get the raw data for Ontario weather
const getRawData = async () => {
	const data = await fetchData(
		'https://api.weather.gc.ca/collections/citypageweather-realtime/items?f=json&identifier=on*',
	);

	return data.features;
};

// Reshape the raw data and store it in ontarioCities
const initCities = async () => {
	const rawData = await getRawData();
	ontarioCities = rawData.map((f) => ({
		id: f.id,
		city: f.properties.name.en,
		coordinates: f.geometry.coordinates,
	}));

	return ontarioCities;
};

// If 'ontarioCities' already have data, return it instead of re-fetching
const getCities = async () => {
	if (ontarioCities.length > 0) return ontarioCities;
	return await initCities();
};

export default getCities;
