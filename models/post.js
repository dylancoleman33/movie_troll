const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    year: Number,
    image: String,
    plot: String,
    creator: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: String
    }
    //   comments: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Comment"
    //     }
    // ]
});

module.exports = mongoose.model("Post",postSchema)
