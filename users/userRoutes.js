const { Router } = require("express");
const userRouter = Router();
const ApiRequests = require('./userControllers');

userRouter.get('/', ApiRequests.getContactList);
userRouter.get('/:contactId', ApiRequests.getContactById);
userRouter.post('/', ApiRequests.validateContacts, ApiRequests.createContact);
userRouter.delete('/:contactId', ApiRequests.deleteContact)
userRouter.patch('/:contactId', ApiRequests.validateUpdateContacts, ApiRequests.updateContacts);

module.exports = userRouter;