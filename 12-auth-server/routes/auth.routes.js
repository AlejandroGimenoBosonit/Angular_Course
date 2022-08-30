const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

// import routes controllers
const { createUser, authenticateUser, tokenValidator } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields.middleware');
const { validateJWT } = require('../middlewares/validate-jwt.midleware');


// Authenticate user - login
router.post( 
    '/', // path 
    [
        // check 'email' if it is an email. If not, send an error message by controller
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be longer than 6 characters').isLength({min: 6}),
        validateFields
    ], // middlewares -> validations
    authenticateUser); // controller


// Create user - register
router.post( 
    '/register',
    [
        check('name', 'Must provide username').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be longer than 6 characters').isLength({min: 6}),
        // custom middleware
        validateFields 
    ],
    createUser);


// Validate Token
router.get( 
    '/renew',
    validateJWT,
    tokenValidator);

// export routes
module.exports = router;