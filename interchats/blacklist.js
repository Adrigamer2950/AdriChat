module.exports = async (Discord, client, message, prefix, canales_db, obtener, blacklist_db, owner_db, canalesp_db) => {
  if (message.author.bot) return;
  let comprobacion_blacklist = await blacklist_db.obtener(`Users.${message.author.id}`);
  if(!comprobacion_blacklist) return;
  if(comprobacion_blacklist){
   if(message.channel.id === obtener){
     message.delete();
     const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription('Error!\nUsted esta en la blacklist (Lista Negra) del interchat!')
    .addField('Usted no podra mandar mensajes en el interchat a menos que un miembro del staff te elimine de la blacklist (Lista Negra).', 'Disculpe las molestias.')
    .setFooter(message.guild.name, message.guild.iconURL());
    return message.channel.send(embed)
   }
  }
}