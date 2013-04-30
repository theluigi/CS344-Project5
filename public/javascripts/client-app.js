var main = function () {
    console.log("hello world!");

    var addTodoToList = function (todo) {
	$(".todo_list").append("<p>"+todo.name+" "+todo.age+"</p>");
    };

    $.getJSON("/todos.json", function (response) {
	response.forEach(function(todo) {
	    console.log(todo);
	    addTodoToList(todo);
	    //$(".people_list").append("<p>"+person.name+" "+person.age+"</p>");
	});
    });


    $("#new_todo").click(function () {
	var desc = $("#desc").val(),
	    cat = $("#cat").val(),
	    post_object = {};

	if (desc === "" || desc === "") {
	    alert("Please fill in all fields.");
	} else {
	    post_object.desc = desc;
	    post_object.cat = cat;
	    console.log(post_object);

	    $.post("/todo/new", post_object, function (response) {
		console.log(response);
		addTodoToList(response);
		$("#desc").val("");
		$("#cat").val("");
	    });
	}
    });





    /*$.post("/people/new", { "name":"Sylvan", "age":20 }, function (response) {
	console.log(response);

	console.log("getting the json file a second time");
	$.getJSON("/people.json", function (response) {
	    console.log(response);
	});	
    });*/

};

$(document).ready(main);