const bodyParser = require('body-parser');
const app = require('express')();
const ejs = require('ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.set("View engine", "ejs");
const MongoDb = require('mongodb');


var db;
MongoDb.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log(err);
    }
    db = client.db('emaily-dev')


})

app.listen(7000, function () {
    console.log('Running on port 7000')
})

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/view.html');
})

app.post('/send', function (request, response) {
    db.collection('quotes').save(request.body, (err, result) => {
        if (err) {
            return console.log(err);

        }
        console.log('Saved')
        response.redirect('/');

    })
})

app.get('/read', function (request, response) {
    var x = [{ id: 12345, quote: 'wazza!!!', name: 'ZaaaZ' }, { id: 12347, name: 'qweer', quote: 'wazza!!!' }];
    db.collection('quotes').find({}).toArray(
        (err, result) => {
            if (err) throw err;
            //console.log(result);
            response.render(__dirname + '/quotes.ejs', { X: result });
            //console.log(q);
        });

})

app.get('/pic', function (request, response) {
    response.sendFile(__dirname + '/pic.png');
})