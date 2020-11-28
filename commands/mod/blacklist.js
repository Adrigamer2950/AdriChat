const Discord = require('discord.js');
const commands = require('../../commands.js')
const discord = require('discord.js');
const lang = require('../../util.js').getLanguage();
const db = require('megadb');
const blacklist = require('../../funciones/blacklist.js');

const canales_db = new db.crearDB('canales');
const prefix_db = new db.crearDB('prefix');

module.exports = class SystemCommand extends commands.Command {
  constructor(){
    super({
      name: 'blacklist',
      aliases: ['bl'],
      args: [
        new commands.Argument({
          optional: true,
          missingError: lang.error.noArgs.mention,
          invalidError: lang.error.incoArgs.text
        })
      ],
      category: 'mod',
      priority: 9,
      permLvl: 1
    });
  }
  async execute(message, args, client){
    const prefix = prefix_db.tiene(`${message.guild.id}`) ? await prefix_db.obtener(`${message.guild.id}`) : 'ac!';
    let funcion = args[0];
    let key = args[1];
    let id = args[1];
    if(funcion === 'adduser'){
      let user = message.mentions.members.first();
      if(!user){
        let userbyid = client.users.cache.get(id);
        let userID = id;
        blacklist.addUser(userbyid, userID, message)
        return;
      }else{
        blacklist.addUser(user.user, user.user.id, message)
        return;
      }
    }
    else if(funcion === 'deluser'){
      let user = message.mentions.members.first();
      if(!user){
        let userbyid = client.users.cache.get(id);
        let userID = id;
        blacklist.removeUser(userbyid, userID, message)
      }else{
        blacklist.removeUser(user.user, user.user.id, message)
      }
    }
    else if(funcion === 'infouser'){
      blacklist.infoUser(message, key)
    }
    else if(funcion === 'addserver'){
      let server = client.guilds.cache.get(id);
      let serverID = id;
      blacklist.addServer(server, serverID, message)
    }
    else if(funcion === 'delserver'){
      let server = client.guilds.cache.get(id);
      let serverID = id;
      blacklist.removeServer(server, serverID, message)
    }
    else if(funcion === 'infoserver'){
      let server = client.guilds.cache.get(id);
      let serverID = id;
      blacklist.infoServer(message, key)
    }else{
      const embed = new Discord.MessageEmbed()
      .setTitle('Ayuda del comando ac!blacklist')
      .addField('ac!blacklist adduser `id del usuario`', 'Para añadir a un usuario a la blacklist.')
      .addField('ac!blacklist deluser `id del usuario`', 'Para borrar a un usuario a la blacklist.')
      .addField('ac!blacklist infouser `clave de blacklisteo`', 'Para ver la informacion de un usuario que esta en la blacklist.')
      .addField('ac!blacklist addserver `id del servidor`', 'Para añadir a un servidor a la blacklist.')
      .addField('ac!blacklist delserver `id del servidor`', 'Para añadir a un servidor a la blacklist.')
      .addField('ac!blacklist infoserver `clave de blacklisteo`', 'Para ver la informacion de un servidor que esta en la blacklist.');
      message.channel.send(embed)
    }
  }
}