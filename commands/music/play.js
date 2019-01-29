const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const YTDL = require("ytdl-core")

function Play(connection, message) {
    var Server = Records[message.guild.id];
    Server.dispatcher = connection.playStream(YTDL(Server.queue[0], { quality: "highestaudio", filter: "audioonly" }));
    Server.queue.shift();
    Server.dispatcher.on("end", function () {
        if (Server.queue[0]) Play(connection, message);
        else connection.disconnect();
    })
}
//Fixing

class PlayCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: "play",
            description: 'Will Play a youtube link in a Voice Channel.'
        });
    }

    async run(message, args) {
        const Args = message.content.split(" ")
        if (message.author.equals(Bot.user)) return;
        if (message.channel.type === "dm") return;
        if (Testing === true) return;

        if (!Args[1]) {
            message.channel.send("Please specify a link");
            return
        }

        let Validation = YTDL.validateURL(Args[1])
        if (!Validation) return message.channel.send(":warning: Song URL Invalid, please check again.")
	
        if (!message.member.voiceChannel) {
            message.channel.send("I think it may work better if you are in a voice channel!");
        }

        if (!Records[message.guild.id]) {
			Records[message.guild.id] = {
				
            }
        }
		if (!Records[message.guild.id].queue) {
			Records[message.guild.id].queue = [ ]
		}	
		
        var Server = Records[message.guild.id];

        Server.queue.push(Args[1]);
        message.channel.send("Your song of choice is on the queue. ")
        if (!message.member.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
            Play(connection, message);
        })
    }
}

module.exports = PlayCommand
