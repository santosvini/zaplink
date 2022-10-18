const ContactModel = require('../models/contact.model');

module.exports = {
  async create(req, h) {

    if(req.payload === null)
      return h.response({message: 'NOT a JSON'}).code(400);

    const contact = new ContactModel({
      name: req.payload.name,
      number: req.payload.number,
      description: req.payload.description
    });

    if (!contact.name) {
      return h.response({message: 'Name is required'}).code(409);
    }

    if (!contact.number) {
      return h.response({message: 'Number is required'}).code(409);
    }

    if (!contact.description) {
      return h.response({message: 'Description is required'}).code(409);
    }

    const dup = await ContactModel.findOne({number: contact.number}).exec();

    if(dup)
      return h.response({error: 'Duplicated number'}).code(409);

    try {
        let result = await contact.save();
        return h.response(result).code(200);
    } catch (error) {
        return h.response(error).code(500);
  }

},
  async remove (req, h) {
    try {
       await ContactModel.deleteOne({_id: req.params.contactId});
       return h.response({}).code(204);
    } catch (error) {
       return h.response(error).code(500);
    }
  },
  
  async list(req, h) {
    const contacts = await ContactModel.find().exec();
    return contacts;
  }
}