var GAMEDB = null;
var isTableExisting = false;
function nullDataHandler() {
    console.log("SQL Query Succeeded");
}
function errorHandler() {
    console.log("SQL Query Succeeded");
}
function prePopulate() {
    GAMEDB.transaction(
        function (transaction) {
            //Optional Starter Data when page is initialized
            var data = ['1', LIVES, SCORE, currentWave];
            var sql = 'INSERT INTO game_settings(id, lives, score, wave) VALUES (?, ?, ?, ?)';
            transaction.executeSql(sql, [data[0], data[1], data[2], data[3]]);
        }
    );
}
function createTables() {
    GAMEDB.transaction(
        function (transaction) {
            var sql = 'CREATE TABLE IF NOT EXISTS';
            sql += ' game_settings(id INTEGER NOT NULL PRIMARY KEY, lives REAL NOT NULL, score REAL NOT NULL, wave REAL NOT NULL);';
            transaction.executeSql(sql, [], nullDataHandler, errorHandler);
        }
    );
    prePopulate();
}
function openDatabaseConnection() {
    try {
        if (!window.openDatabase) {
            alert('Databases are not supported in this browser.');
        } else {
            var shortName = 'GAMEDB';           // Is the DB name as it will be referred to by the browser and SQL
            var version = '1.0';                // openDatabase version. 1.0 for this
            var displayName = 'DEMO Database';  // The full display name / description of the database
            var maxSize = 100000/*bytes*/;      // This is max size in bytes is the size you expect the database to reach.
            GAMEDB = openDatabase(shortName, version, displayName, maxSize);
        }
    } catch (e) {
        if (e === 2) {
            // Version number mismatch.
            console.log("Invalid database version.");
        } else {
            console.log("Unknown error " + e + ".");
        }
        return;
    }
}
function initDatabase() {
    openDatabaseConnection();
    if (GAMEDB !== null) {
        createTables();
        selectAll();
    }
}
function selectAll() {
    GAMEDB.transaction(
        function (transaction) {
            var sql = 'SELECT * FROM game_settings;';
            transaction.executeSql(sql, [], dataSelectHandler, errorHandler);
        }
    );
}
function dataSelectHandler(transaction, results) {
    // Handle the results
    for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        var savedGame = {
            lives: row['lives'],
            score: row['score'],
            wave: row['wave']
        };
    }
    alert(results.rows.length);
}
function updateSetting(id, lives, score, wave) {
    GAMEDB.transaction(
        function (transaction) {
            var sql = 'UPDATE game_settings SET lives=?, score=?, wave=? WHERE id = ?';
            transaction.executeSql(sql, [lives, score, wave, id]);
        }
    );
    selectAll();
}
function dropTables() {
    GAMEDB.transaction(
        function (transaction) {
            var sql = 'DROP TABLE game_settings;';
            transaction.executeSql(sql, [], nullDataHandler, errorHandler);
        }
    );
    location.reload();
}

function tableExitsDataHandler(transaction, results) {
    isTableExisting = !!(results.rows.length > 0);
}

function tableExists() {
    GAMEDB.transaction(
        function (transaction) {
            var sql = 'SELECT * FROM game_settings;';
            transaction.executeSql(sql, [], tableExitsDataHandler, errorHandler);
        }
    );
}