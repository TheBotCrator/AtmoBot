// Coded by Christopher H::Lyawoo#9768

const Name = "Lyaboo Bot";
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const Meta = require("music-metadata");

// Getting Bot Version Information
global.Version = "Lyaboo 0.0.1";
global.Testing = false;
global.Prefix = "ly!";
global.Status = `Greeting and Meeting Aesthetically.`;

// Getting Bot Table Information
global.Records = {
    [494609880552833027]: {
        Joins: {USEABLE: true, CHANNEL: [509532922802470913], MESSAGE: false},
        Leaves: {USEABLE: true, CHANNEL: [509532922802470913], MESSAGE: false},
        AutoRole: {USEABLE: true, ROLE: ["Pending Acceptance"], TIME: false}
    }
 };
global.Servers = {

};

// Getting Bot Server Information
global.Bot = new Commando.Client({
    commandPrefix: Prefix
});

// Getting Bot Functions
	// Serving ${Bot.guilds.size} Servers! 

Bot.on("guildCreate", Guild => {
    console.log(`New guild joined: ${Guild.name} (id: ${Guild.id}). This guild has ${Guild.memberCount} members!`);
    if (Testing === false) Bot.user.setActivity(`${Status}`, { type: "STREAMING" })
});
Bot.on("guildDelete", Guild => {
    console.log(`I have been removed from: ${Guild.name} (id: ${Guild.id})`);
    if (Testing === false) Bot.user.setActivity(`${Status}`, { type: "STREAMING" })
});

Bot.on("guildMemberAdd", Member => {
    console.log(`${Member.user.username} has joined ${Member.guild.id}`);

    const Role = Member.guild.roles.find(r => r.name === "Pending Acceptance");
    Member.addRole(Role)

    const welcomeChannel = Member.guild.channels.find('name', 'welcomer');
    if (welcomeChannel) {
        let WelcomeEmbed = new Discord.RichEmbed()
            .setTitle("Member has joined!")
            .setThumbnail(Member.user.displayAvatarURL)
            .setDescription(`Welcome ${Member.user} to ${Member.guild.name}, \nChill, Relax, and Have Fun. \n and I hope you enjoy your stay here and please make sure to read <#494610101865545738> to get roled to the next role.`)
            .setColor("#27037e")
            .setFooter(`You are the ${Member.guild.memberCount} member to joined.`)
            .setTimestamp();
        welcomeChannel.send(WelcomeEmbed)
    }
});
Bot.on("guildMemberRemove", Member => {
    console.log(`${Member.user.username} has left ${Member.guild.id}`);
    const leaveChannel = Member.guild.channels.find('name', 'welcomer');
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
    if (Testing === false) Bot.user.setActivity(`${Status}`, {type: "STREAMING"})
    if(Testing === true){
        Bot.user.setStatus("idle");
        Bot.user.setActivity("Maintenance Mode On, Will Be Back Soon.")
	}	
});

//Bot.login(process.env.BOT_TOKEN)
Bot.login(process.env.BOT_TOKEN)
