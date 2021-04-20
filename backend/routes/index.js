var helperFile = require('../helpers/helperFunctions.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pokemon', function (req, res, next) {
  const filterLeg = (req.query.legendary === 'true');
  const page = req.query.page;
  const LIMIT = 20;
  const OFFSET = (page-1) * LIMIT;
  var SQL;
  var countSQL = `SELECT COUNT(*) as count FROM pokemon`;
  if (filterLeg) {
    SQL = `SELECT * FROM pokemon WHERE legendary='True' LIMIT ${LIMIT} OFFSET ${OFFSET}`;
    countSQL = "SELECT COUNT(*) as count FROM pokemon where legendary='True'";
  } else {
    SQL = `SELECT * FROM pokemon LIMIT ${LIMIT} OFFSET ${OFFSET}`;
  }
  helperFile.executeQuery(countSQL).then(countRes => {
    console.log("res = ", countRes.data);
    const total = countRes.data[0]['count'];

    helperFile.executeQuery(SQL).then(pokemonList => {
      if (!pokemonList.isSuccess) {
        const output = { status: 400, isSuccess: false, message: pokemonList.message };
        res.json(output);
      } else {
        if (pokemonList.data.length > 0) {
          const output = { status: 200, isSuccess: true, data: pokemonList.data, total: total };
          res.json(output)
        }
      }
    });
  });
});

module.exports = router;
