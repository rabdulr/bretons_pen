const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL || 'postgres://localhost/bretons_pen');

client.connect();

module.exports = client;