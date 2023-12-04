const express = require("express")
const router = express.Router()
const User = require("../models/user")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const { verifyUser } = require("../authenticate")

router.get("/tfaCodes", verifyUser, (req, res, next) => {
    User.findById(req.user._id).then(
        user => {
            res.send(user.TfaCodes)
        },
        err => next(err)
    )
})

router.get("/allTfaCodes", verifyUser, (req, res, next) => {
    User.aggregate([
        {
            '$unwind': {
                'path': '$TfaCodes'
            }
        }, {
            '$addFields': {
                'code': '$TfaCodes.code'
            }
        }, {
            '$group': {
                '_id': null,
                'codes': {
                    '$push': '$code'
                }
            }
        }
    ]).then(doc => {
        res.send(doc)
    },
        err => next(err))
})

router.post("/newTfaCode", verifyUser, (req, res, next) => {
    const newTfaCode = req.body
    User.findById(req.user._id).then(
        user => {
            user.TfaCodes.push(newTfaCode)
            user.save().then(user => { res.send({ success: true }) }).catch(err => { res.status(500).send(err) })
        },
        err => next(err)
    )
})

module.exports = router