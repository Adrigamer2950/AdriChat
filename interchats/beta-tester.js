module.exports = async (Discord, client, message, prefix, canales_db, obtener, blacklist_db, bt_db, interchat_blacklist, owner_db, canalesp_db, obtenerp, blacklist) => {
  if (message.author.bot) return;
  let comprobacion_bt = await bt_db.obtener(`${message.author.id}`);
  if(!comprobacion_bt) return;
  let comprobacion_blacklist = await blacklist_db.obtener(`Users.${message.author.id}`);
  if(comprobacion_blacklist){
    interchat_blacklist(Discord, client, message, prefix, canales_db, obtener, blacklist_db, owner_db)
    return;
  }
  let comprobacion_blacklistServer = await blacklist_db.obtener(`Servers.${message.guild.id}`);
  if(comprobacion_blacklistServer){
    blacklist.serverBlacklisted(message.guild, message.guild.id, message, obtener)
    return;
  }
  if(comprobacion_bt){
    if (message.content.startsWith(prefix)) return;
    if (message.content.includes('discord.gg/')) return;
    if (message.content.includes('discord.com/invite/')) return;
     if (message.content.includes('http://')) return;
   if (message.content.includes('https://')) return;
   if(message.channel.id === obtener){
     message.delete();
     let channel = message.channel;
     channel.createInvite({ unique: true }).then(invite => {
       const embed = new Discord.MessageEmbed()
       .setAuthor(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }))
       .setColor("RANDOM")
       .setDescription(`🛠 **Beta Tester** 🛠 | [Invita al bot](https://discord.com/api/oauth2/authorize?client_id=755490775743201330&permissions=388161&scope=bot)`)
       .addField(`<a:peepo_clap:722055764826652824> Mensaje:`, message.content)
       .setThumbnail(message.guild.iconURL())
       .setFooter(`${message.guild.name}, ${message.guild.memberCount} miembros`, message.guild.iconURL({ dynamic: true }));

       client.guilds.cache.forEach(async (g) => {
                    try {
                      let obtener_canal = await canales_db.obtener(`${g.id}`);
                        client.channels.cache.get(obtener_canal).send(embed);
                    } catch (e) {
                        return;
                    }
                });
     });
   }
   if(message.channel.id === obtenerp){
     message.delete();
     let channel = message.channel;
     channel.createInvite({ unique: true }).then(invite => {
       const embed = new Discord.MessageEmbed()
       .setAuthor(`${message.author.tag} | Desarollador y Owner del bot`, message.author.displayAvatarURL({ dynamic: true }))
       .setColor("#188cb8")
       .setDescription(`🛠 **Beta Tester** 🛠 | [Invita al bot](https://discord.com/api/oauth2/authorize?client_id=755490775743201330&permissions=388161&scope=bot) | Canal privado`)
       .addField(`<a:peepo_clap:722055764826652824> Mensaje:`, message.content)
       .setThumbnail(message.guild.iconURL())
       .setFooter(`${message.guild.name}, ${message.guild.memberCount} miembros`, message.guild.iconURL({ dynamic: true }));

       client.channels.cache.forEach(async (c) => {
                    try {
                      client.guilds.cache.forEach(async (g) => {
                    try {
                      let obtener_canal = await canalesp_db.obtener(`${c.id}.${g.id}.idcanal`);
                        client.channels.cache.get(obtener_canal).send(embed);
                    } catch (e) {
                        return;
                    }
                });
                    } catch (e) {
                        return;
                    }
                });
     });
   }
  }
}