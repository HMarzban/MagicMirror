const fs = require('fs');
const routers = (app) =>{

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
                mainWindow.reload();
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
                //after remove module reload the application
                mainWindow.reload();
            }
        });

    });

    app.post('/updateModule', (req, res) => {
        //modulePostion
        let conf = require(path.join(__dirname, 'config/main.json'));
        conf["modulePostion"].forEach((element, index) => {
            if (element["_id"] == req.body.module._id) {
                //conf["modulePostion"].splice(index, 1) 
                conf["modulePostion"][index] = req.body.module
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
                res.json({ "is": true, "moduleList": modulePostion });
                mainWindow.reload();
            }
        });
    });// app post /addModule

    app.get('/quitMirror',(req, res)=>{
        //electron_app
        mainWindow.close()
        
        res.json({ "is": true, "msg":"Mirror Quit successfully" });
    });

    app.get('/reloadMirror',(req, res)=>{
        mainWindow.reload();
        res.json({ "is": true, "msg":"Mirror Reload successfully" });
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
                //after add new module reload the application
                mainWindow.reload();
            }
        });
    });// app post /addModule



}; //@Function: routers( app )



module.exports = {
  init:  routers
}