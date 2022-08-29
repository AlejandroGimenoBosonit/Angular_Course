// importin jwt
const jwt = require('jsonwebtoken');


const generateJWT = (uid, name) => {
    // create a new promise
    return new Promise( (resolve, reject)=>{
        jwt.sign( 
            {uid, name}, 
            process.env.SECRET_JWT_SEED, 
            {expiresIn: '24h'}, 
            (err, token)=>{
                // check for errors
                if(err){
                    console.log(err);
                    reject( err );
                }else{
                    resolve(token)
                }
            }
        );
    });
};


module.exports = { generateJWT };