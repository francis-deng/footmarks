/*
import knex_init from 'knex';

const path = require('path');
const dbPath = path.resolve(process.env.DB_PATH, '/diary.sqlite');

const knex = knex_init({
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true
});

knex.schema
  .hasTable('diary')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('diaries', (table)  => {
          table.increments('id').primary();
          table.string('title');
          table.string('author');
          table.string('content');
          table.integer('ts');
          table.string('weather');
          table.string('location');
          table.string('deivce');
          table.string('wc');
          table.string('img1');
          table.string('img2');
          table.string('img3');
        })
        .then(() => {
          // Log success message
          console.log('Table \'diaries\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

module.exports = knex  
*/
import * as dotenv from 'dotenv';

dotenv.config();

const sqlite3 = require('sqlite3');
const dbPath = process.env.DB_PATH;
const dbFile = dbPath.concat('/diary.sqlite');


let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
            createDatabase();
            return;
        } else if (err) {
            console.log("Getting error when openning an existed database: " + err);
            process.exit(1);
    }
});

function createDatabase() {
    let newdb = new sqlite3.Database(dbFile, (err) => {
        if (err) {
            console.log(`Getting error when creating database on ${dbFile}: ${err}`);
            process.exit(1);
        }
        createTables(newdb);
    });

    db = newdb;
}

function createTables(newdb) {
    newdb.exec(`
    CREATE TABLE IF NOT EXISTS diaries (
        id INTEGER primary key not null,
        title TEXT,
        author text,
        content TEXT,
        ts INTEGER not null,
        weather TEXT,
        location TEXT,
        deivce TEXT,
        wc TEXT,
        img1 TEXT,
        img2 TEXT,
        img3 TEXT
    );

    CREATE TABLE IF NOT EXISTS diaries_images (
        diaries_id INTEGER not null,
        image TEXT not null
    );
        `,(err)=>{
            if (err) {
              console.log("Getting error when creating table: " + err);
              process.exit(1);
            }
        });
}

module.exports = db