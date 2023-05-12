/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('rme', table => {
        table.increments('id').primary();
        table.string('random').notNullable();
        table.string('nomor').notNullable();
        table.string('name').notNullable();
        table.string('nik', 16).notNullable();
        table.enum('gender', ['L', 'P']).notNullable();
        table.date('birthday').notNullable();
        table.text('address').notNullable();
        table.string('profession').notNullable();
        table.enum('assurance', ['BPJS', 'Tunai']).notNullable();
        table.date('visit').notNullable();
        table.string('poli').notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('blockhash').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('rme');
};
