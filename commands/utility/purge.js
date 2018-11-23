const Commando = require('discord.js-commando')
const Discord = require('discord.js')

class PurgeCommand extends Commando.Command { 
	constructor(client){
		super(client, {
			name: 'purge',
			group: 'utility',
			memberName: "purge",
			description: 'Will Bulk Delete Messages in a Channel.'
		});
	}	
	
    async run(message, args) {
        const Args = message.content.split(" ")
        const deleteCount = parseInt(Args[1], 10);
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("X: Invalid Permissions to Kick.");

        if (!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("X: Please provide a number between 2 and 100 for the number of messages to delete.");

        const fetched = await message.channel.fetchMessages({ limit: deleteCount });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`X: Couldn't delete messages because of: ${error}`));

        let purgeEmbed = new Discord.RichEmbed()
            .setAuthor("Purge")
            .setColor("#27037e")
            .addField("Executor", `<@${message.author.id}>`)
            .addField("Purged", `${Args[1]}`)
            .setFooter(`Bot Version: ${Version}`, Bot.user.displayAvatarURL);

        let purgeChannel = message.guild.channels.find(`name`, "lyaboo-logs");
        if (!purgeChannel) return message.channel.send("Can't find lyaboo-logs channel.");

        purgeChannel.send(purgeEmbed);
	}
}

module.exports = PurgeCommand