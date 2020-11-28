const Discord = require('discord.js');
const commands = require('../../commands.js')
const discord = require('discord.js');
const lang = require('../../util.js').getLanguage();
const db = require('megadb');

const canales_db = new db.crearDB('canales')

module.exports = class SetupCommand extends commands.Command {
  constructor(){
    super({
      name: 'setup',
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
    let canal = message.mentions.channels.first();
    if(!args[0]){
      return message.reply('Tienes que mencionar a un canal!');
    }
    if(!canal){
      return message.reply('Tienes que mencionar un canal valido!')
    }
    canales_db.establecer(`${message.guild.id}`, `${canal.id}`)
    message.reply(`Interchat definido en ${canal}`);
  }
}