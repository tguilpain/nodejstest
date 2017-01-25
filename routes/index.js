var express = require('express');
var router = express.Router();
var translation = require('../translation/translation');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Initialise translation to none.
  var translationResult = "";

  // Test query string parameters.
  if (typeof req.query.transationtext !== "undefined"
    || typeof req.query.translationfrom !== "undefined"
    || typeof req.query.translationto !== "undefined")
  {
      // All query string parameters accounted for.
      // Get translation module and launch request to yandex.
      translation(
        req.query.transationtext,
        req.query.translationfrom,
        req.query.translationto
      ).then(function(translationResult) {
        res.render('index', { title: 'Maltem back-end test', translatedText: translationResult});

      });
  };
});

module.exports = router;
