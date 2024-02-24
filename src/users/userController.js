const userModel = require('../../models/usermodel');
async function findUserByUserName(userNameToFind){
    try {
        const user = await userModel.findOne({ username: userNameToFind });
        return user; 
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}

module.exports = findUserByUserName;