const Mongoose = Settings.Mongoose

let SuggestionSchema = new Depends.MongoDB.Schema({
	ServerID: String,
	SuggestionsEnabled: Boolean,
	SuggestionsChannel: Number,
	RecordChannel: Number
});

module.exports = Mongoose.module("Suggestions", SuggestionSchema)