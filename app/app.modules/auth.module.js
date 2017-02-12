/*
dependencies required in routes*/
let dependencies = require('../app.configuration/app.dependencies');
let jwtHelper = require ('../app.libs/app.jwthelper');
let helper = require('../app.libs/app.helper');
function authModule(router, models,middlewares) {


    let { jwtMiddleware } = middlewares;

    router.route('/api/me')
        .get(jwtMiddleware,getUserDetails);
    router.route('/api/login')
        .post(login)

    function login(req, res) {
        let { username } = req.body;
        models.User.findOne( { username },function (err,user) {
            if(err){ return res.status(500).json({err : err, message : 'Internal Server Error'})}
            else if(!user) {return res.status(404).json({message: 'Invalid Credentials'})}
            else if(user) {
               let  { username , jwt } = user;
                if (helper.authenticate(user, req.body.password)) { return res.status(200).json({code: 200, message: 'Successully Logged In', user: { username , jwt } })}
            }
        })
    }

    function getUserDetails(req,res) {

        console.log('userDetails',req['userDetail']);
        let username = req['userDetail'].username;
        let jwt = req.jwt;
        if(!username  || !jwt) { return res.status(500).json({err : err, message : 'Internal Server Error'})}
        else { return res.status(200).json({user : { jwt :jwt , username : username}})}

    }



    /*  .get()
  .put()
  .delete()
    */
}


module.exports = authModule;

