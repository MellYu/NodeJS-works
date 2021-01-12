const Joi = require("joi");
const ContactsFunctions = require("./contacts");

module.exports = class ApiRequests {
  static getContactList(req, res, next) {
    return res.status(200).json(ContactsFunctions.listContacts());
  }

  static createContact(req, res, next) {
    return res
      .status(201)
      .json(
        ContactsFunctions.addContact(
          req.body.name,
          req.body.email,
          req.body.phone
        )
      );
  }

  static getContactById(req, res, next) {
    const id = req.params.contactId;
    return res.status(200).json(ContactsFunctions.getContactById(id));
  }

  static deleteContact(req, res, next) {
    const id = req.params.contactId;
    return res.status(200).json(ContactsFunctions.removeContact(id));
  }

  static updateContacts(req, res, next) {
    const id = req.params.contactId;
    const data = req.body;
    ContactsFunctions.updateContact(id, data);
    return res.status(200).json(ContactsFunctions.listContacts());
  }

  static validateContacts(req, res, next) {
    const contactsRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const result = contactsRules.validate(req.body);
    if (!result) {
      return res.status(400).send(result.error);
    }

    next();
  }
  static validateUpdateContacts(req, res, next) {
    const contactsRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    }).min(1);
    const result = contactsRules.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }

    next();
  }
};
