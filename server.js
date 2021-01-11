//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/taxi-deals'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

app.get('/*', function (req, res) {
    console.log('req', req.path.split('/')[1]);

    res.sendFile(path.join(__dirname + '/dist/taxi-deals/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);