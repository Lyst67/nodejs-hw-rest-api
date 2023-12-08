const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/controller");
const schema = require("../models/contact");
const {
  validateBody,
  isValidId,
  isValidFavoriteBody,
  authenticate,
} = require("../middlewares");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getOneById);

router.post("/", authenticate, validateBody(schema.schema), ctrl.addContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schema.schema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  isValidFavoriteBody(schema.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

module.exports = router;
