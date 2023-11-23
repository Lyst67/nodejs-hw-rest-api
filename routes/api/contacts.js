const express = require("express");
const router = express.Router();
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contacts.getContactById(contactId);
    if (!contactById) {
      throw HttpError(404, "Not Found!");
    }
    console.log(contactById);
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const contactdData = await contacts.addContact(req.body);
    res.status(201).json(contactdData);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contacts.removeContact(contactId);
    if (!removedContact) {
      throw HttpError(404, "Not Found!");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const contactdData = await contacts.updateContact(contactId, req.body);
    if (!contactdData) {
      throw HttpError(404, "Not Found!");
    }
    res.status(200).json(contactdData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
