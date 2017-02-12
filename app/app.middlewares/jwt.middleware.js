let {  jwtHelper } = require('../app.configuration/app.dependencies');
module.exports = function(req,res,next){
    let token = req.headers['healer-access-token'];
    if (token) {
        let userDetail = jwtHelper.decode(token);
        if(!userDetail){return res.status(500).json({message: 'Invalid token'});}
        else {
            req['userDetail'] = userDetail;
            req.jwt = token;
            next();
        }
    }
    else {return res.status(401).json({code:401, message : '_accesstoken unaccessible'})}
}