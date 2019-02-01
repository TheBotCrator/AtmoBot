const Commando = Depends.Commando
const Discord = Depends.Discord

class RStopCommand extends Commando.Command { 
	constructor(client){
		super(client, {
			name: 'rstop',
			group: 'roles',
			memberName: "rstop",
			description: 'Will stop the Rainbow Color Process.'
		});
	}	
	
	async run(message, args){
        if (message.author.equals(Settings.Bot.user)) return;
		if (message.channel.type === "dm") return;
		if (Settings.Testing === true) return;
		
		if (message.member.hasPermission('ADMINISTRATOR')) {
			Stop.push(message.guild.id);
			return message.channel.send(":white_check_mark: Successfully Stopped Rainbow Roles.")
		} else {
			message.channel.send(":x: Missing Permissions 'ADMINISTRATOR'")
			return;
		}
	}
}

module.exports = RStopCommand
