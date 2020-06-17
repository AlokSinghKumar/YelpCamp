var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
	text: {
		type : String, 
		trim : true,
		required : true,
		minlength : 30
	}, 
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		username: {
			type : String
		}
	}
});

module.exports = mongoose.model("comment", commentSchema);