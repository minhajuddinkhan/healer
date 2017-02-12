/**
 * Created by Minhaj on 1/29/2017.
 */
/**
 * Created by Rohail on 7/24/2016.
 */

let crypto = require('crypto');
function hashPwd(salt,pwd) {
    let hmac = crypto.createHmac('sha1',salt);
    return hmac.update(pwd.toString()).digest('hex');

}

module.exports=   {



    createSalt: function () {
        return crypto.randomBytes(128).toString('base64');
    },
    hashPwd: function(salt,pwd)
    {
        let hmac = crypto.createHmac('sha1',salt);
        return hmac.update(pwd.toString()).digest('hex');
    },
    urlFound: function (array, path) {
        for (let i = 0; i < array.length; i++) {
            if (path.includes(array[i].path)) {
                return true;
            }
        }
        return false;
    },
    sendResponse : function (res, message,data) {
        let responseMessage = {
            success : message.success,
            message : message.message
        };
        if(data)
            responseMessage.data = data;
        return res.status(message.code).json(responseMessage);
    },
    authenticate: function (user, passwordToMatch) {
        return hashPwd(user.salt, passwordToMatch) == user.hashPassword;
    },
    sendResponseData: function (res,message,data) {
        responseMessage = {
            success : message.success,
            message : message.message,
            data : data
        };
        return res.status(message.code).json(responseMessage);
    },
    generateObjectId : function (id) {
        if(id){
            return mongoose.Types.ObjectId(id);
        }else {
            return mongoose.Types.ObjectId();
        }
    }


};