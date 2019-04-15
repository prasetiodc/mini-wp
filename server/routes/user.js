const router = require('express').Router()
const user = require('../controllers/user')
const googleLogin = require('../middleware/google')

router.post('/', user.create)
router.post('/login', user.login)
router.post('/googleLogin', googleLogin)

// router.get('/:id', user.findOne)

module.exports = router