// Coded by Christopher H::Lyawoo#9768

const Name = "Lyaboo Bot";
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

// Getting Bot Version Information
global.Version = "0.0.6";
global.Testing = false;
global.Prefix = "ly!";
global.Status = `${Prefix}help | Sector Welcome Assistant.`;

// Getting Bot Server Information
global.Bot = new Commando.Client({
    commandPrefix: Prefix
});

Bot.registry
    .registerGroup('info', 'Information Commands')
    .registerDefaults()
    .registerCommandsIn(__dirname + "/commands");

// Getting Primaries
const Size = 12;
const Speed = 60000;
const Servers = [
    "494609880552833027"
];

const Rainbow = new Array(size);
const RainbowPlace = 0;
const RoleName = "Sector Aces";

for (var i = 0; i < size; i++) {
    var Red = sin_to_hex(i, 0 * Math.PI * 2 / 3); // 0   deg
    var Blue = sin_to_hex(i, 1 * Math.PI * 2 / 3); // 120 deg
    var Green = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg

    Rainbow[i] = '#' + Red + Green + Blue;
}

function sin_to_hex(i, phase) {
    var sin = Math.sin(Math.PI / size * 2 * i + phase);
    var int = Math.floor(sin * 127) + 128;
    var hex = int.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

function changeColor() {
    for (let index = 0; index < Servers.length; ++index) {
        Bot.guilds.get(Servers[index]).roles.find('name', RoleName).setColor(Rainbow[RainbowPlace])
            .catch(console.error);

        if (RainbowPlace == (Size - 1)) {
            RainbowPlace = 0;
        } else {
            RainbowPlace++;
        }
    }
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
    setInterval(changeColor, Speed);
});

//Bot.login(process.env.BOT_TOKEN)
Bot.login(process.env.BOT_TOKEN)
