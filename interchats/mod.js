module.exports = async (Discord, client, message, prefix, canales_db, obtener, blacklist_db, owner_db, mod_db, interchat_blacklist, canalesp_db, obtenerp) => {
  if (message.author.bot) return;
  let comprobacion_mods = await mod_db.obtener(`${message.author.id}`);
  if(!comprobacion_mods) return;
  let comprobacion_blacklist = await blacklist_db.obtener(`Users.${message.author.id}`);
  if(comprobacion_blacklist){
    interchat_blacklist(Discord, client, message, prefix, canales_db, obtener, blacklist_db, owner_db)
    return;
  }
  if(comprobacion_mods){
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
       .setDescription(`🔧 **Mod** 🔧 | [Invita al bot](https://discord.com/api/oauth2/authorize?client_id=755490775743201330&permissions=388161&scope=bot)`)
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
       .setDescription(`🔧 **Mod** 🔧 | [Invita al bot](https://discord.com/api/oauth2/authorize?client_id=755490775743201330&permissions=388161&scope=bot) | Canal privado`)
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