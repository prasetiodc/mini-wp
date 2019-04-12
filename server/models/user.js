const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
})

userSchema.path('email').validate(function(value){
    return User.findOne({email:value})
    .then(data=>{
        if(data){
            return Promise.resolve(false)
        }else{
            return Promise.resolve(true)
        }
    })
    .catch(err=>{
        return Promise.reject(err)
    })
})

let User = mongoose.model('Users', userSchema)

module.exports = User