const database = require('../database/database');

// Get all tasks from database
const getTasks = (callback) => {
  const sql = `SELECT * FROM Tasks`;
  database.appDatabase.all(sql, [], (error, rows) => {
    if (error) {
      console.error(error.message);
    }
    callback(rows);
  });
};

// Export models
module.exports = {
  getTasks
};