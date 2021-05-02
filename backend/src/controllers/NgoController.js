const Ngo = require('../models/Ngo');

// Function create ngo and get all ngos
module.exports = {
    async index(request, response) {
        const ongs = await Ngo.find();
        return response.json(ongs);
    },

    async create(request, response) {
        const { email } = request.body;

        try {

            const emailExists = await Ngo.findOne({ email });
            if (emailExists) {
                return response.status(400).send({ error: 'Ngo already exists' })
            }

            const ngo = await Ngo.create(request.body)

            return response.json({ id: ngo._id });
        } catch (error) {

            return response.status(400).send({ error: 'Registration failed!' });
        }
    }
};