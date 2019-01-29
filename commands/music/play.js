const Commando = require('discord.js-commando')
const { Util } = require('discord.js')
const YTDL = require("ytdl-core")
const SimpleAPI = require('simple-youtube-api');
const Youtube = new SimpleAPI(API)


async function HandleVideo(Video, Message, VoiceChannel, Playlist = false) {
	const Queue = Records[Message.guild.id].Music;
	console.log(Video);
	
	const Song = {
		id: Video.id,
		title: Util.escapeMarkdown(Video.title),
		url: `https://www.youtube.com/watch?v=${Video.id}`
	};
	
	if (!Queue) {
		Records[Message.guild.id].Music = {
			Text: Message.channel,
			Voice: VoiceChannel,
			Connection: null,
			Queue: [],
			Volume: 5,
			Playing: true
		}	
		Records[Message.guild.id].Music.Queue.push(Song);

		try {
			var Connection = await VoiceChannel.join();
			Records[Message.guild.id].Music.Connection = Connection;
			Play(Message.guild, Records[Message.guild.id].Music.Queue[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			Records[Message.guild.id].Music.delete(Message.guild.id);
			return Message.channel.send(`:warning: I could not join the voice channel: ${error}`);
		}
	} else {
		Records[Message.guild.id].Music.Queue.push(Song);
		console.log(Records[Message.guild.id].Music.Queue);
		if (Playlist) return undefined;
		else return Message.channel.send(`:musical_note: **${Song.title}** has been added to the queue!`);
	}
	return undefined;
}
async function Play(Guild, Song) {
	const Queue = Records[Guild.id].Music;

	if (!Song) {
		Queue.Voice.leave(); 
		delete Records[Guild.id].Music;
		return;
	}
	console.log(Queue.Queue);

	const Dispatcher = Queue.Connection.playStream(YTDL(Song.url, { filter: "audio" }, { passes: 2 }))
		.on('end', Reason => {
			if (Reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(Reason);
			Queue.Queue.shift();
			Play(Guild, Queue.Queue[0]);
		})
		.on('error', Error => console.error(Error));
	Dispatcher.setVolumeLogarithmic(Queue.Volume / 5);

	Queue.Text.send(`:musical_note: Start playing: **${Song.title}**`);
}



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

        const VoiceChannel = message.member.voiceChannel;
		if (!VoiceChannel) return message.channel.send(":warning: I'm sorry but you need to be in a voice channel to play music!");
		
		const permissions = VoiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send(':warning: I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send(':warning: I cannot speak in this voice channel, make sure I have the proper permissions!');
		}
		
		const SearchString = Args.slice(1).join(' ');
		const URL = Args[1] ? Args[1].replace(/<(.+)>/g, '$1') : '';

		if (URL.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const Playlist = await Youtube.getPlaylist(URL);
			const Videos = await Playlist.getVideos();
			for (const Video of Object.values(Videos)) {
				const Video2 = await Youtube.getVideoByID(Video.id);
				await HandleVideo(Video2, message, VoiceChannel, true);
			}
			return message.channel.send(`Playlist: **${Playlist.title}** has been added to the queue!`);
		} else {
			try {
				var Video = await Youtube.getVideo(url);
			} catch (error) {
				try {
					var Videos = await Youtube.searchVideos(SearchString, 10);
					let Count = 0;
					message.channel.send(`
__**Song selection:**__

${Videos.map(Videos2 => `**${++Count} -** ${Videos2.title}`).join('\n')}

Please provide a value to select one of the search results ranging from 1-10.
					`);

					try {
						var Response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send(':x: No or invalid value entered, cancelling video selection.');
					}
					const Index = parseInt(Response.first().content);
					var Video = await Youtube.getVideoByID(Videos[Index - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send(':x: I could not obtain any search results.');
				}
			}
			return HandleVideo(Video, message, VoiceChannel);
	}
    }
}

module.exports = PlayCommand
