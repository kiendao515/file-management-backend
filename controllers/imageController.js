const { Image } = require('../model/image');
const jwt = require("jsonwebtoken");
const { User } = require('../model/user');
const { createJwtToken } = require("../util/auth")
const mongoose = require("mongoose");
const addImage = async (req, res, next) => {
    const { imageUrl, description, tag } = req.body;
    console.log(tag);
    const token = req.headers.authorization.split(' ')[1];
    let id;
    if (token) {
        jwt.verify(token, "kiendao2001", function (err, decodedToken) {
            if (err) {
                return res.json({ status: 'fail', msg: "Invalid token" })
            }
            id = decodedToken.userID;
        });
        if (id) {
            let user = await User.findOne({ _id: id });
            if (user) {
                let image = new Image({ userId: user._id, imageUrl: imageUrl, description: description, tag: tag })
                image.save().then(doc => {
                    return res.json({ status: 'success', data: doc })
                })
            }
        }
    }
}

const getListImage = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        let id;
        if (token) {
            jwt.verify(token, "kiendao2001", function (err, decodedToken) {
                if (err) {
                    return res.json({ status: 'fail', msg: "Invalid token" })
                }
                id = decodedToken.userID;
            });
            if (id) {
                let user = await User.findOne({ _id: id });
                if (user) {
                    Image.find({ userId: user._id }).populate('tag').then(doc => {
                        return res.json({ status: 'success', data: doc })
                    })
                }
            }
        }
    } else {
        return res.json({ status: 'fail', msg: 'token required!' })
    }
}

const listDataFromFilter = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        let id;
        if (token) {
            jwt.verify(token, "kiendao2001", function (err, decodedToken) {
                if (err) {
                    return res.json({ status: 'fail', msg: "Invalid token" })
                }
                id = decodedToken.userID;
            });
            if (id) {
                let user = await User.findOne({ _id: id });
                if (user) {
                    let { tag } = req.body;
                    console.log(tag);
                    let arr = [];
                    for (var i = 0; i < tag.length; i++) {
                        arr.push(mongoose.Types.ObjectId(tag[i]));
                        if (arr.length === tag.length) {
                            Image.find({ userId:user._id,'tag': { $in: tag } }).then(doc => {
                                return res.json({ status: 'success', data: doc })
                            })
                        }
                    }
                }
            }
        }
    }
}
exports.addImage = addImage;
exports.getListImage = getListImage;
exports.listDataFromFilter = listDataFromFilter;