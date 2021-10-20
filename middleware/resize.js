const status = require("../utils/status.js")
const sharp = require('sharp')
const fs = require('fs')
const moment = require('moment')

const resize_image  = async (req, res, next) =>{
    let i=0;
    const {id} = req.params
    if (req.file){
        let dir = `./uploads/${id}`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        const name = req.file.originalname.split('.')[0];
        req.file.path = `uploads/${id}/${date}-${name}`

        await sharp(req.file.buffer)
            .resize(150, 150)
            .toFile(`./uploads/${id}/${date}-${name}-mini.webp`)

        await sharp(req.file.buffer)
            .resize(450, 450)
            .toFile(`./uploads/${id}/${date}-${name}-big.webp`)

        await sharp(req.file.buffer)
            .toFile(`./uploads/${id}/${date}-${name}-large.webp`)
        next ()
    }else{
        return res.status(status.error).send("something went wrong")
    }

}

module.exports = {
    resize_image,
}