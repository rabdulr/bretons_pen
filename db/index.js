const client = require('./client');

const sync = async() => {
    const SQL = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS monologues;

        CREATE TABLE monologues (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            title VARCHAR(100),
            "dateCreated" DATE NOT NULL DEFAULT CURRENT_DATE,
            "storyText" TEXT
        );
    `;
    await client.query(SQL)
}

module.exports = {
    sync
}