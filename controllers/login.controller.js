const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User login authentication
exports.getUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        let user = await db.user.findOne({
            where: { email: email }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        // Compare passwords
        const isSame = await bcrypt.compare(password, user.password);
        if (!isSame) {
            return res.status(401).json({ error: 'Password Is Incorrect ' });
        }

        // Generate JWT token using email


        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_TIME });

        user = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            password: user.password,
            countryCode: user.countryCode,
            phone: user.phone,
            address: user.address
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" }).json({
            message: `welcome back, ${user.firstName} ${user.lastName}`, user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Authentication failed', details: error.message });
    }
};

exports.logout = async (req, res) => {
    try {

        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: ` you are Logged out successfully.`
        })
    } catch (error) {
        console.log(error);
    }
}

// Token Authentication Middleware
exports.authenticateToken = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({message:"Login Please!",success:false});
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ message: 'Token verification failed' ,success:false});
        }
        req.user = decodedToken;

        next()
    });
};
