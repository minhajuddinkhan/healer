/*
initializing router
*/
module.exports = function (app,dependencies,models,middlewares) {
    let router = dependencies['express'].Router();
    /*routes*/
    require('./app.modules/auth.module')(router,models,middlewares);
    require('./app.modules/dua.module')(router,models,middlewares);
    require('./app.modules/category.module')(router,models,middlewares);

    /*middlewares*/

    //jwt
   // app.use(middlewares.jwtMiddleware);

    
     app.use(router);
}