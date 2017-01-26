// Translation module. Gets translation from Yandex translation API.

var request = require('request');
var database = require('./database');
var config = require('config');

var apiKey = config.get('translation.yandexApi.apiKey');
var apiUri = config.get('translation.yandexApi.uri');

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
        key: apiKey,
        text: text,
        lang: fromLanguageLow + '-' + toLanguageLow
    };

    var data = database.get(text, fromLanguageLow, toLanguageLow);
    return data.catch(function () {

            // No record found in db, so we call the API.
            // Prepare request query.
            var getRequest = {
                method: 'GET',
                uri: apiUri,
                qs: queryString
            };
            return new Promise(function(fulfill, reject) {
                request(getRequest, function(error, response, body) {
                    // Body is the decompressed response body.
                    if (!error
                      && response.statusCode == 200
                      && typeof body.text !== undefined) {
                        try {
                            // Throws an exception if body is not a perfect JSON.
                            var parsedJson = JSON.parse(body);
                            var translatedText = parsedJson.text.shift();
                        }
                        catch(err) {
                            reject(err);
                        }

                        // Write new translation into datbase.
                        database.write(text, fromLanguageLow, toLanguageLow, translatedText);

                        // Return translation.
                        fulfill(translatedText);
                    } else {
                        reject(error);
                    }
                })
            });
      }
    );
};
