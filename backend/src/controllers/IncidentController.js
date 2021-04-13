const Incident = require('../models/Incident');

module.exports = {
  async index(request, response) {

    try {
      const incidents = await Incident.where().populate('ngo')
      return response.json(incidents);
      
    } catch (error) {
      return response.status(500).json({ error: 'Operation not permitted.' });
    }
  },

  async show(request, response) {
    try {
      const { id } = request.params;
    const incident = await Incident.findById(id).populate('ngo');
    if (!incident._id) {
      return response.status(404).json({ error: 'Not exists incident.' });
    }

    return response.json(incident);
      
    } catch (error) {
      return response.status(500).json({ error: 'Operation not permitted.' });
    }
  },

  async create(request, response) {
    const ngo_id = request.headers.authorization;
    
    const { description, title, value } = request.body;

  
    const incident = await Incident.create({
      title, 
      description,
      value: Number(value),
      ngo: ngo_id
    })

    return response.json({ id: incident._id });
  },

  async edit(request, response) {
    const { id } = request.params;
    const incident = await Incident.findById(id);
    if (!incident._id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    const incidentUpdated = await Incident.findByIdAndUpdate(id, response.body);

    return response.json(incidentUpdated);
  },

  async delete(request, response) {
    const { id } = request.params;
    const ngo_id = request.headers.authorization;

    const incident = await Incident.findById(id);

    if (incident.ngo != ngo_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await Incident.findByIdAndDelete(id);

    return response.status(204).send('ok');
  }
};