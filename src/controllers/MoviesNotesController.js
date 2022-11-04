const knex = require("../database/knex");

class MoviesNotesController{
    async create(request, response){
        const { title, description, rating, name } = request.body;
        const { user_id } = request.params;

        const moviesNotesIdInsert = await knex("movies_notes").insert({
            title,
            description,
            rating,
            user_id
        });

        const moviesTagsInsert = await knex("movie_tags").insert({
            movies_notes_id: moviesNotesIdInsert,
            user_id,
            name
        })


        response.json();
    }

    async show(request, response){
        const { id } = request.params;

        const moviesNotes = await knex("movies_notes").where({id}).first();
        const movieTags = await knex("movie_tags").where({movies_notes_id: id}).orderBy("name")

        return response.json({
            ...moviesNotes,
            movieTags
        });
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("movies_notes").where({id}).delete();

        return response.json()
    }

    async index(request, response){
        const { title, user_id, tags } = request.query;
        let moviesNotes;

        if(tags){
           moviesNotes = await knex("movie_tags")
           .select([
            "movies_notes.id",
            "movies_notes.title",
            "movies_notes.user_id",
           ])
           .where("movies_notes.user_id", user_id)
           .whereLike("movies_notes.title", `%${title}%`)
           .where({"name": tags})
           .innerJoin("movies_notes", "movies_notes.id", "movie_tags.movies_notes_id")
           .orderBy("movies_notes.title")
        }else{
            moviesNotes = await knex("movies_notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        }

        const userTags = await knex("movie_tags").where({user_id});
        const notesWithTags = moviesNotes.map(note => {
        const noteTag = userTags.filter(tag => tag.movie_tags_id === note.id);

        return {
            ...moviesNotes,
            tags: noteTag
        }
        })

        return response.json({notesWithTags})
    }
}

module.exports  = MoviesNotesController;