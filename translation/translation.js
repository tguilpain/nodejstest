// Translation module. Gets translation from Yandex translation API.

var request = require('request');
var database = require('./database');

/**
 * Returns the translation of the given text
 * @param {String} text to translate
 * @param {String} fromLanguage language to translate from
 * @param {String} toLanguage language to translate to
 * @returns {Promise} translated text
 */
module.exports = function(text, fromLanguage, toLanguage) {
    // Prepare query string.
    var fromLanguageLow = fromLanguage.toLowerCase();
    var toLanguageLow = toLanguage.toLowerCase();
    var queryString = {
        key: 'trnsl.1.1.20170125T033742Z.57d5d2f9676c8356.0684e3202007b52728603c6fdf2b54c0fbaa150a',
        text: text,
        lang: fromLanguageLow + '-' + toLanguageLow
    };

    var data = database.get(text, fromLanguageLow, toLanguageLow);
    data.then(function (myresult) {
      console.log('result:');
      console.log(myresult);
      if (myresult.length > 0) {
        console.log('Return my result');
        return new Promise(function(fulfill, reject) {fulfill(myresult + 'db')});
      }
      else {

      }
    });
    console.log('after then');

    // No record found in db, so we call the API.
    // Prepare request query
    var getRequest = {
        method: 'GET',
        uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
        qs: queryString
    };
    return new Promise(function(fulfill, reject) {
        request(getRequest, function(error, response, body) {
            // body is the decompressed response body
            if (!error
              && response.statusCode == 200
              && typeof body.text !== undefined) {
                // CATCH SYNTAX ERROR EXCEPTION IF JSON WRONG FORMAT
                // TODO
                var parsedJson = JSON.parse(body);
                var translatedText = parsedJson.text.shift();

                // Write new translation into datbase.
                database.write(text, fromLanguageLow, toLanguageLow, translatedText);

                // Return translation.
                fulfill(translatedText);
            } else {
                console.log('Request failed');
                console.log(error);
                reject(error);
            }
        })
    });
};
