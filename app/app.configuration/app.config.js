module.exports = {
    dev: {
        port: 3000,
        db: {
            name : "_db.healer.",
            connectionString: "mongodb://localhost:27017/_db_healer"
        },
        jwt: {
            secret: 'thisisanodejsboilerplatejsonwebtokens',
            expireTime: 31536000,
            algorithm : 'RS256',
        }

    }
}