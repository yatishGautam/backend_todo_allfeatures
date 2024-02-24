const mongoose = require('mongoose');

async function connectToDb(){
    try{
        const dbString = process.env.DBSTRING;
        const connection = await mongoose.connect(dbString);
        console.log('database connencted');
    }catch(error){
        console.log('cannot configuire the databse'+error)
    }
}

module.exports = connectToDb;