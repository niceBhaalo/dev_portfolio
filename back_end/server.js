const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const cors = require('cors');
require('dotenv').config();

console.log("PORT: ", process.env.PORT);
	console.log("USERNAME: ", process.env.MONGO_INITDB_ROOT_USERNAME);

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['172.21.0.0'],
};
app.use(cors(corsOptions)l);
app.use('/api', dataRoutes);
app.use('/weather', weatherRoutes);

const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0'; // Listen on all available network interfaces

app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
});

app.get('/wrk/ping', (req, res) => {
    res.send('Backend server is running.');
});
