exports.up = knex => knex.schema.createTable("movie_tags", table => {
    table.increments("id");
    table.text("name");
    table.integer("movies_notes_id").references("id").inTable("movies_notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
}); 

exports.down = kenx => knex.schema.dropTable("movie_tags");
