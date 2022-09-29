const express = require("express")
const History = require("../models/History")
const router = express.Router()

router.post("/", (req, res) => {
  const { name, address, created_by } = req.body

  if (!name || !address || !created_by) {
    return res.json({ message: "Invalid QR Code" })
  } else {
    let history = new History()
    history.name = name
    history.address = address
    history.created_by = created_by

    history.save()
    return res.json({ message: "Checked-In Successfully", history })
  }
})

router.get("/", async (req, res) => {
  let histories = await History.find({ created_by: req.body.nric })
  return res.json({ histories })
})

module.exports = router
