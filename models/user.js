var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: {
		type : String, 
		required : true,
		trim : true
	}, 
	Password: {
		type : String,
		minlength : 3
	} 
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", userSchema);