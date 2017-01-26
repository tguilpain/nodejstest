// Manage interactions with mongodb.

var MongoClient = require('mongodb').MongoClient;
var config = require('config');

// Get mongoDb's config.
var url = config.get('translation.mongoDb.url');
var collectionName = config.get('translation.mongoDb.collectionName');

// Use connect method to connect to the Server
var connection = new Promise(function(fulfill, reject) {
  MongoClient.connect(url, function(err, initializedDb) {
    if(err) {
      console.error("connection to database unsuccessful, is Mongo running?");
      reject(err);
    } else {
      fulfill(initializedDb);
    }});
})

/**
 * Write new entry into mongodb, does not check for an existing entry.
 * @param {String} text1 text
 * @param {String} language1 text1's language
 * @param {String} language2 text2's language
 * @param {String} text2 text1's translation into language2
 */
var write = function(text1, language1, language2, text2) {
  connection.then(function(db) {
    var collection = db.collection(collectionName);
    collection.insert({
      'text1' : text1,
      'language1' : language1,
      'text2' : text2,
      'language2' : language2,
    });
  })
};


/**
 * Fetch translation if available.
 * @param {String} text text
 * @param {String} languageFrom text's language
 * @param {String} languageTo target translation language
 * @returns {String} translation, empty string if not found.
 */
var get = function(text, languageFrom, languageTo) {
  return connection.then(function(db) {
    var collection = db.collection(collectionName);
    return new Promise(function(fulfill, reject) {
      var results = collection.find({
        'text1' : text,
        'language1' : languageFrom,
        'language2' : languageTo,
      },{'text2': true}).toArray(function(err, results){
        if (results.length > 0) {
          // Found one result.
          var translation = results.shift().text2;
          fulfill(translation);
        }
        else {
          // Look the other way.
          results = collection.find({
            'text2' : text,
            'language1' : languageTo,
            'language2' : languageFrom,
          },{'text1': true}).toArray(function(err, results){
            if (results.length > 0) {
              // Found one result.
              var translation = results.shift().text1;
              fulfill(translation);
            } else  {
              reject();
            }
          });
        }
      });
    })
  })
}

// Encapsulate database interactions.
var database = {
    'write' : write,
    'get': get
};

module.exports = database;
