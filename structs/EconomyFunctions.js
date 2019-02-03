module.exports = class Economoy {
	addExperience(Message){
		Depends.Mongoose.connect(Settings.Connection + "\Level", {useNewUrlParser: true })

		Settings.Schemas.Level.findOne({
			UserId: Message.author.id
		}), (Error, Results) = {
			let NewXP = Math.floor(Math.random() * 7) + 8;
			if (!Results) {
				let Level = new Settings.Schemas.Level({
					UserId: Message.guild.id,
					LevelNumber: 1,
					XPNumber: NewXP,
					MoneyNumber: 0
				})
				Level.save().then(Results => console.log(Results)).catch(Error => console.log(Error))
				return;
			} else {
				let CurrentLevel = Results.LevelNumber;
				let CurrentXP = Results.XPNumber;
				let NextLevel = Results.LevelNumber * 300;
				
				Results.XPNumber = CurrentXP + NewXP;

				if(NextLevel <= Results.XPNumber){
					Results.LevelNumber = Results.LevelNumber + 1;
					let NewLevel = Results.LevelNumber
					let Embed = new Discord.RichEmbed()
					.setColor("6e00ff")
					.setTitle("Congratulations!")
					.setDescription(`You have leveled up to Level ${NewLevel}`);
					Message.channel.send(`${Message.author}`, Embed).then(MSG => MSG.delete(10000))
				}
				Results.save().catch(Error => console.log(Error))
			}
		}
	}
}