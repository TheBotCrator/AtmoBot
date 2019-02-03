module.exports = (Bot, Message) => { 
	if (Message.author.equals(Bot.user)) return;
	if (Message.channel.type === "dm") return;
	if (Message.content.startsWith(Settings.Prefix)) return;
	if (Settings.Testing === true) return;
	
	let Functions = require("/app/structs/EconomyFunctions.js")
	Functions.addExperience(Message)
	
	// Coming Soon!
	Settings.Schemas.Suggestion.findOne({
		ServerID: Message.guild.id
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
									
				
				let ActualChannel = Bot.channels.get(RChannel)
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
}