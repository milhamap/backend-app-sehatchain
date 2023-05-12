/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('random').notNullable();
        table.string('fullname').notNullable();
        table.text('address').notNullable();
        table.string('phone', 13).notNullable();
        table.string('email').notNullable();
        table.string('public_address').notNullable();
        table.string('image').notNullable();
        table.integer('role_id').unsigned().notNullable();
        table.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('refresh_token').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
