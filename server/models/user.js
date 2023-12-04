const mongoose = require("mongoose")
const Schema = mongoose.Schema

const passportLocalMongoose = require("passport-local-mongoose")

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    }
})

const Token = new Schema({
    number: {
        type: Number,
        required: true,
    },
})

const User = new Schema({
    username: {
        type: String,
        default: "",
    },
    authStrategy: {
        type: String,
        default: "local"
    },
    refreshToken: {
        type: [Session]
    },
    tokens: {
        type: [Token]
    },
})

//remove refresh token from response
User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", User)