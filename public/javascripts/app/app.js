var main = function () {

	var totalCategories = " ", taskCounter = 0; 
	
    var setUpClickHandler = function (anchor) {
        anchor.click(function () {
            var target = $(this).attr("href");

            $(".active").removeClass("active");
            $(this).addClass("active");
            $("#" + target).addClass("active");
			 if (target === "Categorized") {
                categorizedTab();
            }
			else if (target === "All") {
			$("#All").children().remove();
			loadJSON();
			}
	
            return false;
        });
    };
	
	var loadJSON = function() {
		$.getJSON("/todos.json", function (myTodos) {
			myTodos.forEach(function (myTodo) {
				var categoriesList = "";
				myTodo.categories.forEach(function(category) {
					category = category + " ";
					categoriesList = categoriesList + category;
					});
				var desc = myTodo.description;
				addTodoData(desc, categoriesList); //runs function to add data from task
			}); 
		});
	
	}; 

	//todo function
	var addTodoData = function(text, cats) {
		taskCounter++; //counts number of tasks 
		  $("#All").append("<div id = aTask>" + "<div id = task" + taskCounter + ">" + "</div>" + "</div>" + "</br>"); //assigns each task its own div
		  $("#task" + taskCounter).html("<div class = 'text'>" + text + "</div>" + //puts info from task in divs 
		  "<div class = 'cats'>" + cats + "</div>" +
		  "<button type='button' class='delete' id='" + taskCounter + "'>Delete</button>" ); //remove button
		  $(".delete").click(function () { //remove function
            var thisTodo = $(this).attr("id");
			var deleteThis = $("#task" + thisTodo).html();
			var delete_object = {
				desc: deleteThis
				};
			$("#task" + thisTodo).fadeOut('slow', function() {
				$.post("todo/delete", delete_object, function(response) {
					console.log(response);
				});
				$(this).remove();
				$("#task" + thisTodo).remove();
				$("#task" + thisTodo).parent('div').remove();
							
			});
			taskCounter--;	
		  });
	}; 
	
	var addNewTodo = function() {
		$("#submit").click(function() { //when submit button is clicked...
			var text = $("#newText").val(); //get vals and...
			var cats = $("#newCats").val();
			post_object = {};
			 if (desc === "" || categories === "") {
                    alert("Please fill in all fields");
                } else {
                    post_object.description = desc;
                    post_object.categories = categories.split(/[\s,]+/);
                    console.log(post_object);

                    $.post("/todo/new", post_object, function (response) {
                        console.log(response);
                    });

                    

			addTodoData(text, cats); //add new todo
				
			}	
		});
	};
	
	var categorizedTab = function () {
		$("#Categorized").children().remove(); //delete old data when clicked, per project instructions
		var categories = totalCategories.split(" ");  
		var uniqueCategories = [];
		$.each(categories, function(i, el){
		if($.inArray(el, uniqueCategories) === -1) uniqueCategories.push(el);
		});
		
		var x; 
		for (x=0; x<uniqueCategories.length; x++) {
			$("#Categorized").append("<div class='cat" + x + "'" + ">" + "<h2>" + uniqueCategories[x] + "</h2>" + "</div>" + "</br>");
		};
		
		var y; 
		for (y=0; y<taskCounter; y++) {
			var taskText = $("#task" + taskCounter + " .text").html();
			var taskCats = $("#task" + taskCounter + " .cats").html();
			var splitCats = taskCats.split(" ");
			var z;
			for (z=0; z<splitCats.length; z++) {
				
			};
			
			
		};	
			
		
	
	};	
    

	var initialise = function () {
	
	loadJSON(); 
    setUpClickHandler($(".tabs .tab"));
	addNewTodo();

	};
	
	initialise(); 
};

$(document).ready(main);