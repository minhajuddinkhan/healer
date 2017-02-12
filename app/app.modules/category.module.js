/**
 * Created by Minhaj on 2/12/2017.
 */


function categoryModule(router,models,middlewares) {

    let { jwtMiddleware } = middlewares;
    router.route('/api/category')
        .post(jwtMiddleware,createCategory)
        .get(getCategories);

    function getCategories(req,res) {
        models.Category.find({},function (err,categories) {
            if(err)  { return res.status(500).json({code : 500, success: false, message:'INTERNAL_SERVER_ERROR'}); }
            else if(categories) return res.status(200).json({code: 200,success: true, categories: categories})

        })
    }
    function createCategory(req,res) {

        let  {name} = req.body;
        if(!name) { return res.status(400).json({success: false, status :400, message :'Incomplete Information'})}
        let category = { name };
        models.Category.create(category,function (err,category) {
            if(err)  { console.log('err',err); return res.status(500).json({code : 500, success: false, message:'INTERNAL_SERVER_ERROR'}); }
            else if(category) return res.status(200).json({code: 200,success: true, category: category})
        })
    }

}

module.exports = categoryModule;