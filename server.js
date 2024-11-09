const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const voteRoutes = require('./routes/voteRoutes');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: 'https://decagon-pike-mrd6.squarespace.com',
    optionsSuccessStatus: 200,
};

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/api.thecyclingwebsite.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/api.thecyclingwebsite.com/fullchain.pem'),
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', voteRoutes);

const server = https.createServer(options, app);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on https://api.thecyclingwebsite.com:${PORT}`);
});
