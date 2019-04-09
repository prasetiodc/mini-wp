const Model = require('../models/article')

class Article{
    static findAll(req, res){
        Model.find()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static create(req, res){
        let newArticle = new Model({
            title: req.body.title,
            content: req.body.content,
            created_at: new Date
        })
        Model.create(newArticle)
        .then(data=>{
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
        let newData = {
            title: req.body.title,
            content: req.body.content,
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