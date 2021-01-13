const fs = require("fs");
const path = require("path");
const { uuid } = require("uuidv4");

const contactsPath = path.join(__dirname, "./../db/contacts.json");

function listContacts() {
  return (contacts = require(contactsPath));
}

function getContactById(contactId) {
  const contacts = require(contactsPath);
  const id = parseInt(contactId);
  return contacts.find((contact) => contact.id === id);
}

function removeContact(contactId) {
  const contacts = require(contactsPath);
  const deleteContact = contacts.filter((contact) => contact.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(deleteContact), (err) => {
    console.log(err);
  });
}

function addContact(name, email, phone) {
  // ...твой код
  console.log(uuid);
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const newContactList = [
      ...JSON.parse(data),
      { id: uuid(), name, email, phone },
    ];
    fs.writeFile(contactsPath, JSON.stringify(newContactList), (err, data) => {
      if (err) {
        console.log(err);
      }
      console.table(newContactList);
    });
  });
}
function updateContact(contactId, data) {
  const contacts = require(contactsPath);
  const listBefore = listContacts();
  const contactIndex = listBefore.findIndex((contact) => contact.id == contactId);
  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...data,
  };
  fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
    if (err) throw err;
  });
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
