module.exports = {
 nivelesFunc: async (message, niveles, Discord) => {
    if(!niveles.tiene(`${message.author.id}`)) niveles.establecer(`${message.author.id}`, {xp: 0, nivel: 1})
    let { xp, nivel } = await niveles.obtener(`${message.author.id}`)
    let randomxp = Math.floor(Math.random() * 30 + 1)
    let levelup = 5 * (nivel ** 2) + 50 * nivel + 100
    if( xp + randomxp >= levelup) {
      niveles.establecer(`${message.author.id}`, {xp: 0, nivel:parseInt(nivel+1)})
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarUrl)
      .setDescription(`${message.member} acabas de subir de nivel a: ${parseInt(nivel+1)}!\nUwU`)
      return message.channel.send(embed)
 }
    else {
      niveles.sumar(`${message.author.id}.xp`, randomxp)
      return;
    }
 } 
}