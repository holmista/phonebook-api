const express = require("express");
const {
  getAllContacts, createContact, deleteContact, updateContact,
} = require("../controllers/contactController");
const { auth } = require("../controllers/authController");

const router = express.Router();

router.use(auth);

router.get("/:userId", getAllContacts);
router.post("/", createContact);
router.patch("/:contactId", updateContact);
router.delete("/:contactId", deleteContact);

module.exports = router;
