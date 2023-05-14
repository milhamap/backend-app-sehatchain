/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { v4: uuidv4 } = require('uuid')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1, 
      random: uuidv4(),
      fullname: 'Admin Sehat Ledger',
      address: 'Jl. Sehat Ledger',
      phone: '081234567890',
      email: 'sehatchain@gmail.com',
      role_id: 1,
    }
  ]);
};
