const Discord = require('discord.js');
const megadb = require('megadb');
const bl_db = new megadb.crearDB('blacklist', 'blacklist');
const blk_db = new megadb.crearDB('blacklistkey', 'blacklist');

function randomKey1(length=4){
return Math.random().toString(20).substr(2, length)
} 
function randomKey2(length=4){
return Math.random().toString(20).substr(2, length)
} 
function randomKey3(length=4){
return Math.random().toString(20).substr(2, length)
} 
function randomKey4(length=4){
return Math.random().toString(20).substr(2, length)
} 
function randomKey(){
return randomKey1()+'-'+randomKey2()+'-'+randomKey3()+'-'+randomKey4()
} 

module.exports = {
  addUser: async function(user, userID, message){
    let key = randomKey();
    let obtener = await bl_db.obtener(`Users.${userID}`)
    if(obtener) return message.reply('Ese usuario ya esta en la blacklist!')
    bl_db.establecer(`Users.${userID}`, { "key": key });
    blk_db.establecer(`${key}`, { "userID": userID, "tag": user.tag, "key": key, "type": "User" });
    return message.channel.send('El usuario '+user.tag+' fue añadido a la blacklist con la clave `'+key+'`.')
  },
  removeUser: async function(user, userID, message){
    let obtener = await bl_db.obtener(`Users.${userID}`)
    if(!obtener) return message.reply('Ese usuario no esta en la blacklist!')
    let key = await bl_db.obtener(`Users.${userID}.key`)
    bl_db.eliminar(`Users.${userID}`);
    blk_db.eliminar(`${key}`);
    return message.channel.send(`El usuario ${user.tag} fue eliminado a la blacklist.`)
  },
  infoUser: async function(message, key){
    let obtenerKey = await blk_db.obtener(`${key}`);
    if(!obtenerKey) return message.reply('No existe esa clave de blacklisteo!')
    let obtenerType = await blk_db.obtener(`${key}.type`)
    if(obtenerType === 'Server') return message.reply('Ese clave es de un blacklisteo de servidor!')
    let tag = await blk_db.obtener(`${key}.tag`);
    let userID = await blk_db.obtener(`${key}.userID`);
    
    const embed = new Discord.MessageEmbed()
    .setTitle('Información de blacklisteo.')
    .addField('Tag del usuario:', tag, true)
    .addField('ID del usuario:', userID, true)
    .addField('Clave de blacklisteo:', key, true);
    message.channel.send(embed);
  },
  addServer: async function(server, serverID, message){
    let key = randomKey();
    let obtener = await bl_db.obtener(`Servers.${serverID}`)
    if(obtener) return message.reply('Ese servidor ya esta en la blacklist!')
    bl_db.establecer(`Servers.${serverID}`, { "key": key });
    blk_db.establecer(`${key}`, { "serverID": serverID, "name": server.name, "key": key, "type": "Server" });
    return message.channel.send('El servidor `'+server.name+'` fue añadido a la blacklist con la clave `'+key+'`.')
  },
  removeServer: async function(server, serverID, message){
    let obtener = await bl_db.obtener(`Servers.${serverID}`)
    if(!obtener) return message.reply('Ese servidor no esta en la blacklist!')
    let key = await bl_db.obtener(`Servers.${serverID}.key`)
    bl_db.eliminar(`Servers.${serverID}`);
    blk_db.eliminar(`${key}`);
    return message.channel.send(`El servidor `+server.name+` fue eliminado a la blacklist.`)
  },
  infoServer: async function(message, key){
    let obtenerKey = await blk_db.obtener(`${key}`);
    if(!obtenerKey) return message.reply('No existe esa clave de blacklisteo!')
    let obtenerType = await blk_db.obtener(`${key}.type`)
    if(obtenerType === 'User') return message.reply('Ese clave es de un blacklisteo de usuario!')
    let name = await blk_db.obtener(`${key}.name`);
    let serverID = await blk_db.obtener(`${key}.serverID`);
    
    const embed = new Discord.MessageEmbed()
    .setTitle('Información de blacklisteo.')
    .addField('Nombre del servidor:', name, true)
    .addField('ID del servidor:', serverID, true)
    .addField('Clave de blacklisteo:', key, true);
    message.channel.send(embed);
  },
  serverBlacklisted: async function(server, serverID, message, obtener){
    if(message.channel.id === obtener) {
      message.delete()
      const embed = new Discord.MessageEmbed()
      .setTitle('Este servidor esta blacklisteado!')
      .setDescription('Este servidor esta en la blacklist del interchat hasta que un moderador lo elimine de la blacklist.')
      message.channel.send(embed)
    }
  }
}