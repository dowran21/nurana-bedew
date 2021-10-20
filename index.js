require('dotenv').config()
const express = require ('express')
const app = express()
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const helmet = require('helmet')

const Routers = require('./router/index.js');

const port = process.env.PORT || 3000

let dir = path.join(__dirname, 'uploads')

const allowedOrigins = ['http://localhost:3001', 'http://localhost:8000', 'http://localhost:3000','http://localhost:7000', 'http://45.93.136.141:7000', 'http://192.168.31.219:8000', 'http://192.168.1.106:8000', 'http://192.168.31.125:3000'];
//const allowedOrigins = ['http://localhost:8090', 'http://10.60.1.20:9062', 'http://95.85.97.206:9062'];
app.use(cors({
    origin: function (origin, callback) {
        //console.log(origin)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
        },
    credentials: true
}));



app.use(express.json());
app.use(morgan('dev'))
  
app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );


app.use(express.static(path.join(__dirname, 'build')))
app.use('/api', Routers)


app.use('/uploads', express.static(dir));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, ()=>{console.log(`Your server started and listening on port ${port}`)})
