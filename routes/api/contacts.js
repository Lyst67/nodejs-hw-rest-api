const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/controller");
const schema = require("../../models/contact");
const {
  validateBody,
  isValidId,
  isValidFavoriteBody,
} = require("../../middlewares");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getOneById);

router.post("/", validateBody(schema.schema), ctrl.addContact);

router.put("/:id", isValidId, validateBody(schema.schema), ctrl.updateContact);

router.patch(
  "/:id/favorite",
  isValidId,
  isValidFavoriteBody(schema.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidId, ctrl.deleteContact);

module.exports = router;
