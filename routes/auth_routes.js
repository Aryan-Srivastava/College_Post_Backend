const router = require('express').Router();
const register = require('../controllers/auth_controller').register;
const login = require('../controllers/auth_controller').login;

router.post('/register', register);
router.post('/login', login);

module.exports = router;