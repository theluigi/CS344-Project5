/*jslint indent:4*/
/*global */
var http = require("http"),
    express = require("express"),
    path = require("path"),
    app = express(),
    todoc;

// Load Controllers
todoc = require("./controllers/todo_controller.js");

app.configure(function () {
    // Define our static file directory, it will be 'public'                             
    app.use(express.static(path.join(__dirname, "public")));

    // This allows us to parse the post requests data
    app.use(express.bodyParser());
});

http.createServer(app).listen(3000, function () {
    console.log("Server running on port 3000");
});

app.get("/todos.json", todoc.list);
app.post("/todo/new", todoc.create);
app.post("/todo/delete", todoc.destroy);