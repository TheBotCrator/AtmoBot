const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const Database = require('quick.db');

async function Setup(Guild) { 
	let Fetch = await Database.fetch(`${Guild.id}`)
	if (Fetch === null) {
		Database.set(`${Guild.id}`, { })
		Database.push('${Guild.id}.USEABLE', false)
		Database.push('${Guild.id}.CHANNEL', 0)
		Database.push('${Guild.id}.RECORD', 0)
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
			Setup(message.guild)
			
			let GuildDB = await Database.get(`${Guild.id}`)
			if (!GuildDB === null) {
				if (Args[1] === "true") {
					Database.set('${Guild.id}.USEABLE', true)
				} else {
					Database.set('${Guild.id}.USEABLE', false)
				};
				
				let SuggestionChannel = message.guild.channels.get(Args[2]);
				let SuggestionLogs = message.guild.channels.get(Args[3]);
				if (!SuggestionChannel) return message.channel.send(":x: Suggestions Channel Id Invalid!")
				if (!SuggestionLogs) return message.channel.send(":x: Suggestions Log Channel Id Invalid!");
				
				Database.set('${Guild.id}.CHANNEL', Args[2])
				Database.set('${Guild.id}.RECORD', Args[3])
				
						
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
	
