var should = require('should');
var database = require('../translation/database');

describe('mongodb interactions', function(){
  it('should write in the database and then fetch the document',function(){
    database.write('hand', 'en', 'fr', 'main');
    return database.get('hand', 'en', 'fr').should.eventually.be.exactly('main');
  })
});
