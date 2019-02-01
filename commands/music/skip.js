const Commando = Depends.Commando
const Discord = Depends.Discord


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
        if (message.author.equals(Settings.Bot.user)) return;
        if (message.channel.type === "dm") return;
        if (Settings.Testing === true) return;
		
		var Queue = Records[message.guild.id].Music;
		
        if (!message.member.voiceChannel) return message.channel.send(':x: You are not in a voice channel!');
		if (!Queue) return message.channel.send(':x: There is nothing playing that I could skip for you.');
		Queue.Connection.dispatcher.end('Skip command has been used!');
		return undefined;
    }
}

module.exports = SkipCommand