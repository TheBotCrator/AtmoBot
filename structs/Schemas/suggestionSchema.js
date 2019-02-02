const Mongoose = Depends.Mongoose

let SuggestionSchema = new Mongoose.Schema({
	ServerID: String,
	SuggestionsEnabled: Boolean,
	SuggestionsChannel: Number,
	RecordChannel: Number
});

module.exports = Mongoose.model("Suggestions", SuggestionSchema)