const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")
let format = /[!@#$%^&*()-+]+/

router.post("/register", (req, res) => {
  if (!req.body.fullname || !req.body.nric || !req.body.password) {
    res.json({ message: "Any of the fields cannot be empty" })
    return
  }

  let { fullname, nric, password } = req.body

  if (password.length < 7) {
    res.json({ message: "Your password is too short" })
    return
  } else if (!format.test(password)) {
    res.json({ message: "Your password should contain a symbol" })
    return
  }
  User.findOne({ fullname: fullname }, (err, user) => {
    if (user) {
      return res.status(400).send({ message: "User already exists" })
    } else {
      let user = new User()
      user.fullname = fullname
      user.nric = nric
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)
      user.password = hash
      user.save()
      return res.json({ message: "Registered Successfully", user })
    }
  })
})

router.post("/login", (req, res) => {
  const { fullname, password } = req.body
  if (!fullname || !password) {
    return res.json({ message: "Cannot have empty fields" })
  }
  User.findOne({ fullname }, (err, user) => {
    if (!user) return res.status(400).json({ message: "User does not exist" })
    if (err) return res.status(400).json({ err })

    let isMatch = bcrypt.compareSync(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" })
    } else {
      return res
        .status(200)
        .json({ message: "Logged in successfully", nric: user.nric })
    }
  })
})

router.get("/", (req, res) => {
  const { nric } = req.body
  User.findOne({ nric }, (err, user) => {
    if (!user) return res.json({ message: "User does not exist" })
    if (err) return res.json({ err })
    if (user) return res.json({ user })
  })
})

module.exports = router
