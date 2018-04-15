
var express = require('express');
var chalk = require('chalk');
var app = express();
var router = express.Router();

const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use('/api', router);
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
   res.send('Hello World');
})


app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

  testRecord =
    [
        {
        "id": "0",
        "name": "Monica Latte",
        "address": "444 Coffee Ave",
        "medications": [
        "PRINIVIL TABS 20 MG (LISINOPRIL) 1 po qd",
        "HUMULIN INJ 70/30 (INSULIN REG & ISOPHANE (HUMAN)) 20 units ac breakfast"
        ],
        "birthdate": "04/04/1950",
        "provider": "Dr. Carl Savem"
        },
        {
        "id": "1",
        "name": "JoeBlow",
        "address": "444 Coffee Ave",
        "medications": [
        "PRINIVIL TABS 20 MG (LISINOPRIL) 1 po qd",
        "HUMULIN INJ 70/30 More Stuff"
        ],
        "birthdate": "04/04/1950",
        "provider": "Best doc, test doc"
        }
     ];


app.get('/rest/emr/id', function (req, res) {

    response = {id: req.query.id};

    testRecord.forEach((id, index) => {
      if(testRecord[index].id == response.id){
        fetchedRecord = testRecord[index];
      }
    });


   res.send(fetchedRecord);
})

app.get('/rest/emr/', function (req, res) {
   res.send(testRecord);
})

app.post('/rest/emr/', function (req, res) {

 const postBody = req.body;

    receivedData = {id:req.body.id, name:req.body.name,address:req.body.address, medications:req.body.medications,
                   birthdate:req.body.birthdate, provider:req.body.provider};

    console.log(receivedData, "pushed to testRecord!");
    testRecord.push(receivedData);
    res.send(testRecord);
})

app.listen(1069, function(err) {
    if (err) {
        console.log(chalk.red(err));
    } else {
        console.log(chalk.blue('Magic Happens on Port 69'));
    }
});
