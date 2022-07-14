const Contact = require("../models/contactModel");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    res.status(201).json({
      status: "success",
      data: { contacts },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(200).json({
      status: "success",
      data: { contact },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
    if (!contact) throw new Error("invalid contact");
    res.status(200).json({
      status: "success",
      data: { contact },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.contactId);
    if (!contact) throw new Error("invalid contact");
    res.status(200).json({
      status: "success",
      data: { },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  getAllContacts, createContact, deleteContact, updateContact,
};
