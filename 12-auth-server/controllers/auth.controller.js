// using express function as type
const { request, response } = require('express');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

// controllers
const createUser = async(req=request, res=response) => {

    const { name, email, password } = req.body;

    try {

        // Verify email using mongoose schema
        const user = await User.findOne({email});

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists!'
            });
        }

        // Create user with the model
        const dbUser = new User( req.body );
        // Hashing password
        const salt = bcryptjs.genSaltSync();
        dbUser.password = bcryptjs.hashSync( password, salt );
        // Generate JWT
        const token = await generateJWT( dbUser.id, name );
        // Create User to DDBB
        await dbUser.save();
        // Generate success response
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error during registration process!'
        });
    }
};

const authenticateUser = async (req=request, res=response) => {

    const { email, password } = req.body;
    try {
        
        const user = await User.findOne({email});
        // check for user
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'Error with credentials'
            });
        }     
        
        // check if passwords matches
        const validPassword = bcryptjs.compareSync( password, user.password );

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            });
        }

        // generate jwt
        const token = await generateJWT( user.id, user.name ); 

        // response
        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error during login process!'
        })
    }
};

const tokenValidator = async(req=request, res=response) => {
    
    // read uid and name that has been declared in the middleware
    const { uid } = req;

    const user = await User.findById( uid );


    
    // generate new jwt
    const token = await generateJWT( uid, user.name ); 

    return res.json({
        ok: true,
        uid,
        name: user.name,
        email:user.email,
        token
    });
};


module.exports = { createUser, authenticateUser, tokenValidator };