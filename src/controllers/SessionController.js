const Ngo = require('../models/Ngo');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ngo = await Ngo.findOne({ email : id }); 
    if (!ngo) {
      return response.status(400).json({ error: 'No NGO found with this email' });
    }

    return response.json(ngo);
  }
}