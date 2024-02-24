const z = require('zod');
const userModel  = require('../../models/usermodel');
const encryptPassword = require('../../config/authFunctions');
const findUserByUserName = require('../users/userController');

const userSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(8)
})

async function createANewUser(req, res, next){
    try{
        const { username, password } = userSchema.parse(req.body);
        const existingUser = await findUserByUserName(username);
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const encryptedPassword = encryptPassword(password);
        const user = new userModel({
            username, 
            password: encryptedPassword});
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
        console.log('user created')
    }catch(error){
        console.log('invalid inputs for the userschema');
    }
}

async function login(req, res, next){

}

module.exports = [createANewUser, login]