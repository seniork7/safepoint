/**
 *  ? This function is used to save weather alerts to the DB.
 *  ? It is used in 'weatherAlertCron.js' to store the data to the DB
 *  ? based on 'crons' scheduling and at the root server file (app.js)
 *  ? to store data when the app restarts. This ensures fresh data
 *  ? is always being fetch since cron tends to restart its timer
 *  ? when the server restarts
 */

import WeatherAlert from '../../../../models/weather-alert-schema.js';
import getWeatherAlerts from './getWeatherAlerts.js';

const saveWeatherAlerts = async (trigger = 'cron') => {
	try {
		const data = await getWeatherAlerts();
		const insertResult = await WeatherAlert.bulkWrite(
			data.map((city) => ({
				updateOne: {
					filter: { sourceID: city.sourceID },
					update: { $set: city },
					upsert: true,
				},
			})),
		);
		console.log(
			`[${new Date().toLocaleTimeString()}] [${trigger}] Weather alerts updated: ${insertResult.modifiedCount} modified, ${insertResult.upsertedCount} inserted`,
		);
	} catch (error) {
		console.log(
			`There was a problem while adding data to DB: ${error.message}`,
		);
	}
};

export default saveWeatherAlerts;
