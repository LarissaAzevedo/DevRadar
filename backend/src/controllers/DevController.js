const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../models/utils/parseStringAsArray');

// index = chama todos - show = chama um - store = cria - update = atualiza - destroy = deleta

module.exports = {

    async index(request, response) {
        const devs = await Dev.find()
        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body

        // verificando se já existe um mesmo usuário cadastrado
        let dev = await Dev.findOne({ github_username })

        if (!dev) {

            // request à api do github
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            // dados recebidos da request acima
            const { name = login, avatar_url, bio } = apiResponse.data

            // percorre o array das tecnologias, remove os espaços antes e após o texto
            const arrayTechs = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            // adiciona os dados recebidos
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                tech: arrayTechs,
                location
            })
        }
        return response.json(dev)
    }
}