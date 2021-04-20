var pool = require('../config/db');

exports.executeQuery = function executeQuery(Query) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve({ isSuccess: false, status: 400, message: err.message });
      }
      else {
        connection.query(Query, function (error, results) {
          connection.release();
          if (error) {
            resolve({ isSuccess: false, status: 400, message: error.message });
          }
          else {
            resolve({ data: results, status: 200, isSuccess: true });
          }
        })
      }
    })
  })
};
