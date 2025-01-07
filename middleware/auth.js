const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
    res.status(401).send({"message": "Error de autorización"})
}

module.exports = (req,res,next) => {

    try {

        const {authorization} = req.headers;
    
        if(!authorization || !authorization.startsWith('Bearer ')){
    
            return handleAuthError(res)
    
        }
    
        const token = authorization.replace('Bearer ','')
        const payload = jwt.verify(token,'string-token-secret');

        req.user = payload;

        next();

    }catch(err){
        handleAuthError(res)
    }


}