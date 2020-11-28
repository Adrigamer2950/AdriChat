const Discord = require('discord.js');
const commands = require('../../commands.js')
const discord = require('discord.js');
const lang = require('../../util.js').getLanguage();
const db = require('megadb');

const canales_db = new db.crearDB('canales');
const prefix_db = new db.crearDB('prefix');

module.exports = class SystemCommand extends commands.Command {
  constructor(){
    super({
      name: 'system',
      aliases: [],
      args: [
        new commands.Argument({
          optional: true,
          missingError: lang.error.noArgs.mention,
          invalidError: lang.error.incoArgs.text
        })
      ],
      category: 'admin',
      priority: 8,
      permLvl: 3
    });
  }
  async execute(message, args, client){
    const prefix = prefix_db.tiene(`${message.guild.id}`) ? await prefix_db.obtener(`${message.guild.id}`) : 'ac!';
    message.delete();
    if(!args[0]){
      return message.reply('Tienes que escribir un mensaje!');
    }
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription('Mensaje oficial del interchat.')
    .addField('Mensaje:', `${message.content.replace(prefix+'system', '')}`)
    .setFooter('Sistema de anuncios del interchat', 'https://thumbs.gfycat.com/AffectionateAthleticCalf-size_restricted.gif');
    client.guilds.cache.forEach(async (g) => {
                    try {
                      let obtener_canal = await canales_db.obtener(`${g.id}`);
                        client.channels.cache.get(obtener_canal).send(embed);
                    } catch (e) {
                        return;
                    }
                });
  }
}