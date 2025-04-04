const authService = require('../services/authService'); // Corrected the path

exports.signup = async (req, res) => {
    try {
        const user = await authService.signup(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}


exports.login = async (req, res) => {
    try {
        const user = await authService.login(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                email: user.email,
                username: user.username,
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}