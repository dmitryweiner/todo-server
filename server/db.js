const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const fs = require('fs');

let db;
const DB_FILENAME = 'db.json';

/**
 * @param {boolean} [testMode] = false
 * @returns {object} DB
 */
function initDb() {
    const isExists = fs.existsSync(DB_FILENAME);
    const adapter = new FileSync(DB_FILENAME);
    const _db = low(adapter);

    if (!isExists) {
        _db.defaults({
            todos: [],
        }).write();
    }
    db = _db;
    return db;
}

/**
 * @returns {object} DB
 */
function getDb() {
    return db;
}

module.exports = {
    initDb,
    getDb
};
