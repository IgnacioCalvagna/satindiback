const express = require("express");
const app = express();
const db = require("./db");
const routes = require('./routes')
const morgan = require('morgan')
const model = require('./models')
const user = require('./models/user')
const port = process.env.port || 3001;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'))

app.use(cookieParser());



app.use( (err, req, res, next) =>{
    console.error(err);
    res.status(500).send(err);
  });
  app.use('/api', routes)

db.sync({ force: false }).then(() => {
  app.listen(port, function () {
    console.log(`Listening on port http://localhost:${port}`);
  });
});
