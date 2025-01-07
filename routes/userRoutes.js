const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users');
const auth = require('../middleware/auth');

router.post('/signin',userControllers.login);
router.post('/signup',userControllers.register);

router.use(auth);

// router.use('/cards', require('./cards')); // esta ruta estara protegida por la auth
// router.get('/cards', auth, createCard) //otra forma de proteger una unica ruta

module.exports = router;