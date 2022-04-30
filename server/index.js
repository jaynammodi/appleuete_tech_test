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
    // Get a list of all customers
    client.connect(async err => {
        const customers = client.db("inventory").collection("customers");
        await customers.find({}).toArray((err, docs) => {
            console.log(docs);
            res.json(docs);
        });
        client.close();
    });   
});

app.get("/orders", (req, res) => {
    // Get a list of all orders for a particular customer
    client.connect(async err => {
        const orders = client.db("inventory").collection("orders");
        const docs = await orders.findOne({
            customer_id: req.query.customer_id
        });
        console.log(docs);
        res.json(docs);
        client.close();
    });   
});

app.get("/products", (req, res) => {
    // Get a list of all products
    client.connect(async err => {
        const products = client.db("inventory").collection("products");
        await products.find({}).toArray((err, docs) => {
            console.log(docs);
            res.json(docs);
        });
        client.close();
    });
});

app.post("/update_products", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


// admin:helloworld - mongodb