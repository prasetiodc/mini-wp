const router = require('express').Router()
const article = require('../controllers/article')

router.get('/', article.findAll)
router.get('/:id', article.findOne)
router.post('/', article.create)
router.delete('/:id', article.delete)
router.put('/:id', article.update)

module.exports = router