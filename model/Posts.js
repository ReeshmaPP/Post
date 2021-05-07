const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    post_id: {
        type: ObjectId,
        required: true
      },
    title : {
        type: String 
    },
    description : {
        type : String
    },
    user_id : {
        type : ObjectId
    }
});

module.exports = mongoose.model('posts',PostSchema);