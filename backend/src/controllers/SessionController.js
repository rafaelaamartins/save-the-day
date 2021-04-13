const Ngo = require('../models/Ngo');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    
    const ngo = await Ngo.findOne( {
      $or: [
        { email : id},
        {_id: id }
      ]
    });
    
    if (!ngo) {
      return response.status(400).json({ error: 'No NGO found with this ID' });
    }

    return response.json(ngo);
  }
}