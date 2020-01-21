const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

let contract = require("./contract");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	//read votes
	contract.getVotes()
	.then(count => {
		res.render("index", {voteCount: count});
	});
})

app.post("/", (req, res) => {
	let candidates = ["Rockstar", "Bussy", "Icon", "Noble"];
	
	let targetCanditate = req.body["candidate-name"];
	
	if (candidates.indexOf(targetCanditate) > -1) {
		//if it"s a valid candidate, vote the candidate
		contract.castVote(targetCanditate)
		.then(hash => {
			// console.log("voted>>>", voted);
			res.json({message: "Vote was cast successfully", hash: hash});
		})
		.catch(err => {
			res.json({message: err});
		})
	} else {
		res.json({message: "Candidate not recognized."});
	}
});

app.listen(port, () => {
  console.log("Express server is listening on " + port);
});