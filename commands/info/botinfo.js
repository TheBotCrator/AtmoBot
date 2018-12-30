const Commando = require('discord.js-commando')
const Discord = require('discord.js')

class BotCommand extends Commando.Command { 
	constructor(client){
		super(client, {
			name: 'botinfo',
			group: 'info',
			memberName: "botinfo",
			description: 'Will return the Bot Information to User.'
		});
	}	
	
	async run(message, args){
        if (message.author.equals(Bot.user)) return;
		if(message.channel.type === "dm") return;
		if(Testing === true) return;
		
        let Bot_Embed = new Discord.RichEmbed()
            .setTitle("Lyaboo")
            .setAuthor("Kali#6666", "https://cdn.discordapp.com/avatars/417835827700301836/5596ef1137c7083eb212d0d85072f63e.png?size=256")
            .setColor("6e00ff")
            .setFooter("Bot Developer: Kali#6666", "https://cdn.discordapp.com/avatars/513448452987027478/0693b8c4738c0da560cce2ce0aa97802.png?size=256")
            .setThumbnail("https://cdn.discordapp.com/avatars/513448452987027478/0693b8c4738c0da560cce2ce0aa97802.png?size=256")
            .setTimestamp()
            .addField("Bot Library", "Discord.Js")
            .addField("Bot Prefix", `'${Prefix}'`)
            .addField("Bot Version", `${Version}`)
            .addBlankField(true);
       	message.author.send(Bot_Embed); 
		return;
	}
}

module.exports = BotCommand