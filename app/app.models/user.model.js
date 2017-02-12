
module.exports = function(Schema){
    let _user = new Schema({
        username: String,
        salt : String,
        hashPassword: String,
        jwt: String,
  });
  return _user;
};