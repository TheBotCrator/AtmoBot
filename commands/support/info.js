const Commando = Depends.Commando
const Discord = Depends.Discord

class BotCommand extends Commando.Command { 
	constructor(client){
		super(client, {
			name: 'info',
			group: 'support',
			memberName: "info",
			description: 'Will return the Bot Information to User.'
		});
	}	
	
	async run(message, args){
        if (message.author.equals(Settings.Bot.user)) return;
		if (message.channel.type === "dm") return;
		if (Settings.Testing === true) return;
		
        let FirstEmbed = new Discord.RichEmbed()
            .setAuthor("Lyaboo", "https://cdn.discordapp.com/avatars/513448452987027478/f63754a4f5e489cf7c03a0d797ca70b3.png?size=256")
            .setColor("6e00ff")
	    .setThumbnail("https://cdn.discordapp.com/avatars/513448452987027478/f63754a4f5e489cf7c03a0d797ca70b3.png?size=256")
            .setFooter("Bot Developer: Pharaoh#1254", "https://cdn.discordapp.com/avatars/417835827700301836/808cb0b5521609d1f65d9938a6c790cb.png?size=256")
            .addField("Bot Library", "Discord.Js")
            .addField("Bot Prefix", `'${Settings.Prefix}'`)
	    .addField("Bot Commands", `To view Bot Commands, Please Say '${Settings.Prefix}help'`)
	    .addField("Bot Version", `${Settings.Version}`);
		
	let SecondEmbed = new Discord.RichEmbed()
		.setAuthor("Lyaboo Dedications", "https://cdn.discordapp.com/avatars/513448452987027478/f63754a4f5e489cf7c03a0d797ca70b3.png?size=256")
		.setTimestamp()
		.addField("Clickbait", "Owned by Forgetful#6666")
		.addField("The Frosty Nation", "Owned by  #5243")
		.setFooter("Want to see your Discord Added? DM Pharaoh#1254", "https://cdn.discordapp.com/avatars/417835827700301836/808cb0b5521609d1f65d9938a6c790cb.png?size=256");    
	   
	   message.author.send(FirstEmbed); 
	   message.author.send(SecondEmbed);
	   message.channel.send(":white_check_mark: Please Check Direct Messages for More Information. If you didn't receive any messages, it's because your DM's are disabled.")
	   return;
	}
}

module.exports = BotCommand
