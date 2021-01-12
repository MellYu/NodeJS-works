const { Router } = require("express");
const contactsRouter = Router();
const ApiRequests = require('./contactsControllers');

contactsRouter.get('/', ApiRequests.getContactList);
contactsRouter.get('/:contactId', ApiRequests.getContactById);
contactsRouter.post('/', ApiRequests.validateContacts, ApiRequests.createContact);
contactsRouter.delete('/:contactId', ApiRequests.deleteContact)
contactsRouter.patch('/:contactId', ApiRequests.validateUpdateContacts, ApiRequests.updateContacts);

module.exports = contactsRouter;