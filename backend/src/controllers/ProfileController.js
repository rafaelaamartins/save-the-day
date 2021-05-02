const Incident = require('../models/Incident');

// Function get incidents by ngo
module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await Incident.find({
      ngo: ong_id
    });

    return response.json(incidents);
  }
}