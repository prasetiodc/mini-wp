const Model = require('../models/article')

class Article{
    static findAll(req, res){
        // Model.findOne({author:req.userId})        
        Model.find()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static create(req, res){
        console.log(req.file ,"  FILE");
        console.log(req.userId);
        

        // console.log(req.file.cloudStoragePublicUrl,"   URL FILE");
        // res.status(200).json(req.userId)
        
        let newArticle = new Model({
            title: req.body.title,
            content: req.body.content,
            created_at: new Date,
            status: req.body.status,
            author: req.userId,
            // featured_image: req.file.cloudStoragePublicUrl,
        })
        Model.create(newArticle)
        .then(data=>{
            console.log("INPUT SUKSES");
            
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static findOne(req, res){
        Model.findById(req.params.id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static delete(req, res){
        Model.deleteOne({_id:req.params.id})
        .then(data=>{
            res.status(200).json("Delete Success")
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static update(req, res){
        console.log("MASUK EDIT");
        
        let newData = {
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            // featured_image: req.body.featured_image,
        }
        Model.findOneAndUpdate({_id:req.params.id}, { $set: newData}, {new:true})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = Article