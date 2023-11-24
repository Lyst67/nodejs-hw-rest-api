const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/controller");
const schema = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getOneById);

router.post("/", validateBody(schema.schema), ctrl.addContact);

router.put("/:contactId", validateBody(schema.schema), ctrl.updateContact);

router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;
