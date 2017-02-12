/**
 * Created by Minhaj on 2/12/2017.
 */
module.exports = function (Schema) {


    let _categories = new Schema({

        name : {
            type: String,
            required: true
        }
    });


    return _categories;

}