// Manage interactions with mongodb.

var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017';
var db;

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, initializedDb) {
  db = initializedDb;
});

/**
 * Write new entry into mongodb
 * @param {String} text1 text
 * @param {String} language1 text1's language
 * @param {String} language2 text2's language
 * @param {String} text2 text1's translation into language2
 */
var write = function (text1, language1, language2, text2) {
  var collection = db.collection('translations');
    collection.insert({
      'text1' : text1,
      'language1' : language1,
      'text2' : text2,
      'language2' : language2,
    });
};


/**
 * Fetch translation if available
 * @param {String} text text
 * @param {String} languageFrom text's language
 * @param {String} languageTo target translation language
 * @returns {String} translation, empty string if not found.
 */
function get(text, languageFrom, languageTo) {
  //TODO
}

// Encapsulate database interactions.
var database = {
    'write' : write,
    'get': get
};

module.exports = database;
