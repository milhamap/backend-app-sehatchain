const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, users) => {
            if(err) return res.sendStatus(403)
            req.user = users
            next()
        })
    },
    isAdmin: (req,res,next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, users) => {
            if(err) return res.sendStatus(403)
            if(users.role_id !== 1) return res.status(400).json({message: `You aren't admin`})
            req.user = users
            next()
        })
    },
    isHospital: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, users) => {
            if(err) return res.sendStatus(403)
            if(users.role_id !== 2) return res.status(400).json({message: `You aren't hospital`})
            req.user = users
            next()
        })
    },
    isPublic: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, users) => {
            if(err) return res.sendStatus(403)
            if(users.role_id !== 3) return res.status(400).json({message: `You aren't public`})
            req.user = users
            next()
        })
    },
}