/**
 * Created by Minhaj on 2/11/2017.
 */

function  duaModule(router,models,middlewares) {

    let { jwtMiddleware } = middlewares;

    //DUA ROUTES
    //============================
    router.route('/api/admin/dua')
        .post(jwtMiddleware,createDua);
    router.route('/api/duas')
        .get(getDuas);
    //============================


    function getDuas(req,res){
        models.Dua.find({}).populate('categories').exec(function (err,duas) {
            if(err)  { return res.status(500).json({code : 500, success: false, message:'INTERNAL_SERVER_ERROR'}); }
            else if(duas) return res.status(200).json({code: 200,success: true, dua: duas})
        })
    }


    function createDua(req,res){
        let { arabicText, title, reference, translation, transliteration, categories } =  req.body;
        if(!arabicText || !title || !translation || !reference || !transliteration ){return res.status(400).json({code : 400, success: false, message : 'Incomplete Information'})}
        let dua = { arabicText, title, translation, reference, categories , transliteration};
        models.Dua.create(dua,function (err,data) {
            if(err)  { return res.status(500).json({code : 500, success: false, message:'INTERNAL_SERVER_ERROR'}); }
            else if(data) return res.status(200).json({code: 200,success: true, dua: data})
        })
    }
}

module.exports = duaModule;