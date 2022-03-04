const mongoose = require('mongoose')

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    name_lower:{
        type:String,
        required:true
    },
    isDelete:{
        type:Boolean,
        required:true,
        default:false
    },
})

const Category= mongoose.model('category',categorySchema);
module.exports={Category};