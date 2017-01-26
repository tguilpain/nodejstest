var should = require('should');
var translation = require('../translation/translation');

describe('homepage', function(){
  it('should connect to yandex and translate text',function(){
    return translation('Hello my name is Ilyess', 'EN', 'FR').should.eventually.be.exactly('Bonjour mon nom est Ilyess');
  })
});
