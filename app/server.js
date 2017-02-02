let bodyParser = require('body-parser');
let express  = require('express');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//load middleware to enable cors
app.use(require('./middleware/cors.middleware')());

//load application routes
require('./route')(app);

app.use(require('./middleware/error-handler.middleware')());

//starts application and ask it to listen on a port
app.listen(port);
console.log(`listening on ${port}`);
