const Commando = require('discord.js-commando')
const Discord = require('discord.js')

class KickCommand extends Commando.Command { 
	constructor(client){
		super(client, {
			name: 'kick',
			group: 'utility',
			memberName: "kick",
			description: 'Will Kick a User from the Server.'
		});
	}	
	
    async run(message, args) {
        const Args = message.content.split(" ")
		if(message.author.equals(Bot.user)) return;
		if(message.channel.type === "dm") return;
		if(Testing === true) return;
		
		let Member = message.mentions.members.first() || message.guild.members.get(Args[1]);
	    if(!Member) return message.channel.send(":warning: Please mention a valid member of this server");
	    if(!Member.kickable) return message.channel.send(":warning: I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

	    let Reason = Args[2];
	    if(!Reason) Reason = "No reason provided";

	    await Member.kick(Reason).catch(error => message.channel.send(`:warning: Sorry ${message.author} I couldn't kick because of : ${error}`));
	    return message.channel.send(`:heavy_check_mark: ${Member.user.tag} has been kicked by ${message.author.tag} for: ${Reason}`);
	}
}

module.exports = KickCommand