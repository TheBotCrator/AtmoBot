// Coded by Christopher H::Lyawoo#9768

// Getting Bot Dependencies
global.Depends = {
    Discord: require('discord.js'), // Library for Hosting Bot.
    Commando: require('discord.js-commando'), // Library Extension for Hosting Bot.
    Timeout: require('foreach-timeout'), // Used for Rainbow Roles.
	Pastee: require("pastee"), // Used for Maintaining Data exceed overing Character Limits.
	Mongoose: require("mongoose"), // Used for Storing Data
	
    // Youtube and Music Dependencies
    YTDL: require('ytdl-core'), // To Host Music for Youtube.
    Search: require('yt-search'), // To Search in Various of Numbers on Youtube.
    Info: require('youtube-info'), // To get Info about a Youtube Song.
    Playlist: require('youtube-playlist') // To get a playlist of Songs from Youtube.
}

// Getting Bot Settings Information
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
        Login: process.env.BOT_TOKEN // Used for Accessing the Bot.
    },
	Schemas: {
		Level: require(__dirname + "/structs/Schemas/levelSchema.js"),
		Suggestion: require(__dirname + "/structs/Schemas/suggestionSchema.js")
	},
    Bot: "", // Client 
	Connection: `mongodb://${process.env.MonUSERTOKEN}:${process.env.MonPASSTOKEN}@ds024748.mlab.com:24748/lyaboo_server` // Used for the Database
}
global.Records = { // Used for Storing Temporary Information.

}

global.Colors = ["FF0D00", "FF2800", "FF3D00", "FF4F00", "FF5F00", "FF6C00", "FF7800", "FF8300", "FF8C00", "FF9500", "FF9E00", "FFA500", "FFAD00", "FFB400", "FFBB00", "FFC200", "FFC900", "FFCF00", "FFD600", "FFDD00", "FFE400", "FFEB00", "FFF200", "FFFA00", "F7FE00", "E5FB00", "D5F800", "C6F500", "B7F200", "A8F000", "98ED00", "87EA00", "74E600", "5DE100", "41DB00", "1DD300", "00C618", "00BB3F", "00B358", "00AC6B", "00A67C", "009E8E", "028E9B", "06799F", "0969A2", "0C5DA5", "0E51A7", "1047A9", "133CAC", "1531AE", "1924B1", "1F1AB2", "2A17B1", "3415B0", "3C13AF", "4512AE", "4E10AE", "560EAD", "600CAC", "6A0AAB", "7608AA", "8506A9", "9702A7", "AD009F", "BC008D", "C7007D", "D0006E", "D8005F", "DF004F", "E7003E", "EF002A", "F80012"];
global.Stop = [ ]

// Getting Bot Registry
Settings.Bot = new Depends.Commando.Client({ commandPrefix: Settings.Prefix })
Settings.Status = `${Settings.Prefix}help | Sector Welcome Assistant. ${Settings.Version}`

Settings.Bot.registry
    .registerGroup('support', 'Support Commands')
	.registerGroup('roles', 'Rainbow Commands')
	.registerGroup('settings', 'Settings Commands')
	.registerGroup('music', 'Vibes Commands')
	//.registerGroup('moderation', "Moderation Commands")
	//.registerGroup('economy', "Economy Commands")
    .registerGroup('utilities', 'Developer Commands')
    .registerCommandsIn(__dirname + "/commands");

// Opening Connections
Depends.Mongoose.connect(Settings.Connection, {useNewUrlParser: true })
.catch(Error => {
	console.log(Error)
})

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
	if (Message.author.equals(Settings.Bot.user)) return;
	if (Message.channel.type === "dm") return;
	if (Message.content.startsWith(Settings.Prefix)) return;
	if (Settings.Testing === true) return;
	
	Settings.Schemas.Suggestion.findOne({
		ServerID: Message.guild.id,
		SuggestionsEnabled: true || false
	}, (Error, Results) => {
		if (Error) console.log(Error);
			if(!Results) return Message.channel.send(":warning: Database Entry not Found for this Server!")
				
			let SChannel = Results.SuggestionsChannel
			let RChannel = Results.RecordChannel
			
			if (Number(Message.channel.id) === Number(SChannel)){
				Message.delete(100)
				if(!Results.SuggestionsEnabled === true) return Message.channel.send({embed: {description: "This Server isn't Currently accepting Suggestions.", color: "6e00ff"}}).then(MS => MS.delete(5000))

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
	})
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