const express = require('express');
const app = express();
const connectToMongo = require('./db');
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

const port = process.env.PORT || 5000;
var cors = require('cors')

connectToMongo();

//Middleware
app.use(express.json())
app.use(cors())


//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

//For Heroku
app.get('/', (req, res) => {
    res.send("Welcome to iNotes API");
})

//Listening to server
app.listen(port, () => {

});