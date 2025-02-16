const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');

const {userRoute, populationRoute} = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/populations', populationRoute);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


module.exports = app;

