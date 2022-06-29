const userModel = require("../models/users");
const bcrypt = require('bcrypt');

class User {
    async getAllUser(req, res) {
        try {
            let User = await userModel
                                .find({})
                                .populate('allProduct.id', 'pName pImage pPrice')
                                .populate('user', 'name email')
                                .sort({_id: -1});
            if(User) {
                return res.json({User});
            }
        } catch (error) {
            console.log(err);
        }
    };

    async getSingleUser(req, res) {
        let {uId} = req.body;
        
    }
}