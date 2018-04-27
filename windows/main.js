
const electron = require('electron');
// Module to control application life.
const electron_app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const remote = require('electron').remote
var mainWindow;

const express = require('express');
const app = express();
const jsonQuery = require('json-query');
var fs = require('fs');
const bodyParser = require('body-parser');

var http = require('http').Server(app);
var io = require('socket.io')(http);




// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.




function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 960, height: 900})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
   mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })



}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_app.on('ready', createWindow);

// Quit when all windows are closed.
electron_app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    electron_app.quit();
  }
})

electron_app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.






/*                                     */
/*                                     */
//======================================
//======================================
//          express server
//======================================
//======================================
/*                                     */
/*                                     */

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
            //after remove module reload the application
            mainWindow.reload();
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

            //after add new module reload the application
            mainWindow.reload();
        }
    });

 
    

});

app.get('/quitMirror',(req, res)=>{
    //electron_app
    mainWindow.close()
    
    res.json({ "is": true, "msg":"Mirror Quit successfully" });
})

app.get('/reloadMirror',(req, res)=>{
    mainWindow.reload();
    res.json({ "is": true, "msg":"Mirror Reload successfully" });
})



io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });

    setInterval(function(){
        socket.emit("hi","Hello HosseinMarzban")
    },2000)


    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });






http.listen(3000, ()=>{
    console.log("magic server ready to use, serve on port 3000 enjoy :)");
});

