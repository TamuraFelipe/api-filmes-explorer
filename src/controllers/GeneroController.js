const knex = require('../database/knex');

class GeneroController{
    async index(request, response){
        const { user_id } = request.params;

        const generos = await knex("movie_tags")
        .where({ user_id })

        return response.json(generos)
    }
}

module.exports = GeneroController;