const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

// estruturação de uma entidade no bd
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere' //necessário o índice para latitude e longitude
    }
})

// exporta a estrutura como model Dev. Schema é da estrutura do mongoose
module.exports = mongoose.model('Dev', DevSchema)