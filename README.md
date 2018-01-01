# Sample api using express and angular+ 

To use this Sample you need to run mongo db first so open your terminal inside Mong folder then run mongod --sbpath="db" 

# Run ExpressApi 

Make sure you have all the node_modules installed by hitting npm install 

Open another terminal inside expressApi folder and run "npm start"

# POST http://localhost:3000/api/cat 
body : [{
	"name":"Bucky",
	"description":" A pet is an animal that you keep in your home to give you company and pleasure . | Meaning, pronunciation, translations and examples",
	"imageUrl":"http://premiumlayers.net/demo/html/petcare/images/blog/home-blog-1.jpg",
	"age":1,
	"gender":"Male",
	"type":"Cat",
	"price":250
},
{
	"name":"Alex",
	"description":"For thousands of years people have kept and cared for domesticated animals, often developing strong emotional ties with their pets and regarding them as members of the family.",
	"imageUrl":"http://premiumlayers.net/demo/html/petcare/images/blog/home-blog-2.jpg",
	"age":1.5,
	"gender":"Male",
	"type":"Cat",
	"price":250
}]

# PUT http://127.0.0.1:3000/api/cat/{mongoObjectId}
body: {
	"age":5,
	"price":200
}


