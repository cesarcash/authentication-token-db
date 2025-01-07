const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 2
    }
});

userSchema.statics.findUserByCredentials = async function (email,password){

    const user = await this.findOne({email});
    if(!user) throw new Error('Incorrect email or password');

    const matched = await bcrypt.compare(password,user.password);
    if(!matched) throw new Error('Incorrect email or password');

    return user;

    // return this.findOne({email})
    // .then((user) => {
    //     if(!user) return Promise.reject( new Error('Incorrect email or password') )
    //     return bcrypt.compare(password,user.password)
    //     .then((matched) => {
    //         if(!matched) return Promise.reject(new Error('Incorrect email or password'))
    //         return user;
    //     });
    // });

}

module.exports = mongoose.model('user',userSchema);