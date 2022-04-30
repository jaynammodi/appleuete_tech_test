const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');

const PORT = process.env.PORT || 3001;

const app = express();

const mongo_uri = "mongodb+srv://admin:helloworld@appleuete-tech.tep0u.mongodb.net/appleute-tech?retryWrites=true&w=majority";
const client = new MongoClient(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//   const customers = client.db("inventory").collection("customers");
//   const orders = client.db("inventory").collection("orders");
//   const products = client.db("inventory").collection("products");
//   // perform actions on the collection object
//   client.close();
// });

app.get("/api", (req, res) => {
    res.json({status: 200, message: "Hello World"});
});

app.get("/customers", (req, res) => {
    client.connect(async err => {
        const customers = client.db("inventory").collection("customers");
        await customers.find({}).toArray((err, docs) => {
            console.log(docs);
            res.json(docs);
        });
        client.close();
    });   
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


// admin:helloworld - mongodb