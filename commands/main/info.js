const Commando = require('discord.js-commando')
const Discord = require('discord.js')

class HelpCommand extends Commando.Command { 
	constructor(client){
		super(client, {
			name: 'info',
			group: 'main',
			memberName: "info",
			description: 'Will Prompt the Help Menu'
		});
	}	
	
	async run(message, args){
        if (message.author.equals(Bot.user)) return;
		if(message.channel.type === "dm") return;
		if(Testing === true) return;
		
        let Bot_Embed = new Discord.RichEmbed()
            .setTitle("Lyaboo")
            //.setAuthor("Lyawoo#9768", "https://cdn.discordapp.com/avatars/417835827700301836/5596ef1137c7083eb212d0d85072f63e.png?size=256")
            .setColor("6e00ff")
            .setDescription("Bot Process brought to you by the Lyaboo Community.")
            .setFooter("Bot Developer: Lyawoo#9768", "https://cdn.discordapp.com/avatars/513448452987027478/0693b8c4738c0da560cce2ce0aa97802.png?size=256")
            .setThumbnail("https://cdn.discordapp.com/avatars/513448452987027478/0693b8c4738c0da560cce2ce0aa97802.png?size=256")
            .setTimestamp()
            .setURL("http://www.discordapp.com/invite/SgZu58W")
            .addField("Bot Library", "Discord.Js")
            .addField("Bot Server", "http://www.discordapp.com/invite/SgZu58W")
            .addField("Bot Prefix", `'${Prefix}'`)
            .addField("Bot Version", `${Version}`);
           // .addBlankField(true);
       	message.author.send(Bot_Embed); 
		return;
	}
}

module.exports = HelpCommand