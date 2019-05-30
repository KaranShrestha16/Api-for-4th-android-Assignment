
const jwt = require('jsonwebtoken');
module.exports=(req ,res, next)=>{
    const accessToken = req.headers.authorization;
    console.log(accessToken)
    jwt.verify(accessToken, 'secret_key', (error, authData) => {
        if (error) {
            res.status(400).json({
                success: false,
                error: error,
                message: "You are Not Authorized  User"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "You are  Authorized  User"
            });
        }
    });

}