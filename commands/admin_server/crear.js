const Discord = require('discord.js');
const commands = require('../../commands.js')
const lang = require('../../util.js').getLanguage();
const db = require('megadb');

const prefix_db = new db.crearDB('prefix')
const canalp_db = new db.crearDB('canalesp', 'canalesprivados');
const canalesp_db = new db.crearDB('canalesprivados', 'canalesprivados');

function randomKey(length=6){
return 'AC-'+Math.random().toString(20).substr(2, length)
} 

module.exports = class CrearCommand extends commands.Command {
  constructor(){
    super({
      name: 'crear',
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
    let key = randomKey();
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name}`, message.guild.iconURL)
    .setColor('#27E8FB')
    .setDescription('<a:cargando:745677946022527057> Creando base de datos');
    canalesp_db.establecer(`${key}.${message.guild.id}.${canal.id}`, {owner: message.author.id, idcanal: canal.id, idserver: message.guild.id});
    canalp_db.establecer(`${canal.id}.${message.guild.id}`, {owner: message.author.id, idcanal: canal.id, idserver: message.guild.id});
    message.channel.send(embed).then(msg1 => {
      const embed1 = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL)
      .setColor('#27E8FB')
      .setDescription(':white_check_mark: Base de datos creada');
      msg1.edit(embed1).then(msg2 => {
      const embed2 = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL)
      .setColor('#27E8FB')
      .setDescription(':white_check_mark: Base de datos creada\n:white_check_mark: Canal Definido: '+canal);
      msg2.edit(embed2).then(msg3 => {
      const embed3 = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL)
      .setColor('#27E8FB')
      .setDescription(':white_check_mark: Base de datos creada\n:white_check_mark: Canal Definido: '+canal+'\n<a:cargando:745677946022527057> Guardando');
      msg3.edit(embed3).then(msg4 => {
      const embed4 = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name}`, message.guild.iconURL)
      .setColor('#27E8FB')
      .setDescription(':white_check_mark: Base de datos creada\n:white_check_mark: Canal Definido: '+canal+'\n:white_check_mark: Datos guardados\n:white_check_mark: Creación del canal privado finalizada\n\n:information_source: Contraseña de invitación: '+key+'\nComando de invitación: '+`${prefix}conectar ${key}\nEres el anfitrion de esta sala`);
      msg4.edit(embed4);
    });
    });
    });
    });
  }
}