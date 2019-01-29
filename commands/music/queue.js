const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const YTDL = require("ytdl-core")

class StopCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: "queue",
            description: 'Will Show the current list of youtube links playing in a Voice Channel.'
        });
    }

    async run(message, args) {
        const Args = message.content.split(" ")
        if (message.author.equals(Bot.user)) return;
        if (message.channel.type === "dm") return;
        if (Testing === true) return;

        var Queue = Records[message.guild.id].Music;
	    if (!Queue) return message.channel.send(':x: There is nothing playing.');
		
	    let Embed = new Discord.RichEmbed()
	    .setTitle("Song Queue")
	    .setDecription(`:musical_note:\n${Queue.Queue.map(song => `**-** ${song.title}`).join('\n')}`)
	    .addField("Now Playing", `${Queue.Queue[0].title}`)
	    return message.channel.send("Current Songs Playing Now on Lyaboo", Embed)
    }
}

module.exports = StopCommand
