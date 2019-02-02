const Mongoose = Depends.Mongoose

let SuggestionSchema = new Mongoose.Schema({
	ServerID: String,
	SuggestionsEnabled: Boolean,
	SuggestionsChannel: String,
	RecordChannel: String
});

module.exports = Mongoose.model("Suggestions", SuggestionSchema)