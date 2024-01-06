const express = require('express');
const { validatorRegister, validatorLogin } = require('../validators/auth');
const { registerCtrl, loginCtrl } = require('../controllers/auth');
const router = express.Router();


// Todo: CREAR UN REGISTRO
router.post('/register', validatorRegister, registerCtrl);


router.post('/login', validatorLogin , loginCtrl);


module.exports = router;