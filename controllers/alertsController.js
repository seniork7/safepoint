/**
 * ? This file host the logics that hadle requests to
 * ? '/alerts?weather=*' route. It queries the DB based on the
 * ? queries from req.query. If everything is satisfied it
 * ? responds with a json object containing the data
 */

import WeatherAlert from '../models/weather-alert-schema.js';

const getAlerts = async (req, res) => {
	try {
		const alertCategory = req.query.category;
		const filter = { category: alertCategory };

		if (req.location) {
			filter.city = { $regex: req.location, $options: 'i' };
		}

		const total = await WeatherAlert.countDocuments(filter);
		const alerts = await WeatherAlert.find(filter)
			.skip(req.offset)
			.limit(req.limit)
			.select('-_id -__v')
			.lean();

		if (alerts.length === 0) {
			return res.status(404).json({ message: 'Alerts not found!' });
		}

		res.json({
			previous:
				req.offset > 0
					? `${process.env.BASE_URL}/api/v1/alerts?category=${alertCategory}&offset=${req.offset - req.limit}&limit=${req.limit}`
					: null,
			total: total,
			category: alertCategory,
			next:
				req.offset + req.limit < total
					? `${process.env.BASE_URL}/api/v1/alerts?category=${alertCategory}&offset=${req.offset + req.limit}&limit=${req.limit}`
					: null,
			data: alerts,
			disclaimer:
				alerts.length > 0
					? `This information was gather from ${alerts[0]?.source?.name}, please do your due diligence to verify the data before use.`
					: '',
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export default getAlerts;
