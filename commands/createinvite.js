const Commando = require('discord.js-commando')
const Discord = require('discord.js')

class InviteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'createinvite',
            group: 'info',
            memberName: "createinvite",
            description: 'Will return the Server Invite to User.'
        });
    }

    async run(message, args) {
        if (message.author.equals(Bot.user)) return;
        if (message.channel.type === "dm") return;
        if (Testing === true) return;

        let Bot_Embed = new Discord.RichEmbed()
            .setTitle("Sector Invite")
            .setColor("6e00ff")
            .setThumbnail("https://cdn.discordapp.com/avatars/513448452987027478/0693b8c4738c0da560cce2ce0aa97802.png?size=256")
            .setTimestamp()
            .addField("Invite", "https://discord.gg/K8V8zJ3");
        message.author.send(Bot_Embed);
        return;
    }
}

module.exports = InviteCommand