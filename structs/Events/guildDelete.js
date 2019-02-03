module.exports = (Bot, Guild) => { 
	console.log(`New guild joined: ${Guild.name} (id: ${Guild.id}). This guild has ${Guild.memberCount} members!`);
    if (Settings.Testing === false) Bot.user.setActivity(`${Settings.Status}`, {type: "STREAMING"})
	
	if (!Records[Guild.id]) {
		Records[Guild.id] = {
				
		}	
		return
	}
}