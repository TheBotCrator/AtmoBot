// Coded by Christopher H::Lyawoo#9768

// Getting Bot Dependencies
global.Depends = {
	Path: require('path'), // Used for Library Directory.
	
	// Primary Dependencies
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
	.registerDefaults()
    .registerCommandsIn(__dirname + "/commands");

// Binding Connections
var Files = Depends.Path.join(__dirname, "structs/Events")
Files.forEach((file) => {
	if (file.split('.')[0] !== "js") return;
	
	let EventName = file.split('.')[0]
	let Event = require(__dirname + `/structs/Events/${file}`)
	Settings.Bot.on(EventName, Event.bind(null, Settings.Bot))
})

// Opening Connections
Depends.Mongoose.connect(Settings.Connection, {useNewUrlParser: true })
.catch(Error => {
	console.log(Error)
})

// Getting Bot Functions
Settings.Bot.login(Settings.DevKeys.Login)