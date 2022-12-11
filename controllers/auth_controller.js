const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register
const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).send(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Login
const login = async (req, res) => {
    try {
        const user = await User.findOne( {
            username: req.body.username
        } );
        !user && res.status(400).json('Wrong credentials!');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json('Wrong credentials!');

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    register,
    login
};