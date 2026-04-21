/**
 * ? This file fetches and map the weather alert data to the
 * ? shape of the DB schema. It also does error handling that checks
 * ? if a response came back empty and handle it gracefully
 */

import getCities from './weather-cities.js';
import fetchData from '../../fetchData.js';

const getWeatherAlerts = async () => {
	const ontarioCities = await getCities();

	const weatherAlertData = await Promise.all(
		ontarioCities.map(async (c) => {
			const data = await fetchData(
				`https://api.weather.gc.ca/collections/citypageweather-realtime/items?f=json&identifier=${c.id}`,
			);

			if (!data) return null;

			const feature = data.features[0];
			const properties = feature.properties;

			const temperature = Number(
				properties.currentConditions.temperature?.value?.en,
			);
			const safeTemperature = isNaN(temperature) ? 0 : temperature;

			const humidity = Number(
				properties.currentConditions.relativeHumidity?.value?.en,
			);
			const safeHumidity = isNaN(humidity) ? 0 : humidity;

			const windSpeed = Number(
				properties.currentConditions.wind?.speed?.value.en,
			);
			const safeWindSpeed = isNaN(windSpeed) ? 0 : windSpeed;

			const windGust = Number(
				properties.currentConditions.wind?.gust?.value.en,
			);
			const safeWindGust = isNaN(windGust) ? 0 : windGust;

			const windChill = Number(
				properties.currentConditions.windChill?.value?.en,
			);
			const safeWindChill = isNaN(windChill) ? 0 : windChill;

			return {
				sourceID: feature.id,
				city: properties.name.en,
				region: properties.region.en,
				category: 'weather',
				locationCoordinates: feature.geometry.coordinates,
				currentConditions: {
					temperature: safeTemperature,
					humidity: safeHumidity,
					windSpeed: safeWindSpeed,
					windGust: safeWindGust,
					windChill: safeWindChill,
				},
				todayForecast:
					properties.forecastGroup.forecasts[0].textSummary.en,
				warnings: properties.warnings,
				lastUpdated: properties.lastUpdated,
				source: {
					name: 'Environment Canada',
					url: 'https://www.canada.ca/en/environment-climate-change.html',
				},
			};
		}),
	);

	return weatherAlertData.filter((item) => item !== null);
};

export default getWeatherAlerts;
