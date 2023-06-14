const mongoose = require('mongoose');

const data_base_name = "notes";

const connection = async() =>{

    let url = `mongodb://127.0.0.1:27017/${data_base_name}`;

    try {
        
        await mongoose.connect(url);

        console.log("mongoose connected to DB");

    } catch (error) {
        console.log(error);
    }
};


module.exports = connection;