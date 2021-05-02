require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const NgoController = require('./controllers/NgoController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    return response.send("Backend working!");
});

app.post('/sessions', SessionController.create);

app.get('/ongs', NgoController.index);
app.post('/ongs', NgoController.create);

app.get('/profile', ProfileController.index);

app.get('/incidents', IncidentController.index);
app.get('/incidents/:id', IncidentController.show);
app.post('/incidents', IncidentController.create);
app.put('/incidents/:id', IncidentController.edit);
app.delete('/incidents/:id', IncidentController.delete);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server started on port ${port}`));