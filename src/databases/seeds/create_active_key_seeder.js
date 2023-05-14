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
    {id: 8, key: 'm2vDBgOz'},
    {id: 9, key: '0x4ZIe3X'},
    {id: 10, key: '1ztk131L'},
    {id: 11, key: 'lGIFZ8Rn'},
    {id: 12, key: 'g9UoUHcq'},
    {id: 13, key: 'h77LDXFm'},
    {id: 14, key: 'at7HKVW1'},
    {id: 15, key: 'zgbDdqvY'}
  ]);
};
