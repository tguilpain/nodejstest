// Translation module. Gets translation from Yandex translation API.

var request = require('request');
var database = require('./database');

module.exports = function(text, fromLanguage, toLanguage) {
        // Prepare query string.
        var fromLanguageLow = fromLanguage.toLowerCase();
        var toLanguageLow = toLanguage.toLowerCase();
        var queryString = {
            key: 'trnsl.1.1.20170125T033742Z.57d5d2f9676c8356.0684e3202007b52728603c6fdf2b54c0fbaa150a',
            text: text,
            lang: fromLanguageLow + '-' + toLanguageLow
        };

        // Prepare request query
        var getRequest = {
            method: 'GET',
            uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
            qs: queryString
        };
        return new Promise(function(fulfill, reject) {
                request(getRequest, function(error, response, body) {
                    // body is the decompressed response body
                    if (!error && response.statusCode == 200) {
                        if (typeof body.text !== undefined) {
                            // CATCH SYNTAX ERROR EXCEPTION IF JSON WRONG FORMAT
                            // TODO
                            var parsedJson = JSON.parse(body);
                            var translatedText = parsedJson.text.shift();
                            console.log(translatedText);

                            // Write new translation into datbase.
                            database.write(text, fromLanguageLow, toLanguageLow, translatedText);

                            // Display translation.
                            fulfill(translatedText);
                        }
                        } else {
                            console.log('Request failed');
                            console.log(error);
                            reject(error);
                        }
                    })
                  });

};