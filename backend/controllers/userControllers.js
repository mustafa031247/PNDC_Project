const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body; //Check Req page body Field here Destructe happen

    if (!name || !email || !password) { //check weather if these not have some text mean throw An error 
        res.status(400);
        throw new Error("Please Enter All the Fields")
    }

    const userExists = await User.findOne({ email }) //findone is Mongo Query to find email field if this email already exist in our DB mean Throw an Error

    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({ //Through User Models we  Create User 
        name, email, password, pic
    });

    if (user) { //user Create Sucess so we make json of it
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    }

    else { //other Through Error that user Not yet Create
        res.status(400);
        throw new Error("User not Create !");
    }
});


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {// Here matchPassward is My method to Check our Enter Value of Password
        // User.matchPassword(password) we can't use this statement for our User We call this function for our obj user which have findone(email) Output Find one is the mongo Query
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    }

    else { //other Through Error that user Not yet Create
        res.status(400);
        throw new Error("User not Create !");
    }
})

//url/chats/user?search=Badshah here search is a Query for url we get this value by using request.query
const allUsers = asyncHandler(async (req, res) => {
    const keywords = req.query.search ? {
        $or: [
            // $ all are monGo Db Query CHeck doc for this
            //here option i mean match lower case of our query and origianl state value
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    }
        : {};
    const users = await User.find(keywords).find({ _id: { $ne: req.user._id } });
    res.send(users)
})

module.exports = { registerUser, authUser, allUsers }