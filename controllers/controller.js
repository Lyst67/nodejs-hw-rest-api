const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { favorite = true, page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find(
    { owner, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");
  res.status(200).json(allContacts);
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const contactById = await Contact.findById(id);
  if (!contactById) {
    throw HttpError(404, "Not Found!");
  }
  res.status(200).json(contactById);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contactData = await Contact.create({ ...req.body, owner });
  res.status(201).json(contactData);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const contactdData = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!contactdData) {
    throw HttpError(404, "Not Found!");
  }
  res.status(200).json(contactdData);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const contactdData = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!contactdData) {
    throw HttpError(404, "Not Found!");
  }
  res.status(200).json(contactdData);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await Contact.findByIdAndDelete(id);
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
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteContact: ctrlWrapper(deleteContact),
};
