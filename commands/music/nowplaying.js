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
		return message.channel.send(`:musical_note: Now playing: **${Queue.Queue[0].title}** Requested by: **${Queue.Queue[0].requester}**`);
    }
}

module.exports = StopCommand
