const UserModel = require('../models/user.model');

const md5 = require('md5')

module.exports = {
  async create(req, h) {
    if(req.payload === null)
      return h.response({message: 'NOT a JSON'}).code(400);

    if (!req.payload.email) {
      return h.response({message: 'Email is required'}).code(409);
    }

    if (!req.payload.password) {
      return h.response({message: 'Password is required'}).code(409);
    }

    const user = new UserModel({
      email: req.payload.email,
      password: md5(req.payload.password)
    });

    const dup = await UserModel.findOne({email: user.email}).exec();

    if(dup)
      return h.response({error: 'Duplicated user'}).code(409);

    try {
        let result = await user.save();
        return h.response(result).code(200);
    } catch (error) {
        return h.response(error).code(500);
    }
  },
  async login(req, h) {

    if(req.payload === null)
      return h.response({message: 'NOT a JSON'}).code(400);

    const {email, password} = req.payload

    try {
        const user = await UserModel.findOne({email: email, password: md5(password)}).exec();

        if (!user)
          return h.response({error: 'Unauthorized'}).code(401)

        return h.response({ user_token: user._id }).code(200)

    } catch (error) {
        return h.response(error).code(500)
    }
  }
}