const defaults       = require('../../config/defaults');
var ObjectID = require('mongodb').ObjectID;

Object.prototype.getAllowedFields = function(fields) {
    let allowedFields = { };
    for(prop in fields) {
        if(fields.hasOwnProperty(prop)) {
            let newObj;
            if(this.hasOwnProperty(prop)){
                newObj = JSON.parse(JSON.stringify(this[prop]));
            }else{
                newObj = null;
            }
            if(! fields[prop]){
                allowedFields[prop] = newObj;
            }else{
                allowedFields[fields[prop]] = newObj;
            }
        }
    }
    return allowedFields;
}

module.exports = function(app, db) {
    var api = '', 
        dbName = '',
        fields = {},
        noteToAdd = null

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Referer");
        next();
    });

    app.use('/api/:api/:id?', function(req, res, next){
        api = req.params.api;
        if(defaults.apis[api]){
            dbName = defaults.apis[api].db;
            fields = defaults.apis[api].fields;
            noteToAdd = req.body.getAllowedFields(fields);
            console.log(noteToAdd, req.body);
            next();
        }else{
            res.send({'error':'Api not found: ' + api + '!'});
            res.end();
        }
    });

    app.get('/api/:api', (req, res) => {
        let page = parseInt('0' + req.query.page);
        let records = parseInt('0' + req.query.records);
        if(records <= 0){
            records = defaults.records;
        }
        
        db.collection(dbName).find().skip(page * records).limit(records).toArray((err, items) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(items);
            }
        });
    });


    app.get('/api/:api/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
            db.collection(dbName).findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.delete('/api/:api/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection(dbName).remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            } 
        });
    });
      
    app.post('/api/:api', (req, res) => {

        db.collection(dbName).insert(noteToAdd, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.put('/api/:api/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(note);
          } 
        });
      });  
      
    

};