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
		if (message.channel.type === "dm") return;
		if (Testing === true) return;
		
        let FirstEmbed = new Discord.RichEmbed()
            .setAuthor("Lyaboo", "https://cdn.discordapp.com/avatars/513448452987027478/0693b8c4738c0da560cce2ce0aa97802.png?size=256")
            .setColor("6e00ff")
            .setFooter("Bot Developer: Pharaoh#6666", "https://cdn.discordapp.com/avatars/513448452987027478/0693b8c4738c0da560cce2ce0aa97802.png?size=256")
            .setThumbnail("https://cdn.discordapp.com/avatars/513448452987027478/0693b8c4738c0da560cce2ce0aa97802.png?size=256")
            .setTimestamp()
            .addField("Bot Library", "Discord.Js")
			.addField("Bot Commands", `${Prefix}help`)
            .addField("Bot Prefix", `'${Prefix}'`)
            .addField("Bot Version", `${Version}`)
            .addBlankField(true);
		let SecondEmbed = new Discord.RichEmbed()
			.setAuthor("Lyaboo Dedications", "https://cdn.discordapp.com/avatars/513448452987027478/0693b8c4738c0da560cce2ce0aa97802.png?size=256")
			.addField("Clickbait", "Owned by Forgetful#6666")
			.addField("The Frosty Nation", "Owned by  #5243")
			.setFooter("Want to see your Discord Added? DM Pharaoh#6666", "https://cdn.discordapp.com/avatars/513448452987027478/0693b8c4738c0da560cce2ce0aa97802.png?size=256")
			.addBlankField(true);
	   message.author.send(FirstEmbed); 
	   message.author.send(SecondEmbed);
	   message.reply(":white_check_mark: Please Check Direct Messages for More Information. If you didn't receive any messages, it's because your DM's are disabled.")
	   return;
	}
}

module.exports = BotCommand