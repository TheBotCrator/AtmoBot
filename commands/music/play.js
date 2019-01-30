const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const { Util } = require('discord.js')

const YTDL = require("ytdl-core")
const Search = require("yt-search")
const Info = require("youtube-info")

async function HandleVideo(Video, Message, VoiceChannel, Playlist = false) {
	const Queue = Records[Message.guild.id].Music;
	console.log(Video);
	
	const Song = {
		thumbnail: Video.thumbnailUrl,
		id: Video.videoId,
		title: Util.escapeMarkdown(Video.title),
		url: `https://www.youtube.com/watch?v=${Video.videoId}`,
		requester: Message.author
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
		let Embed = new Discord.RichEmbed()
		.setColor("#27037e")
		.setTitle("Lyaboo Music")
		.setThumbnail(`${Song.thumbnail}`)
		.addField("Song Name", `${Song.title}`, true)
		.addField("Song Link", `${Song.url}`, true)
		.addField("Song Requester", `${Song.requester}`, true);
		
		Records[Message.guild.id].Music.Queue.push(Song);
		console.log(Records[Message.guild.id].Music.Queue);
		if (Playlist) return undefined;
			else return Message.channel.send(`:musical_note: A song has been added to the queue!`, Embed);
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

	const Dispatcher = Queue.Connection.playStream(YTDL(Song.url, { filter: "audio", highWaterMark: 1024 * 1024 * 10 }, { passes: 5 }), { bitrate: 192000 })
		.on('end', Reason => {
			if (Reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(Reason);
			Queue.Queue.shift();
			Play(Guild, Queue.Queue[0]);
		})
		.on('error', Error => console.error(Error));
	Dispatcher.setVolumeLogarithmic(Queue.Volume / 5);
	
	let Embed = new Discord.RichEmbed()
		.setColor("#27037e")
		.setTitle("Lyaboo Music")
		.setThumbnail(`${Song.thumbnail}`)
		.addField("Song Name", `${Song.title}`, true)
		.addField("Song Link", `${Song.url}`, true)
		.addField("Song Requester", `${Song.requester}`, true);
		
	Queue.Text.send(`:musical_note: Now playing: **${Song.title}** Requested by: **${Song.requester}**`);
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

		if (YTDL.validateURL(URL)) {
			var ID = YTDL.getVideoID(URL)
			Info(ID, function(Err, Results) {
				if (Error) throw new Error(Err);
				return HandleVideo(Results, message, VoiceChannel)
			})
			
		} else {
			Search(SearchString, async function(Error, Results) {
				let Count = 0
				let Videos = Results.videos.slice(0, 10)
				let Embed = new Discord.RichEmbed()
				.setColor("#27037e")
				.setThumbnail(message.guild.iconURL)
				.setDescription(`${Videos.map(Videos2 => `**${++Count} -** ${Videos2.title}`).join('\n')}`)
				.setTitle(":musical_note: Song Selection :musical_note:");
				message.channel.send(`Please provide a value to select one of the search results ranging from 1-10.`, Embed)
				try {
					var Response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, { maxMatches: 1, time: 10000, errors: ['time'] });
				} catch (err) {
					console.error(err);
					return message.channel.send(':x: No or invalid value entered, cancelling video selection.');
				}
				const Index = parseInt(Response.first().content);
				Info(Videos[Index - 1].videoId, function(Err, Results){
					if (Error) throw new Error(Err);
					return HandleVideo(Results, message, VoiceChannel)
				});
			})
		}	
	}
}

module.exports = PlayCommand
