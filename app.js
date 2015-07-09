var express = require("express");
var bodyParser = require("body-parser");
_ = require("underscore")
var app = express();
var users = [
	{
		id: 1,
		username: "bob",
		firstname: "bobby",
		lastname: "johnson",
		age: 23
	},
	{
		id: 2,
		username: "judi",
		firstname: "judith",
		lastname: "smith",
		age: 54
	},
	{
		id: 3,
		username: "ted",
		firstname: "teddie",
		lastname: "phash",
		age: 37
	}
	

];

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

		
	app.get("/", function(req,res) {
		res.send("Hello World, this is my first Node project!");
		
		});

	app.post("/users", function (req, res){
		var newUser = req.body;

		users.push(newUser);

		res.json(users);

	})

	app.get("/users", function(req,res) {
		res.json(users);
		
		});

	app.put("/users/:id", function(req,res){
		//Set value of ID
		var targetId = parseInt(req.params.id);

		//Find item in array
		var foundUser = _.findWhere(users, {id: targetId});

		//update the user's params
		foundUser.age = parseInt(req.body.age) || foundUser.age;
		foundUser.username = (req.body.username) || foundUser.username;
		foundUser.firstname = (req.body.firstname) || foundUser.firstname;
		foundUser.lastname = (req.body.lastname) || foundUser.lastname;
		

		res.json(users)


	});

	//delete
	app.delete("/users/:id", function(req,res){
		//Set value of ID
		var targetId = parseInt(req.params.id);

		//Find item in array
		var foundUser = _.findWhere(users, {id: targetId});

		//At position x, remove 1 items:
		if(foundUser){
		var index = users.indexOf(foundUser);
		users.splice(index, 1);
		}

		res.json(users)


	});	



		
		
app.listen(3000);