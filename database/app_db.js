import mongoose from 'mongoose';

import 'dotenv/config';

async function connectDB() {
	const uri = process.env.MONGODB_URI;

	if (!uri) throw new Error('MONGODB URI not defined');

	await mongoose.connect(uri);
	console.log('MongoDB connected');
}

export default connectDB;
