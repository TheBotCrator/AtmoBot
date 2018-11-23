const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const YTDL = require("ytdl-core")

function Play(connection, message) {
    var Server = servers[message.guild.id];
    Server.dispatcher = connection.playStream(YTDL(Server.queue[0], { filter: "audioonly" }));
    Server.queue.shift();
    Server.dispatcher.on("end", function () {
        if (Server.queue[0]) Play(connection, message);
        else connection.disconnect();
    })
}

class SkipCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: "skip",
            description: 'Will Skip a youtube link playing in a Voice Channel.'
        });
    }

    async run(message, args) {
        const Args = message.content.split(" ")
        if (message.author.equals(Bot.user)) return;
        if (message.channel.type === "dm") return;
        if (Testing === true) return;

        var Server = Servers[message.guild.id];
        if (Server.dispatcher) Server.dispatcher.end();
    }
}

module.exports = SkipCommand