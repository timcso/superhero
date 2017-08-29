var express = require('express')
var app = express()
var fs = require('fs')
var port = 3333
var staticDir = 'build'

app.use('/',express.static(staticDir))

app.get('/', function (req, res) {
    fs.readFile('./' + staticDir + '/index.html', 'utf8', function (err, data) {
      res.send(data)
    });
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
