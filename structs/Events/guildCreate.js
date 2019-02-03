module.exports = (Bot, Guild) => { 
	console.log(`I have been removed from: ${Guild.name} (id: ${Guild.id})`);
    if (Settings.Testing === false) Bot.user.setActivity(`${Settings.Status}`, {type: "STREAMING"})
		
	if (Records[Guild.id]) {
		delete Records[Guild.id]
		return
	}
}