// Manage interactions with mongodb.
var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017';
var db;
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, initializedDb) {
  db = initializedDb;
});


var write = function (text, translationfrom, translationto, translatedText) {
  var collection = db.collection('translations');
    collection.insert({
      'text1' : text,
      'language1' : translationfrom,
      'text2' : translationto,
      'language2' : translatedText,
    });
};

var database = {
    'write' : write
};


module.exports = database;
