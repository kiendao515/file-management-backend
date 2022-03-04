const {Category} = require('../model/category')

// add new category
const addCategory = async(req,res,next)=>{
    const {name} = req.body;
    let c= new Category({name:name,name_lower:name.toLowerCase()})
    try{
        c.save().then(doc=>{
            return res.json({status:'success',msg:'insert successfully',data:doc})
        })
    }catch(err){
        console.log(err);
    }
}

const getCategory = async(req,res,next)=>{
    let c= await Category.find({});
    return res.json({status:'success',data:c});
}

exports.addCategory= addCategory;
exports.getCategory= getCategory;