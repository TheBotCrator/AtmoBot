// Coded by Christopher H::Lyawoo#9768

global.Depends = {
    Discord: require('discord.js'), // Library for Hosting Bot.
    Commando: require('discord.js-commando'), // Library Extension for Hosting Bot.
    Timeout: require('foreach-timeout'), // Used for Rainbow Roles.

    // Youtube and Music Dependencies
    YTDL: require('ytdl-core'), // To Host Music for Youtube.
    Search: require('yt-search'), // To Search in Various of Numbers on Youtube.
    Info: require('youtube-info'), // To get Info about a Youtube Song.
    Playlist: require('youtube-playlist') // To get a playlist of Songs from Youtube.
}

// Getting Bot Version Information
global.Settings = {
    Name: "Lyaboo", // Name of Bot.
    Version: "0.1.621", // Version of the Bot.
    Testing: false, // Testing State of the Bot.
    Prefix: "=", // Prefix of the Bot.
    Status: "", // Status of the Bot.
    DevServer: {
        GuildId: "521782616563646465", // Guild Number for Home Bot Discord.
        AnnouncementChannel: "521841249963999232", // Announcements Channel for Discord.
        Developer: "417835827700301836" // Bot Developer for Lyaboo.
    },
    DevKeys: {
        Login: process.env.BOT_TOKEN, // Used for Accessing the Bot.
        Youtube: process.env.YOUTUBE_TOKEN // Used for Getting Youtube API stuff.
    },
    Bot: new Depends.Command.Client({ commandPrefix: Settings.Prefix })
}
global.Records = { // Used for Storing Temporary Information.

}

global.Colors = ["FF0D00", "FF2800", "FF3D00", "FF4F00", "FF5F00", "FF6C00", "FF7800", "FF8300", "FF8C00", "FF9500", "FF9E00", "FFA500", "FFAD00", "FFB400", "FFBB00", "FFC200", "FFC900", "FFCF00", "FFD600", "FFDD00", "FFE400", "FFEB00", "FFF200", "FFFA00", "F7FE00", "E5FB00", "D5F800", "C6F500", "B7F200", "A8F000", "98ED00", "87EA00", "74E600", "5DE100", "41DB00", "1DD300", "00C618", "00BB3F", "00B358", "00AC6B", "00A67C", "009E8E", "028E9B", "06799F", "0969A2", "0C5DA5", "0E51A7", "1047A9", "133CAC", "1531AE", "1924B1", "1F1AB2", "2A17B1", "3415B0", "3C13AF", "4512AE", "4E10AE", "560EAD", "600CAC", "6A0AAB", "7608AA", "8506A9", "9702A7", "AD009F", "BC008D", "C7007D", "D0006E", "D8005F", "DF004F", "E7003E", "EF002A", "F80012"];
global.Stop = [ ]

// Getting Bot Registry
Settings.Status = `${Settings.Prefix}help | Sector Welcome Assistant. ${Settings.Version}`
Settings.Bot.registry
    .registerGroup('support', 'Support Commands')
	.registerGroup('roles', 'Rainbow Commands')
	.registerGroup('settings', 'Settings Commands')
	.registerGroup('music', 'Vibes Commands')
	//.registerGroup('moderation', "Moderation Commands")
    .registerGroup('utilitizes', 'Developer Commands')
    .registerCommandsIn(__dirname + "/commands");

// Getting Rainbow Functions
async function Color() {
    Depends.Timeout(Colors, (Color) => {
        Settings.Bot.guilds.forEach((guild) => {
            if (!Stop.includes(guild.id)) {
                let role = guild.roles.find('name', 'Certified Customary');
                if (role && role.editable)
                    role.setColor(Color);
            }
        })
    }, 1500).then(Color);
}

// Getting Bot Functions
Settings.Bot.on("guildCreate", Guild => {
    console.log(`New guild joined: ${Guild.name} (id: ${Guild.id}). This guild has ${Guild.memberCount} members!`);
    if (Settings.Testing === false) Bot.user.setActivity(`${Settings.Status}`, {type: "STREAMING"})
});
Settings.Bot.on("guildDelete", Guild => {
    console.log(`I have been removed from: ${Guild.name} (id: ${Guild.id})`);
    if (Settings.Testing === false) Bot.user.setActivity(`${Settings.Status}`, {type: "STREAMING"})
});

