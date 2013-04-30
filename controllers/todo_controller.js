/*jslint indent:4*/
/*global */
var Todo = require("../models/todo.js"),
    TodoController = {};

TodoController.list = function (req, res) {
    Todo.find({}, function (err, people) {
	if (err !== null) {
	    console.log(err);
	} else {
	    res.json(todos);
	}
    });
};

TodoController.create = function (req, res) {
    var t = new Todo({
	"desc":req.body.desc,
	"cat":req.body.cat
    });

    t.save(function (err, result) {
	if (err !== null) {
	    //send the error
	} else {
	    res.json(result);
	}
    });
};

TodoController.destroy = function (req, res) {
    Todo.findOne({"desc":req.body.desc}, function (err, todo) {
	if (err !== null) {
	    //handle err
	} else if (todo === null) {
	    //Todo not found
	} else {
	    todo.remove(function (err) {
		if (err !== null) {
		    //handle err
		}
	    });
	}
    });
};

module.exports = TodoController;