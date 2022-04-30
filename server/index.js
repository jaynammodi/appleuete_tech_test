const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const PORT = process.env.PORT || 3001;

const app = express();

const mongo_uri = "mongodb+srv://admin:helloworld@appleuete-tech.tep0u.mongodb.net/appleute-tech?retryWrites=true&w=majority";
const client = new MongoClient(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get("/api", (req, res) => {
    res.json({status: 200, message: "Hello World"});
});

app.get("/customers", (req, res) => {
    // Get a list of all customers
    client.connect(async err => {
        const customers = client.db("inventory").collection("customers");
        await customers.find({}).toArray((err, docs) => {
            if (err) {
                res.status(500);
                throw err;
            }
             // console.log(docs);
            res.json(docs);
        });
         
    });   
});

app.get("/order", (req, res) => {
    // Get a list of all orders for a particular customer
    client.connect(async err => {
        const orders = client.db("inventory").collection("orders");
        const docs = await orders.find({
            customer_id: req.query.customer_id
        }).toArray((err, docs) => {
            if (err) {
                res.status(500);
                throw err;
            }
             // console.log(docs);
            res.json(docs);
        });
    });   
});

app.get("/orders", (req, res) => {
    // Get a list of all orders
    client.connect(async err => {
        const orders = client.db("inventory").collection("orders");
        const docs = await orders.find({}).toArray((err, docs) => {
            if (err) {
                res.status(500);
                throw err;
            }
             // console.log(docs);
            res.json(docs);
        });
    });   
});

app.get("/products", (req, res) => {
    // Get a list of all products
    client.connect(async err => {
        const products = client.db("inventory").collection("products");
        await products.find({}).toArray((err, docs) => {
             // console.log(docs);
            res.json(docs);
        });
        if (err) {
            res.status(500);
            throw err;
        }
    });
});

app.post("/update_products", jsonParser, function (req, res) {
    // Update the quantity of a product
    // console.log(req.body);
    client.connect(async err => {
        const products = client.db("inventory").collection("products");
        // console.log(" > Updating product quantity");
        const resp = await products.updateOne({
            product_id: req.body.product_id
        }, {
            $set: {
                qty: req.body.quantity
            }
        });
        console.log(resp);
        if (err) {
            res.status(500);
            throw err;
        }
        res.json({status: 200, acknowledged: resp.acknowledged, matchedCount: resp.matchedCount, modifiedCount: resp.modifiedCount});
    });
});

app.post("/update_order", jsonParser, function (req, res) {
    // Update the status of an order
     // console.log(req.body);
    client.connect(async err => {
        const orders = client.db("inventory").collection("orders");
         // console.log(" > Updating product quantity");
        const resp = await products.updateOne({
            order_id: req.body.order_id
        }, {
            $set: {
                status: req.body.status
            }
        });
        if (err) {
            res.status(500);
            throw err;
        }
         // console.log(resp);
        res.json({status: 200, acknowledged: resp.acknowledged, matchedCount: resp.matchedCount, modifiedCount: resp.modifiedCount});
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// admin:helloworld - mongodb