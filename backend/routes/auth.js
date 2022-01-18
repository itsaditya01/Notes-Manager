const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env'});

const JWT_SECRET = process.env.JWT_SECRET_STRING;

//Router 1 : route for creating a use : "api/auth/createuser" :: NO login required
router.post(
    '/createuser',[
    body('name','Enter a valid Name').isLength({ min: 3 }),
    body('email','Enter a valid Email').isEmail(),
    body('password','Enter a valid Password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }
        try {

            //Check whether user with this email exists or not
            const findUser = await User.findOne({email: req.body.email})
            if(findUser){
                return res.status(400).json({success, error: "User with this Email-id already exists"});
            }

            //Check whether password and confirm password matches or not
            if(req.body.password !== req.body.cpassword){
                return res.status(400).json({success, error:"Passwords are not matching"});
            }

            //Create Hashing of password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //Create User
            const user = await User.create({
                name: req.body.name,
                email:req.body.email,
                password: secPass,
                cpassword: secPass
            });
            const data = {
            user: {
                id: user.id
                }
            }
            success = true;
            const authtoken = jwt.sign(data, JWT_SECRET);
            // res.json(user)
            res.json({success, authtoken })

        } catch (error) {
            console.log(error.message);
            res.status(500).json({success, error:'Internal Server Error'});
        }
    })


//Router 2 : route for login in account: "api/auth/login" :: NO login required
router.post(
    '/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password','Password cannot be blank').exists()],
    async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({success,  errors: errors.array() });
        }

        try {
            //Checking email and password exists in out database
            const {email, password} = req.body;
            const userFind = await User.findOne({email});
            if(!userFind){
                return res.status(401).json({ success, error: 'Invalid Email'});
            }
            const passwordCompare = await bcrypt.compare(password, userFind.password)
            if(!passwordCompare){
                return res.status(401).json({success, error: 'Invalid Password'});
            }
            
            //Creating and sending token
            const data = {
                user : {id : userFind.id}
            }
            success = true;
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({success, authToken});
            
        } catch (error) {
            console.log(error.message);
            success = false;
            res.status(500).json({success, error:'Internal Server Error'});
        }
    })

//Router 3 : Fetching details of loggedIn user: using POST "api/auth/getuser" :: login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password"); 
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;