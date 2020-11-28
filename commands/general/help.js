const Discord = require('discord.js');
const commands = require('../../commands.js')
const discord = require('discord.js');
const lang = require('../../util.js').getLanguage();

module.exports = class HelpCommand extends commands.Command {
  constructor(){
    super({
      name: 'help',
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
  async execute(message, args, client){
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.guild.name}`, message.guild.iconURL())
    .setDescription('Comandos del AdriChat:')
    .setThumbnail(client.user.iconURL)
    .addField(':crown: ac!setup', 'Define el canal que sera el interchat.')
    .addField(':crown: ac!off', 'Elimina el interchat del servidor.')
    .addField(':crown: ac!conectar', 'Conecta un canal a un interchat privado.')
    .addField(':crown: ac!crear', 'Crea un interchat privado.')
    .addField('<:diamond_pickaxe:715531681985069167> ac!system', 'Envia un anuncio al interchat del bot.')
    .addField(':hammer_pick: ac!blacklist', 'El comando de la lista negra del bot.')
    .addField('Emblemas:', ':crown: Administrador del servidor\n<:diamond_pickaxe:715531681985069167> Administrador\n:hammer_pick: Moderador')
    .setFooter('Creado por Adrigamer2950#0001', 'https://cdn.discordapp.com/avatars/353104236491309056/a_524a4af7a6633dfd8cd42c5687a20d93.gif?size=256&f=.gif');
    message.channel.send(embed);
  }
}