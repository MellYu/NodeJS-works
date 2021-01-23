const { Router } = require("express");
const ContactsController = require("./contacts.controller");
const router = Router();

router.get("/", ContactsController.getContacts);
router.get(
  "/:id",
  ContactsController.validateContactId,
  ContactsController.findContactById
);
router.post(
  "/",
  ContactsController.validateContact,
  ContactsController.createContact
);
router.put(
  "/:id",
  ContactsController.validateContactId,
  ContactsController.validateUpdateContact,
  ContactsController.updateContact
);
router.delete(
  "/:id",
  ContactsController.validateContactId,
  ContactsController.deleteContact
);

module.exports = router;
