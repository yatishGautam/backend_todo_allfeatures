const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = "nw34hwtsd*%wkejt4e532ejklnw3255"

async function encryptPassword(password){
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword
    }catch(error){
        console.log('error during hashing passowrd'+error);
    }
}

async function verifyPasswordAndGenerateToken(username, password, dbPassword){
    const isPasswordValid = await bcrypt.compare(password,dbPassword );
    if (isPasswordValid){
        const token = jwt.sign({"username":username}, secretKey);
        return token;
    }
    console.log('password invalid')
}

const verifyToken = (req,res, next) => {
    const token = req.headers['authorization'];
    if (!token){
        res.status(401).json({message:"unauthorized request you bitch"});
    }
    jwt.verify(token, secretKey, (err, decoded)=>{
        if (err){
            res.status(401).json({"message":"opmg how low can you stoop trying to log into the system with a fake token"})
        }
        req.username = decoded.username;
        next();
    });
};

module.exports = [encryptPassword,verifyPasswordAndGenerateToken]