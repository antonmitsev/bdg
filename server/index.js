const defaults       = require('./config/defaults');
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const app            = express();

const port = 8000;

//Mega important :)
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.text({type: 'application/json'}));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    // Make sure you add the database name and not the collection name
    let db = database.db(defaults.collection);
    require('./app/routes')(app, db);
  
    app.listen(port, () => {
      console.log('We are live on ' + port);
    });               
  });



