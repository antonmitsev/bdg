const defaults       = require('./config/defaults');
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const app            = express();

const port = 8000;

global.logger = function (str) {
  console.log(`[${new Date().toISOString()}] ${str}`);
}
//Mega important :)
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.text({type: 'application/json'}));

let error = 0;

MongoClient.connect(db.url, (err, database) => {
  if (err) {
    logger(err);
    error = 5;
  }
  // Make sure you add the database name and not the collection name
  let db = database.db(defaults.collection);
  require('./app/routes')(app, db);

  try {
    app.listen(port, () => {
      logger('We are live on ' + port);
    });               
  } catch (e) {
    logger(e);
    error = 100;
  }
});
return error;

