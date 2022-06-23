const jwt = require("jsonwebtoken");
const userModel = require('../models/users');
require('dotenv').config();

exports.loginCheck = (req, res, next) => {
    try {
        let token = req.headers.token;
        token = token.replace('Bearer', '');
        decode = jwt.verify(token, process.env.secret);
        req.userDetails = decode;
        next();
    } catch (error) {
        res.json({
            error: 'You must be logged in',
        });
    }
};
exports.isAuth = (req, res, next) => {
    let {loggedInUserId} =req.body;
    if(
        !loggedInUserId ||
        !req.userDetails._id ||
        loggedInUserId != req.userDetails._id
    ) {
        res.status(403).json({error: 'You are not authenticate'});
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    try {
        let reqUser = await userModel.findById(req.body.loggedInUserId);
        if(reqUser.userRole === 0) {
            res.status(403).json({error: 'Access denied'});
        }
        next();
    } catch (error) {
        res.status(403);
    }
};
