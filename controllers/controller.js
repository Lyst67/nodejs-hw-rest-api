const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.status(200).json(allContacts);
};

const getOneById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);
  if (!contactById) {
    throw HttpError(404, "Not Found!");
  }
  console.log(contactById);
  res.status(200).json(contactById);
};

const addContact = async (req, res) => {
  const contactData = await contacts.addContact(req.body);
  res.status(201).json(contactData);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contactdData = await contacts.updateContact(contactId, req.body);
  if (!contactdData) {
    throw HttpError(404, "Not Found!");
  }
  res.status(200).json(contactdData);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await contacts.removeContact(contactId);
  if (!removedContact) {
    throw HttpError(404, "Not Found!");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getOneById: ctrlWrapper(getOneById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
