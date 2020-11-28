const Discord = require('discord.js');
const commands = require('../../commands.js')
const discord = require('discord.js');
const lang = require('../../util.js').getLanguage();
const db = require('megadb');

const prefix_db = new db.crearDB('prefix');
const canalp_db = new db.crearDB('canalesp', 'canalesprivados');
const canalesp_db = new db.crearDB('canalesprivados', 'canalesprivados');

module.exports = class ConectarCommand extends commands.Command {
  constructor(){
    super({
      name: 'conectar',
      aliases: [],
      args: [
        new commands.Argument({
          optional: true,
          missingError: lang.error.noArgs.mention,
          invalidError: lang.error.incoArgs.text
        })
      ],
      category: 'general',
      priority: 10,
      permLvl: 0
    });
  }
  async execute(message, args){
    let canal = message.channel;
    const prefix = prefix_db.tiene(`${message.guild.id}`) ? await prefix_db.obtener(`${message.guild.id}`) : 'ac!';
    let key = args[0];
    if(!key){
      return message.reply('No has puesto una llave!')
    }
    let okey = await canalesp_db.obtener(`${key}`)
    if(!okey){
      return message.reply('No existe esa llave!')
    }
    if(canalesp_db.tiene(`${key}.${message.guild.id}`)){
      canalesp_db.eliminar(`${key}.${message.guild.id}`);
    }
    canalesp_db.establecer(`${key}.${message.guild.id}.${canal.id}`, {idcanal: canal.id, idserver: message.guild.id});
    canalp_db.establecer(`${canal.id}.${message.guild.id}`, {idcanal: canal.id, idserver: message.guild.id});
    return message.channel.send('Canal conectado!');
  }
}