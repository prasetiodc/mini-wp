const User = require('../models/user') 
const Article = require('../models/article') 
const {sign, verify} = require('../helpers/jwt')

function authentication(req, res, next){
    let decoded = verify(req.headers.auth);
    
    User.findOne({email : decoded.email})
    .then(userFound=>{ 
        if(userFound){
            req.userId = userFound._id 
            next()
        }else{
            res.status(401).json({message: 'Unauthorized'})
        }       
    })
    .catch(err=>{
        console.log(err)
    })
    
}

function authorization(req, res, next){
    Article.findOne({_id:req.params.id})
    .then(data=>{
        
        if(String(data.userId)===String(req.userId)){
            next()
        }else{
            res.status(401).json({message: 'Unauthorized'})
        }
    })
    .catch(err=>{
        console.log(err);
    })
    
}

module.exports={authentication, authorization}