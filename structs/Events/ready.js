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

module.exports = (Bot, Member) => { 
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
}