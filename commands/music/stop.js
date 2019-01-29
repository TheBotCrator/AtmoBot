const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const YTDL = require("ytdl-core")

function Play(connection, message) {
    var Server = Records[message.guild.id];
    Server.dispatcher = connection.playStream(YTDL(Server.queue[0], { filter: "audioonly" }));
    Server.queue.shift();
    Server.dispatcher.on("end", function () {
        if (Server.queue[0]) Play(connection, message);
        else connection.disconnect();
    })
}

class StopCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: "stop",
            description: 'Will Stop a youtube link playing in a Voice Channel.'
        });
    }

    async run(message, args) {
        const Args = message.content.split(" ")
        if (message.author.equals(Bot.user)) return;
        if (message.channel.type === "dm") return;
        if (Testing === true) return;

        var Server = Records[message.guild.id];
        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    }
}

module.exports = StopCommand