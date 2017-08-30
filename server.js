var express = require('express')
var app = express()
var fs = require('fs')
// var itf = require('./my_modules/itf_module')

var port = 3333
var staticDir = 'build'
var viewDir = './src/view'

app.set('view engine', 'jade')
app.set('views', viewDir)

app.use(function(req, res, next) {
    if (req.headers['x-requested-with'] == 'XMLHttpRequest'){
      res.send( JSON.stringify( {'hello': 'world'}))
    } else{
     next();
    }
})

// app.use('/',express.static(staticDir));

app.get('/', function (req, res) {
    // fs.readFile('./' + staticDir + '/index.html', 'utf8', function (err, data) {
    //   res.send(data)
    // });
    res.render('index', { title: 'Hellóka', message: 'Ma is alkottunk valamit!'})
});

function handleUsers(req, res) {
    fs.readFile('./users.json', 'utf8', function (err, data) {
        if (err) throw err;
        //var path = req.url.split('/')
        var users = JSON.parse(data)
        var _user = {}
        if ( !req.params.id){
            _user = users
        } else {
         for (var k in users) {
            if (req.params.id == users[k].id) {
                _user = users[k]
            }
         }
        }
        
        res.send(JSON.stringify(_user))
    });
}

app.get('/users*?', function (req, res) {
    console.log(req.url)
    handleUsers(req, res)

});



app.listen(port);

console.log('Server running in localhost:' + port);
