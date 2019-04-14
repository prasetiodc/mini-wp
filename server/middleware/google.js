const {sign, verify} = require('../helpers/jwt')
const {hash} = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const user = require('../models/user')

function googleLogin(req, res){
    let payload;
    client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      payload = ticket.getPayload() 
    
      return user.findOne({
        email: payload.email
      })
    })
    .then((foundUser) => {
      if (foundUser) {  
        const token = sign({id:foundUser._id, name: payload.name, email: payload.email})     //JWT
        res.status(200).json(token)
      } else {
        let pass = Math.floor(Math.random()* 800000)+100000
        let newUser = new user({
          fullname: payload.name,
          email: payload.email,
          password: hash(String(pass))
        })
        user.create(newUser)          
        .then(data=>{
          const token = sign({id:data._id, name: payload.name, email: payload.email})     //JWT
          res.status(200).json(token)
        })
        
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err.message)
    })
  }

module.exports = googleLogin