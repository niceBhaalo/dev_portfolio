const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://192.168.10.36', 'http://127.0.0.1'],
};
app.use(cors(corsOptions));
app.use('/api', dataRoutes);
app.use('/weather', weatherRoutes);

// Start the server
const port = process.env.PORT || 5000;
const host = process.env.HOST || '127.0.0.1'; // Listen on all available network interfaces

app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
});

app.get('/wrk/ping', (req, res) => {
    res.send('Backend server is running.');
});
