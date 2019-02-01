const Commando = Depends.Commando
const Discord = Depends.Discord

class RStartCommand extends Commando.Command { 
	constructor(client){
		super(client, {
			name: 'rstart',
			group: 'roles',
			memberName: "rstart",
			description: 'Will Start the Rainbow Color Process.'
		});
	}	
	
	async run(message, args){
        if (message.author.equals(Settings.Bot.user)) return;
		if (message.channel.type === "dm") return;
		if (Settings.Testing === true) return;
		
		if (message.member.hasPermission('ADMINISTRATOR')) {
			Stop.splice(Stop.indexOf(message.guild.id), 1);
			return message.channel.send(":white_check_mark: Successfully Started Rainbow Roles.")
		} else {
			message.channel.send(":x: Missing Permissions 'ADMINISTRATOR'")
			return;
		}
	}
}

module.exports = RStartCommand
