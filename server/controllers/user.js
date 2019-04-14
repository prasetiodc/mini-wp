const Model = require('../models/user')
const {hash, compare} = require('../helpers/bcrypt')
const {sign, verify} = require('../helpers/jwt')

class User {
    static create(req,res){
        let newUser = new Model ({
            name : req.body.fullname,
            email : req.body.email,
            password: hash(req.body.password)
        })
        Model.create(newUser)
        .then(data=>{
            res.status(200).json(data)
        })
    }

    static findOne(req, res){
        Model.findById(req.params.id)
        .then(found=>{
            res.status(200).json(found)
        })
        .catch(err=>{
            res.status(404).json({err: "Not Found"})
        })
    }

    static login(req, res){
        Model.findOne({email:req.body.email})
        .then(found=>{
            if(found){
                if(compare(req.body.password, found.password)){                    
                    let token = sign({
                        id: found._id,
                        name: found.name,
                        email: found.email
                      })     
                    res.status(200).json(token)
                }else{
                    res.status(404).json({err:'not found'})
                }

            }
        })
        .catch(err=>{
            res.status(500).json({err: "Server error"})
        })
    }

}

module.exports = User