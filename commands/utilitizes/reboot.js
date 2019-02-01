const Commando = Depends.Commando
const Discord = Depends.Discord
const DevServer = Settings.DevServer

class RebootCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'reboot',
            group: 'utilitizes',
            memberName: "reboot",
            description: 'Will restart the Bot.'
        });
    }

    async run(message, args) {
        if (message.author.equals(Settings.Bot.user)) return;
        if (message.channel.type === "dm") return;
        if (Settings.Testing === true) return;

        let Author = Number(Message.author.id)
        if (Author == Number(DevServer.Developer)) {
            message.channel.send(":warning: Resetting Bot...").then(Mes => Mes.delete(2000))
            Settings.Bot.destroy()
            Settings.Bot = Bot.login(Settings.DevKeys.Login)
            return
        } else {
            let Embed = new Discord.RichEmbed()
                .setColor("276e00ff")
                .setDescription("You aren't allowed to use this Command!");
            message.channel.send(Embed).then(Message => Message.delete(5000))
            return
        }

    }
}

module.exports = RebootCommand

