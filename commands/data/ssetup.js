const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const Database = require('quick.db');

async function Setup() { 
	let Fetch = await Database.get(`Suggestions`)
	if (Fetch === null) {
		Database.set(`Suggestions`, { })
		Database.push('Suggestions.USEABLE', false)
		Database.push('Suggestions.CHANNEL', 0)
		Database.push('Suggestions.RECORD', 0)
		return
	}	
}

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
			Setup()
			
			let GuildDB = await Database.get(`Suggestions`)
			if (!GuildDB === null) {
				if (Args[1] === "true") {
					Database.set('Suggestions.USEABLE', true)
				} else {
					Database.set('Suggestions.USEABLE', false)
				};
				
				let SuggestionChannel = message.guild.channels.get(Args[2]);
				let SuggestionLogs = message.guild.channels.get(Args[3]);
				if (!SuggestionChannel) return message.channel.send(":x: Suggestions Channel Id Invalid!")
				if (!SuggestionLogs) return message.channel.send(":x: Suggestions Log Channel Id Invalid!");
				
				Database.set('Suggestions.CHANNEL', Args[2])
				Database.set('Suggestions.RECORD', Args[3])
				
						
				let RichEmbed = new Discord.RichEmbed()
				.setTitle("Suggestion Setup Complete!")
				.setThumbnail(message.member.user.displayAvatarURL)
				.setColor("#27037e")
				.setFooter(`Brought to you by Lyaboo Development.`)
				.addField("ENABLED", `${Args[1]}`)
				.addField("NORMAL CHANNEL", `${Args[2]}`)
				.addField("LOG CHANNEL", `${Args[3]}`)
				.setTimestamp();
				message.channel.send(":white_check_mark: Setup Successfully.");
				return message.channel.send(RichEmbed);
			}	
		} else {
			message.channel.send(":x: Missing Permissions 'ADMINISTRATOR'")
			return;
		}
	}
}

module.exports = SSetupCommand
	
