/**
 * ? This file contains the schema for the weather alerts
 *
 */

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const weatherAlertSchema = new Schema(
	{
		sourceID: { type: String },
		city: { type: String },
		region: { type: String },
		category: { type: String },
		locationCoordinates: { type: Array },
		currentConditions: {
			temperature: { type: Number },
			humidity: { type: Number },
			windSpeed: { type: Number },
			windGust: { type: Number },
			windChill: { type: Number },
		},
		todayForecast: { type: String },
		warnings: { type: Array },
		source: { name: { type: String }, url: { type: String } },
		lastUpdated: { type: Date },
	},
	{ timesStamps: true },
);

const WeatherAlert = model('WeatherAlert', weatherAlertSchema);

export default WeatherAlert;
