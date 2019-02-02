const Mongoose = Depends.Mongoose

let LevelSchema = new Depends.MongoDB.Schema({
	UserId: String,
	LevelNumber: Number,
	XPNumber: Number,
	MoneyNumber: Number
})

module.exports = Mongoose.module("Level", LevelSchema)