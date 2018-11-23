const Commando = require('discord.js-commando')
const Discord = require('discord.js')

class BanCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'utility',
            memberName: "ban",
            description: 'Will Ban a member of a server.'
        });
    }

    async run(message, args) {
        const Args = message.content.split(" ")
        let logs = message.guild.channels.find("name", "lyaboo-logs");
        if (!logs) return message.channel.send("X: Could not find the 'lyaboo-logs'+ channel.");

        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(Args[0]));
        if (!bUser) return message.channel.send("X: User isnt detected, can not ban null.")
        if (bUser.id === Bot.user.id) return message.channel.send("X: Lyaboo Bot User detected, can not ban itself.")
        let bReason = Args.join(" ").slice(22);
        if (!bReason) bReason = "No Reason Provided.";
        if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("X: User has Sufficient Permissions, unbannable.")

        let logsEmbed = new Discord.RichEmbed() // Master is MessageEmbed
            .setTitle("User Banned")
            .setFooter("User Ban Logs")
            .setColor("#ff0000")
            .setTimestamp()
            .addField("Banned User:", `${user}, ID: ${user.id}`)
            .addField("Reason:", reason)
            .addField("Moderator:", `${message.author}, ID: ${message.author.id}`)
            .addField("Time:", message.createdAt)
            .addField("Channel:", message.channel)

        let banchannel = message.guild.channels.find(`name`, "moderator-log");
        if (!banchannel) return message.channel.send("Не могу найти канал для отправи репортов");

        message.guild.member(bUser).ban(breason);
        message.delete();
        logs.send(logsEmbed);
    }
}

module.exports = BanCommand