Settings.Bot.on("guildMemberAdd", Member => {
    console.log(`${Member.user.username} has joined ${Member.guild.id}`);

    const Role = Member.guild.roles.find(r => r.name === "Sector Noobs");
    Member.addRole(Role)

    const welcomeChannel = Member.guild.channels.find('name', 'general');
    if (welcomeChannel) {
		let WelcomeMessage = `${Member.user}`
		let WelcomeEmbed = new Depends.Discord.RichEmbed()
            .setTitle("Member has joined!")
            .setThumbnail(Member.user.displayAvatarURL)
            .setDescription(`Welcome ${Member.user} to ${Member.guild.name}. Please remember to read <#521863469482377217> and to be active to achieve roles. We are a community of people who simply try to have fun. If you have any questions, please see an Moderator or a Person of Higher Role in the Server. To make a suggestion, please see <#522104070647971840> and note that its a Beta feature in progress.`)
            .setColor("#27037e")
            .setFooter(`You are the ${Member.guild.memberCount} member to joined.`)
            .setTimestamp();
		welcomeChannel.send(WelcomeMessage, WelcomeEmbed)
    }
});
Settings.Bot.on("guildMemberRemove", Member => {
    console.log(`${Member.user.username} has left ${Member.guild.id}`);
    const leaveChannel = Member.guild.channels.find('name', 'general');
    if (leaveChannel) {
        let LeaveEmbed = new Depends.Discord.RichEmbed()
            .setTitle("Member has left!")
            .setThumbnail(Member.user.displayAvatarURL)
            .setDescription(`Sad to see you leave ${Member.user}! We hope you enjoyed your stay at ${Member.guild.name}.`)
            .setColor("#27037e")
            .setFooter(`Member Count is at ${Member.guild.memberCount}.`)
            .setTimestamp();
        leaveChannel.send(LeaveEmbed)
    }
});

Settings.Bot.on("message", Message => {
	if (Message.author.equals(Bot.user)) return;
	if (Message.channel.type === "dm") return;
	if (Message.content.startsWith(Prefix)) return;
	if (Settings.Testing === true) return;
	
	// Suggestions Portion
	if (!Records[Message.guild.id]) return;
	if (!Records[Message.guild.id].Suggestions) return; 
	
	let RecordChannel = Records[Message.guild.id].Suggestions.RECORD
	let SuggestionChannel = Records[Message.guild.id].Suggestions.CHANNEL
	if (!RecordChannel) return;
    if (!SuggestionChannel) return;
	
	if (Number(Message.channel.id) === Number(SuggestionChannel)){
        Message.delete(100)
		if (!Records[Message.guild.id].Suggestions.USEABLE === true) return Message.channel.send(`:Warning: ${Message.author} This Server is Currently not Accepting Suggestions!`); 
		
		let FirstEmbed = new Depends.Discord.RichEmbed()
		.setColor("6e00ff")
		.setTimestamp()
		.addField("Beta Feature", "Thank you for testing this Feature! Your data has been recorded, and staff will review soon! These messages will disappear in a few seconds.");
		
		let SecondEmbed = new Depends.Discord.RichEmbed()
		.setColor("6e00ff")
		.setTimestamp()
		.setFooter(`Posted by ${Message.author.username} | #${Message.author.discriminator}`, Message.author.displayAvatarURL)
		.setAuthor(`Feedback #${Message.member.user.id}`, Message.guild.iconURL)
		.addField('Description', `${Message.content}`);        
							
		let ActualChannel = Settings.Bot.channels.get(RecordChannel)
		if (ActualChannel){ 
			ActualChannel.send(SecondEmbed); 
		} else { 
			return Message.channel.send(":x: Cannot Log Suggestions due to Error!")
		}

		Message.channel.send(FirstEmbed).then(Message => Message.delete(5000));
				
	} else {
		console.log("Something went wrong :thonk:")
	}	
});
Settings.Bot.on("ready", function () {
    console.log(`${Settings.Name} has loaded and is ready for Usage. Online at ${Settings.Bot.guilds.size}`);
    if (Settings.Testing === false) {
        Settings.Bot.user.setActivity(`${Settings.Status}`, {type: "STREAMING"})
    };
    if(Settings.Testing === true){
        Settings.Bot.user.setStatus("idle");
        Settings.Bot.user.setActivity("Maintenance Mode On, Will Be Back Soon.")
        return;
    }
    Settings.Bot.guilds.forEach((guild) => {
		if (!Records[guild.id]) {
			Records[guild.id] = {
				
			}	
		}	
	})	
    Color();
});

Settings.Bot.login(Settings.DevKeys.Login)