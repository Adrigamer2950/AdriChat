module.exports = {
  getConfig: function(){
    let config = './config.js';
    return [config, require(config)]
  },
  getLanguage: function(){
    let lang = require('./languages/ES-es.json');
    return lang;
  },
  getSend: function(message, text){
    return message.channel.send(text);
  }
}