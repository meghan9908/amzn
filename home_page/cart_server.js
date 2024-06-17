
const exp = require('constants');
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
    console.log("started execting")
    const app = express();
    const PORT = 3002;
    const uri = "Replace with your MongoDB connection string";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    async function createCartCollection() {
        try {
            await client.connect();
            const database = client.db('AMAZON'); // Replace with your database name
            const collectionNames = await database.listCollections({ name: 'cart' }).toArray();

            if (collectionNames.length === 0) {
                await database.createCollection('cart');
                console.log("Collection 'cart' created");
            } else {
                console.log("Collection 'cart' already exists");
            }
        } catch (error) {
            console.error('Error creating collection:', error);
            throw error;
        }
    }

    async function fetchCartProducts() {
        console.log("started executing fetch Products");
        try {
            const database = client.db('AMAZON'); // Replace with your database name
            const collection = database.collection('cart'); // Replace with your collection name
            const products = await collection.find({}).toArray();
            console.log(products);
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
    function generateCartHTML(products){
        const productCards = products.map(product => {
            return `
            <div class="product-image-container">
                    <img src="${product.image_url}" class="product-image">
                    <div class="product-details">
                        <span class="product-name">${product.title}</span>
                        <br><br>
                        <span class="price">${product.price}</span>
                        <br><br>
                        <button class="qty-minus" onclick="qtyDec()">-</button>
                        <input type="text" class="qty" min="1" value="1">
                        <button class="qty-plus" onclick="qtyInc()">+</button>
                        <br>
                        <span class="delete">Delete</span>
                    </div>
                </div>
            `
        }).join('');
    return`
    <!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="cart.css">
        <script src="cart.js">
        </script>
    </head>
    <body onload='myfunc()'>
        <div>
            <h1 class="heading">Your cart</h1>
            <a href="#" class="heading link">continue shopping</a><br>
            <hr>
        </div>
        <div class="products-list">
            <div class="product-info">
                ${productCards}
            </div>
            <div>
                <div class="payments">
                    <span>ORDER SUMMARY</span>
                    <span class="payemts-right"> (1 item)</span>
                    <br><br>
                    <span class="payments-left">Order Value</span>
                    <span class="payments-right total">&#8377 11,999</span>
                    <hr style="opacity:0.65;">
                    <span class="payments-left">Shipping</span>
                    <span class="payments-right">FREE</span>
                    <hr style="opacity:0.65;"><br><br>
                    <span>Grand Total</span>
                    <span class="payments-right total">&#8377 11,999</span>
                    <br><br>
                    <button class="checkout" onclick="document.getElementById('id01').style.display='block'" style="width:auto;"> PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
        <div id="id01" class="modal">
        <div class="modal-content animate">
          
              <div class="container">
                Your order has placed successfully   
              </div>
          
            </div>
          </div>
    </body>
</html>    
    `;
    };


exports.createCartCollection = createCartCollection;
exports.fetchCartProducts = fetchCartProducts;
exports.generateCartHTML = generateCartHTML;
// Start the cart server if this file is executed directly
