/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('active_key').del()
  await knex('active_key').insert([
    {id: 1, key: 'o0ii61ng'},
    {id: 2, key: 'v20kqhxs'},
    {id: 3, key: 'rb32er4d'},
    {id: 4, key: 'w5iurc6f'},
    {id: 5, key: 'mbw37kre'},
    {id: 6, key: 'ik4675na'},
    {id: 7, key: 'shrcv47a'},
  ]);
};
