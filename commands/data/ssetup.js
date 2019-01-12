const Commando = require('discord.js-commando')
const Discord = require('discord.js')

class SSetupCommand extends Commando.Command { 
	constructor(client){
		super(client, {
			name: 'ssetup',
			group: 'data',
			memberName: "ssetup",
			description: 'Setup for the Suggestions will begin.'
		});
	}	
	
	async run(message, args){
        if (message.author.equals(Bot.user)) return;
		if (message.channel.type === "dm") return;
		if (Testing === true) return;
		
		if (message.member.hasPermission('ADMINISTRATOR')) {
			let Args = message.content.split(" ")

			if (!Records[message.guild.id]) { 
				Records[message.guild.id] = { }
			};
			// ly!ssetup true channel-nameid channel-logid 
			
			let TableFunction = Records[message.guild.id]
			if (!TableFunction.Suggestions) {
				Records[message.guild.id].Suggestions = { }
			};
			
			if (Args[1] === true) {
				Records[message.guild.id].Suggestions.USEABLE = true
			} else {
				Records[message.guild.id].Suggestions.USEABLE = false
			};
			
			let SuggestionChannel = Message.guild.channels.get(Args[2]);
			let SuggestionLogs = Message.guild.channels.get(Args[3]);
			if (!SuggestionChannel) return message.channel.send(":x: Suggestions Channel Id Invalid!")
			if (!SuggestionLogs) return message.channel.send(":x: Suggestions Log Channel Id Invalid!");
			
			Records[message.guild.id].Suggestions.CHANNEL = Args[2]
			Records[message.guild.id].Suggestions.RECORD = Args[2]	
			
			let RichEmbed = new Discord.RichEmbed()
				.setTitle("Suggestion Setup Complete!")
				.setThumbnail(Member.user.displayAvatarURL)
				.setColor("#27037e")
				.setFooter(`Brought to you by Lyaboo Development.`)
				.addField("ENABLED", `${Args[1]}`)
				.addField("NORMAL CHANNEL", `${Args[2]}`)
				.addField("LOG CHANNEL", `${Args[3]}`)
				.setTimestamp();
			message.channel.send(":white_check_mark: Setup Successfully.")
			message.channel.send(RichEmbed)
		} else {
			message.channel.send(":x: Missing Permissions 'ADMINISTRATOR'")
			return;
		}
	}
}

module.exports = SSetupCommand
	