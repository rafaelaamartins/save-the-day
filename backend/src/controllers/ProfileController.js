const Incident = require('../models/Incident');

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await Incident.find({
      ngo: ong_id
    });

    return response.json(incidents);
  }
}