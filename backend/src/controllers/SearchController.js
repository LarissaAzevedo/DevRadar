const Dev = require('../models/Dev')
const parseStringAsArray = require('../models/utils/parseStringAsArray')

module.exports = {
    async index(request, response) {
        // Busca em um raio de 10km e filtro por tecnologias
        const { latitude, longitude, techs } = request.query

        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs: {
                // retorna se há as mesmas tecnologias que existem em techsArray
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000
                }
            }
        })
        return response.json({ devs })
    }
}