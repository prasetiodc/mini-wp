const router = require('express').Router()
const article = require('../controllers/article')
const {authentication} = require('../middleware/auth')
const {authorization} = require('../middleware/auth')
const gcs = require('../helpers/gcs')

router.get('/', authentication, article.findAll)
router.get('/:id', authentication, authorization, article.findOne)
router.post('/', authentication, gcs.multer.single("featured_image"), gcs.sendUploadToGCS, article.create)
router.delete('/:id', authentication, authorization, article.delete)
router.put('/:id', authentication, authorization, article.update)

    // router.get('/', authentication, article.findAll)
    // router.get('/:id', authentication, authorization, article.findOne)
    // router.post('/', authentication, article.create)
    // router.delete('/:id', authentication, authorization, article.delete)
    // router.put('/:id', authentication, authorization, article.update)

module.exports = router