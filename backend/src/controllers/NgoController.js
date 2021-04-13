const Ngo = require('../models/Ngo');

module.exports = {
  async index(request, response) {
    const ongs = await Ngo.find();
    return response.json(ongs);
  },

  async create(request, response) {
    const { email} = request.body;

    try {
      if (await Ngo.findOne({ email })) {
        return response.status(400).send({ error: 'Ngo already exists'})
      }
  
      const ngo = await Ngo.create(request.body)
  
      return response.json({ id: ngo._id });
    } catch (error) {
      
      return response.status(400).send({ error: 'Registration failed!' });
    }
  }
};