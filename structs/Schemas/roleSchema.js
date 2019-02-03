const Mongoose = Depends.Mongoose

let RoleSchema = new Mongoose.Schema({
	ServerID: String,
	Roles: Array
});

module.exports = Mongoose.model("Roles", SuggestionSchema)