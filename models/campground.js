var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
	name: {
		type : String,
		trim : true,
		required : true,
		maxlength : 32
	},
	price: {
		type : Number,
		trim : true,
		required : true,
		maxlength : 10000
	},
	image: {
		type : String,
		trim : true
	},
	description: {
		type : String, 
		trim : true, 
		required : true
	},
	author: {
		id: {
			type: mongoose.Schema.ObjectId,
			ref: "user"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "comment"
		}
	]
}
);

module.exports = mongoose.model("campground", campgroundSchema);