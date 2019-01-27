const Commando = require('discord.js-commando');
const Discord = require('discord.js');

class ServerCommand extends Commando.Command { 
	constructor(client){
		super(client, {
			name: 'server',
			group: 'info',
			memberName: "server",
			description: 'Will return information about the Server.'
		});
	}	
	
	async run(message, args){
        if (message.author.equals(Bot.user)) return;
		if (message.channel.type === "dm") return;
		if (Testing === true) return;
		
		let GuildCreated = message.guild.createdAt.toString()
		let Embed = new Discord.RichEmbed()
		.setColor("#27037e")
		.setThumbnail(message.guild.iconURL)
		.setDescription(`:white_small_square: ID:** ${message.guild.id}**\n:white_small_square: Owner: **${message.guild.owner.user.username + '#' + message.guild.owner.user.discriminator}**\n:white_small_square: Location: **${message.guild.region}**\n:white_small_square: Server Creation: **${guildCreated.slice(0, guildCreated.length - 29)}**\n:white_small_square: Users: **${message.guild.memberCount} **(online ${message.guild.presences.findAll('status', 'online').length}, idle ${message.guild.presences.findAll('status', 'idle').length},busy ${message.guild.presences.findAll('status', 'dnd').length}, invis ${message.guild.memberCount - message.guild.presences.array().length})\n:white_small_square: Roles: **${message.guild.roles.array().length}**\n:white_small_square: Channels: **${message.guild.channels.array().length}**  (text ${message.guild.channels.findAll('type', 'text').length}, voice ${message.guild.channels.findAll('type', 'voice').length})`)
		message.channel.send(`Information about **${message.guild.name}**:`, Embed)
	}
}

module.exports = ServerCommand
	
