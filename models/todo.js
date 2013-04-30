var mongoose = require("mongoose"),
    TodoSchema,
    Todo;

mongoose.connect("mongodb://localhost/development");

TodoSchema = new mongoose.Schema({
    "desc": String,
    "cat" : Array
});

Todo = mongoose.model("Todo", TodoSchema);

Todo.findOne({}, function (err, result) {
    if (err !== null) {
	console.log(err);
    } else if (result === null) {
	var t = new Todo({
	    "desc": "Example",
	    "cat": ["work"]; 
	});

	t.save(function (err) {
	    if (err !== null) {
		console.log(err);
	    }
	});
    }
});

module.exports = Todo;
