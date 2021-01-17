const {
  Types: { ObjectId },
} = require("mongoose");
const Joi = require("joi");
const Contact = require("./Contact");
const { func } = require("joi");

async function getContacts(req, res) {
  const data = await Contact.find();
  res.json(data);
}

function validateContactId(req, res, next) {
  const {
    params: { id },
  } = req;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("This ID is not valid");
  }

  next();
}

function validateContact(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.number().required(),
    subscription: Joi.string().required(),
    token: Joi.string().required(),
  });
  const validationResult = validationRules.validate(req.body);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }
  next();
}

async function findContactById(req, res) {
  const {
    params: { id },
  } = req;
  const data = await Contact.findById(id);

  if (!data) {
    return res.status(404).send("Contact is not found");
  }
  res.json(data);
}

async function createContact(req, res) {
  try {
    const data = await Contact.create(req.body);
    await res.json(data);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send("Email is dublicated");
    }
  }
}

async function updateContact(req, res) {
  const {
    params: { id },
  } = req;
  const result = await Contact.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!result) {
    return res.status(400).send("Contact is not found");
  }

  res.json(result);
}

async function deleteContact(req, res) {
    const { params: {id}} = req;
    const result = await Contact.findByIdAndDelete(id);

    if(!result){
        return res.status(400).send("Contact is not found");
    }

    res.json(result);
}

module.exports = {
  getContacts,
  createContact,
  findContactById,
  validateContactId,
  validateContact,
  updateContact,
  deleteContact,
};
