const Discord = require('discord.js');
const commands = require('../../commands.js')
const discord = require('discord.js');
const lang = require('../../util.js').getLanguage();
const db = require('megadb');

const canales_db = new db.crearDB('canales')

module.exports = class OffCommand extends commands.Command {
  constructor(){
    super({
      name: 'off',
      aliases: [],
      args: [
        new commands.Argument({
          optional: true,
          missingError: lang.error.noArgs.mention,
          invalidError: lang.error.incoArgs.text
        })
      ],
      category: 'admin_server',
      priority: 7,
      permLvl: 4
    });
  }
  async execute(message, args){
    if(canales_db.tiene(`${message.guild.id}`)){
      canales_db.eliminar(`${message.guild.id}`)
      return message.channel.send('Interchat eliminado de este servidor.');
    }else{
      return message.reply('No hay ningun interchat definido en este servidor.');
    }
  }
}