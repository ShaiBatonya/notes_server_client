const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: {
        type: String,
        required: [true, "user name is required"]
    },

    user_email : {
        type : String,
        required: [true, "user email is required"]
    },
    user_password : {
        type : String,
        required: [true, "user password is required"]
    }
});


userSchema.pre('save',async function(next){

    const hash = await bcrypt.hash(this.user_password, 15);
    this.user_password = hash;

    next();
});


module.exports = mongoose.model('users', userSchema);