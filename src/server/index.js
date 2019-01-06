let http =  require('http');
let express = require( 'express');
let cors = require( 'cors');
let morgan = require( 'morgan');
let bodyParser = require( 'body-parser');
let Chatkit = require('@pusher/chatkit-server');
let config = require('../config');

const chatkit = new Chatkit.default({
    instanceLocator:config.instanceLocator,
    key: config.secretKey,
});

const PORT = 3001;
const app = express();
app.server = http.createServer(app);


app.use(morgan('dev'));


app.use(cors());

app.use(bodyParser.json({
    limit: '50mb'
}));
app.set('root', __dirname);


app.post('/registerUser',(req,res)=>{

    let name = req.body.name

    chatkit.createUser({
        id: name,
        name: name,
    })
        .then((response) => {
            console.log(response);
            res.send(response);

        }).catch((err) => {
        console.log(err);
    });
});

app.get('/getAllUsers',(req,res)=>{
    chatkit.getUsers()
        .then((response) => {
            res.send(response);
        }).catch((err) => {
        console.log(err);
    });
});

app.server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${app.server.address().port}`);
});

module.exports = app;