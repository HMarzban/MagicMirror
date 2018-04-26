const express = require('express');
const app = express();
const path = require('path');
const jsonQuery = require('json-query');
var fs = require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies
app.use(function (req, res, next) {
    //TODO: replace "*" to IP address.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {

    console.log("Hi Man what's up");
    res.write("<h1>Hello man to magic mirror</h1>")


});
app.get('/conf', (req, res) => {
    res.sendFile(path.join(__dirname, './config/main.json'));
});

app.post('/visibility', (req, res) => {

    let conf = require(path.join(__dirname, 'config/main.json'));

    conf["modulePostion"].forEach((element, index) => {
        if (element["_id"] == req.body.id) {
            //conf["modulePostion"].splice(index, 1) 
            conf["modulePostion"][index].visibility = !req.body.visibility
        }
    });

    fs.writeFile('config/main.json', JSON.stringify(conf), (err) => {
        if (err) {
            res.json({ "is": false, "msg": err });
            throw err;
        } else {
            conf = require(path.join(__dirname, 'config/main.json'));
            let modulePostion = [];

            conf["modulePostion"].forEach((val, index) => {
                if (val.postion == req.body.location) {
                    modulePostion.push(val);
                }
            });




            res.json({ "is": true, "visibility": !req.body.visibility, "moduleList": modulePostion });
        }
    });

});

app.post('/removeModule', (req, res) => {

    let conf = require(path.join(__dirname, 'config/main.json'));
    conf["modulePostion"].forEach((element, index) => {
        if (element["_id"] == req.body.id) {
            conf["modulePostion"].splice(index, 1)
        }
    });

    fs.writeFile('config/main.json', JSON.stringify(conf), (err) => {
        if (err) {
            res.json({ "is": false, "msg": err });
            throw err;
        } else {
            conf = require(path.join(__dirname, 'config/main.json'));
            let modulePostion = [];

            conf["modulePostion"].forEach((val, index) => {
                if (val.postion == req.body.location) {
                    modulePostion.push(val);
                }
            });
            res.json({ "is": true, "visibility": !req.body.visibility, "moduleList": modulePostion });
        }
    });



});

app.post('/addModule', (req, res)=>{

    //modulePostion
    let conf = require(path.join(__dirname, 'config/main.json'));

    
    //generate current time for ID
    req.body.module._id = new Date().getTime();
  

    conf["modulePostion"].push(req.body.module);


    fs.writeFile('config/main.json', JSON.stringify(conf), (err) => {
        if (err) {
            res.json({ "is": false, "msg": err });
            throw err;
        } else {

            let modulePostion = [];

            conf["modulePostion"].forEach((val, index) => {
                if (val.postion == req.body.location) {
                    modulePostion.push(val);
                }
            });

            res.json({ "is": true, "msg":"Module added successfully","moduleList": modulePostion  });
        }
    });

});


app.listen(3000, () => {
    console.log("magic server ready to use, serve on port 3000 enjoy :)");
});





