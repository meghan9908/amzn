const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

const uri = ""; // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function fetchProducts() {
    await client.connect();
    const database = client.db('AMAZON'); // Replace with your database name
    const collection = database.collection('cart'); // Replace with your collection name
    const products = await collection.find({}).toArray();
    return products;
}
