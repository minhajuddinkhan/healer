/**
 * Created by Minhaj on 1/29/2017.
 */
let jsonwebtoken = require('jsonwebtoken');
let { jwt } = require('../app.configuration/app.config')['dev'];

module.exports =
    {
        sign: function(data){
            return jsonwebtoken.sign(data, jwt.secret , {
                expiresIn : jwt.expireTime
            });
        },
        verify: function(token){
            return jsonwebtoken.verify(token, jwt.secret,{
                algorithm: jwt.algorithm
            });
        },
        decode: function(token){
            try {
                return jsonwebtoken.verify(token, jwt.secret, {
                    algorithm: jwt.algorithm
                });
            } catch(err) {
                return false
            }
        }
    }