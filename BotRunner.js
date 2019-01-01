// Coded by Christopher H::Lyawoo#9768

const Name = "Lyaboo Bot";
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const forEachTimeout = require('foreach-timeout');

// Getting Bot Version Information
global.Version = "0.0.8";
global.Testing = false;
global.Prefix = "ly!";
global.Status = `${Prefix}help | Sector Welcome Assistant.`;

// Getting Bot Server Information
global.Bot = new Commando.Client({
    commandPrefix: Prefix
});

Bot.registry
    .registerGroup('info', 'Information Commands')
    .registerGroup('utility', 'Utility Commands')
    .registerDefaults()
    .registerCommandsIn(__dirname + "/commands");

// Getting Rainbow Functions
const Colors = ["FF0D00", "FF2800", "FF3D00", "FF4F00", "FF5F00", "FF6C00", "FF7800", "FF8300", "FF8C00", "FF9500", "FF9E00", "FFA500", "FFAD00", "FFB400", "FFBB00", "FFC200", "FFC900", "FFCF00", "FFD600", "FFDD00", "FFE400", "FFEB00", "FFF200", "FFFA00", "F7FE00", "E5FB00", "D5F800", "C6F500", "B7F200", "A8F000", "98ED00", "87EA00", "74E600", "5DE100", "41DB00", "1DD300", "00C618", "00BB3F", "00B358", "00AC6B", "00A67C", "009E8E", "028E9B", "06799F", "0969A2", "0C5DA5", "0E51A7", "1047A9", "133CAC", "1531AE", "1924B1", "1F1AB2", "2A17B1", "3415B0", "3C13AF", "4512AE", "4E10AE", "560EAD", "600CAC", "6A0AAB", "7608AA", "8506A9", "9702A7", "AD009F", "BC008D", "C7007D", "D0006E", "D8005F", "DF004F", "E7003E", "EF002A", "F80012"];
const Stop = [];

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
