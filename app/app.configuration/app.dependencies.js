module.exports = {
    express: require('express'),
    bodyParser: require('body-parser'),
    morgan: require('morgan'),
    cors: require('cors'),
    mongoose: require('mongoose'),
    gzippo : require('gzippo'),
    path : require('path'),
    jsonwebtoken  : require('jsonwebtoken'),
    helper : require('../app.libs/app.helper'),
    jwtHelper : require('../app.libs/app.jwthelper')
};


