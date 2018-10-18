
const bodyParser = require('body-parser');
const requestIp = require('request-ip');

const middleware = (app) =>{

    app.set('trust proxy', true)
    
    app.use(requestIp.mw())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(function (req, res, next) {
        //TODO: replace "*" to IP address.
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    



}; //@Function: middleware



module.exports = {
   init: middleware
}