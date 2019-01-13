// Coded by Christopher H::Lyawoo#9768

const Name = "Lyaboo Bot"; // Getting Bot Name, used in various Functions.
const Discord = require('discord.js'); // Discord Library used for Functions of the Bot.
const Commando = require('discord.js-commando'); // Discord Secondary Library used for Functions of the Bot.
const forEachTimeout = require('foreach-timeout'); // Used for Rainbow Roles.

// Getting Bot Version Information
global.Version = "0.0.6"; // Bot's Version.
global.Testing = false; // To Check if the Testing Version of the Bot is Enabled.
global.Prefix = "ly!"; // Prefix for Bot Commands.
global.Status = `${Prefix}help | Sector Welcome Assistant. PHONETIC:EOQ`; // Status of the Bot.
global.Colors = ["FF0D00", "FF2800", "FF3D00", "FF4F00", "FF5F00", "FF6C00", "FF7800", "FF8300", "FF8C00", "FF9500", "FF9E00", "FFA500", "FFAD00", "FFB400", "FFBB00", "FFC200", "FFC900", "FFCF00", "FFD600", "FFDD00", "FFE400", "FFEB00", "FFF200", "FFFA00", "F7FE00", "E5FB00", "D5F800", "C6F500", "B7F200", "A8F000", "98ED00", "87EA00", "74E600", "5DE100", "41DB00", "1DD300", "00C618", "00BB3F", "00B358", "00AC6B", "00A67C", "009E8E", "028E9B", "06799F", "0969A2", "0C5DA5", "0E51A7", "1047A9", "133CAC", "1531AE", "1924B1", "1F1AB2", "2A17B1", "3415B0", "3C13AF", "4512AE", "4E10AE", "560EAD", "600CAC", "6A0AAB", "7608AA", "8506A9", "9702A7", "AD009F", "BC008D", "C7007D", "D0006E", "D8005F", "DF004F", "E7003E", "EF002A", "F80012"];
global.Stop = [ ]

// Getting Bot Server Information
global.Bot = new Commando.Client({
    commandPrefix: Prefix
});
global.Records = {
    
}

Bot.registry
    .registerGroup('info', 'Information Commands')
	.registerGroup('roles', 'Rainbow Commands')
	.registerGroup('data', 'Data Commands')
	.registerDefaults()
    .registerCommandsIn(__dirname + "/commands");

// Getting Rainbow Functions

async function Color() {
    forEachTimeout(Colors, (Color) => {
        Bot.guilds.forEach((guild) => {
            if (!Stop.includes(guild.id)) {
                let role = guild.roles.find('name', 'Certified Customary');
                if (role && role.editable)
                    role.setColor(Color);
            }
        })
    }, 1500).then(Color);
}
// Getting Bot Functions

Bot.on("guildCreate", Guild => {
    console.log(`New guild joined: ${Guild.name} (id: ${Guild.id}). This guild has ${Guild.memberCount} members!`);
    if (Testing === false) Bot.user.setActivity(`${Status}`, {type: "STREAMING"})
});
Bot.on("guildDelete", Guild => {
    console.log(`I have been removed from: ${Guild.name} (id: ${Guild.id})`);
    if (Testing === false) Bot.user.setActivity(`${Status}`, {type: "STREAMING"})
});

Bot.on("guildMemberAdd", Member => {
    console.log(`${Member.user.username} has joined ${Member.guild.id}`);

    const Role = Member.guild.roles.find(r => r.name === "Sector Noobs");
    Member.addRole(Role)

    const welcomeChannel = Member.guild.channels.find('name', 'general');
    if (welcomeChannel) {
        let WelcomeEmbed = new Discord.RichEmbed()
            .setTitle("Member has joined!")
            .setThumbnail(Member.user.displayAvatarURL)
            .setDescription(`Welcome ${Member.user} to ${Member.guild.name}.`)
            .setColor("#27037e")
            .setFooter(`You are the ${Member.guild.memberCount} member to joined.`)
            .setTimestamp();
        welcomeChannel.send(WelcomeEmbed)
    }
});
Bot.on("guildMemberRemove", Member => {
    console.log(`${Member.user.username} has left ${Member.guild.id}`);
    const leaveChannel = Member.guild.channels.find('name', 'general');
    if (leaveChannel) {
        let LeaveEmbed = new Discord.RichEmbed()
            .setTitle("Member has left!")
            .setThumbnail(Member.user.displayAvatarURL)
            .setDescription(`Sad to see you leave ${Member.user}! We hope you enjoyed your stay at ${Member.guild.name}.`)
            .setColor("#27037e")
            .setFooter(`Member Count is at ${Member.guild.memberCount}.`)
            .setTimestamp();
        leaveChannel.send(LeaveEmbed)
    }
});
Bot.on("message", Message => {
	if (Message.author.equals(Bot.user)) return;
	if (Message.channel.type === "dm") return;
	if (Message.content.startsWith(Prefix)) return;
	if (Testing === true) return;
	
	if (!Records[Message.guild.id]) return;
	if (!Records[Message.guild.id].Suggestions) return; 
	
	
	let RecordChannel = Records[Message.guild.id].Suggestions.RECORD
	let SuggestionChannel = Records[Message.guild.id].Suggestions.CHANNEL
	if (!RecordChannel) return;
        if (!SuggestionChannel) return;

	if (Message.channel.id === SuggestionChannel){
		if (!Records[Message.guild.id].Suggestions.USEABLE === true) return;
		Message.channel.send(':white_check_mark: Successful!')
		
		let FirstEmbed = new Discord.RichEmbed()
		.setColor("6e00ff")
		.setTimestamp()
		.addField("Beta Feature", "Thank you for testing this Feature! Your data has been recorded, and staff will review soon! These messages will disappear in a few seconds.");
		
		let SecondEmbed = new Discord.RichEmbed()
		.setColor("6e00ff")
		.setTimestamp()
		.setFooter(`Posted by ${Message.author.username} | #${Message.author.discriminator}`, Message.author.displayAvatarURL)
		.setAuthor(`Feedback #${Message.member.user.id}`, Message.guild.iconURL)
		.addField('Description', `${Message.content}`);        
							
		let ActualChannel = Bot.channels.get(RecordChannel)
		if (ActualChannel){ 
			ActualChannel.send(SecondEmbed); 
		} else { 
			return Message.channel.send(":x: Cannot Log Suggestions due to Error!")
		}

		Message.channel.send(FirstEmbed).delete(5000);
				
	}
});
Bot.on("ready", function () {
    console.log(`${Name}: Lyaboo Bot has loaded and is ready for Usage. Online at ${Bot.guilds.size}`);
    if (Testing === false) {
        Bot.user.setActivity(`${Status}`, {type: "STREAMING"})
    };
    if(Testing === true){
        Bot.user.setStatus("idle");
        Bot.user.setActivity("Maintenance Mode On, Will Be Back Soon.")
        return;
    }	
    Color();
});

//Bot.login(process.env.BOT_TOKEN)
Bot.login(process.env.BOT_TOKEN)
