const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true, lowercase: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["admin", "teacher", "student"], default: "student"}
},{
    timestamps: true
})

const Users = mongoose.model("User", userSchema)

module.exports = Users