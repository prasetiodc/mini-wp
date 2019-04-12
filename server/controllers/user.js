const Model = require('../models/user')

class User {
    static create(req,res){
        let newUser = new Model ({
            name : req.body.title,
            email : req.body.email,
            password: req.body.password
        })
        Model.create(newUser)
        .then(data=>{
            res.status(200).json(data)
        })
        
    }


}

module.exports = User