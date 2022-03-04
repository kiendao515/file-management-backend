const {Image} = require('../model/image');
const jwt = require("jsonwebtoken");
const { User } = require('../model/user');
const { createJwtToken } = require("../util/auth")
const addImage = async(req,res,next)=>{
    const {imageUrl,description,tag}= req.body;
    console.log(tag);
    const token = req.headers.authorization.split(' ')[1];
        let id ;
        if (token) {
            jwt.verify(token, "kiendao2001", function (err, decodedToken) {
                if (err) {
                    return res.json({ status: 'fail', msg: "Invalid token" })
                }
                id= decodedToken.userID;
            });
            if(id){
                let user= await User.findOne({_id:id});
                if(user){
                    let image = new Image({userId:user._id,imageUrl:imageUrl,description:description,tag:tag})
                    image.save().then(doc=>{
                        return res.json({status:'success',data:doc})
                    })
                }
            }
        }
}

const getListImage = async(req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        let id ;
        if (token) {
            jwt.verify(token, "kiendao2001", function (err, decodedToken) {
                if (err) {
                    return res.json({ status: 'fail', msg: "Invalid token" })
                }
                id= decodedToken.userID;
            });
            if(id){
                let user= await User.findOne({_id:id});
                if(user){
                    Image.find({userId:user._id}).populate('tag').then(doc=>{
                        return res.json({status:'success',data:doc})
                    })
                }
            }
        }
    }else{
        return res.json({status:'fail',msg:'token required!'})
    }
}

exports.addImage=addImage;
exports.getListImage=getListImage;