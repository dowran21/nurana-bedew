require('dotenv').config()
const JWT = require('jsonwebtoken')

const status = require('../utils/status.js')

const VerifyAdminAccessToken = async (req, res, next) =>{
    let token = req.headers.authorization;
    if (!token){
        return res.status(status.unauthorized).send("Unauthorized")
    };
    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.ADMIN_ACCESS_SECRET_KEY, async(err, decoded) =>{
        if(err){
            // console.log(err)
            return res.status(status.not_authorized).send("Not Authorized")
        }
        if(decoded){
            req.user = decoded;
            next()
        }
    })
}


const VerifyUserAccessToken = async (req, res, next) =>{
    let token = req.headers.authorization;
    token = token.replace("Bearer ", "");
    if (token === 'null'){
        return res.status(status.not_authorized).send("Unautharized")
    };
    JWT.verify(token, process.env.ACCESS_SECRET_KEY, async(err, decoded) =>{
        if(err){
            console.log(err)
            return res.status(status.access_expired).send('Access_Expired')
        }
        if (decoded){
            req.user = decoded;
            next()
        }     
    })
}


module.exports = {
    VerifyAdminAccessToken,
    VerifyUserAccessToken
}

// echo "# nurana-bedew" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/dowran21/nurana-bedew.git
// git push -u origin main
