/**
 * Created by Minhaj on 2/11/2017.
 */
module.exports = function (Schema) {


    let _dua = new Schema({
        arabicText: {
            type: String,
            required: true
        },
        title : {
            type: String,
            required: true
        },
        translation : {
            type : String,
            required : true
        },
        transliteration : {
            type : String,
            required : true

        },
        reference : {
          type: String,
            required : true
        },
        categories: [
            {
                type : Schema.Types.ObjectId,
                ref : 'Category'
            }
        ]

    });


    return _dua;

}