const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./category");
const tokenSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    imageUrl:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tag:[{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'category'
    }],
    description:{
        type:String,
        required:true
    }
});

const Image = mongoose.model("image", tokenSchema)
module.exports = {Image};