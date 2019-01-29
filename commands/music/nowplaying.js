const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const YTDL = require("ytdl-core")

class StopCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'np',
            group: 'music',
            memberName: "np",
            description: 'Will Show the current youtube link playing in a Voice Channel.'
        });
    }

    async run(message, args) {
        const Args = message.content.split(" ")
        if (message.author.equals(Bot.user)) return;
        if (message.channel.type === "dm") return;
        if (Testing === true) return;

        var Queue = Records[message.guild.id].Music;
       
	if (!Queue) return message.channel.send('There is nothing playing.');
	    let Embed = new Discord.RichEmbed()
	    .setTitle(":musical_note: Current Song :musical_note:")
	    .setColor()
	    .addField("Now Playing", `${Queue.Queue[0].title}`)
	    .addField("Requested By", `${Queue.Queue[0].requester}`);
	return message.channel.send(Embed);
    }
}

module.exports = StopCommand
