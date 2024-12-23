require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const envFile = process.env.NODE_ENV === 'production'
	? '.env.production'
	: '.env.development';
require('dotenv').config({ path: path.resolve(__dirname, envFile) });

const app = express();

const PORT = process.env.PORT || 3001;
const API_PREFIX = process.env.API_PREFIX || '';
console.log(`Running in ${process.env.NODE_ENV} mode with API prefix: ${API_PREFIX}`);

app.use('/access', express.static(path.join(__dirname, 'access')));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(API_PREFIX, routes);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/dist')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
	});
} else {
	console.log('Running in development mode');
}


mongoose.connect(process.env.MONGODB_URI)
	.then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}...`)))
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
