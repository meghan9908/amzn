const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

const uri = "mongodb+srv://meghan:SBwPEJ4ydXTrTFUP@cluster0.4b1seyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function fetchProducts() {
    await client.connect();
    const database = client.db('AMAZON'); // Replace with your database name
    const collection = database.collection('products'); // Replace with your collection name
    const products = await collection.find({}).toArray();
    return products;
}

function generateHTML(products) {
    const productCards = products.map(product => {
        return `
            <div class="container" onclick="expansion(this)">
                <div class="image"><img src="${product.image_url}" alt="Product Image"></div>
                <span class="product-title"><h2>${product.title}</h2></span>
                <span class="product-rating">${product.rating}</span>
                <br>
                <span class="price">${product.price}</span>
                <br>
                <div class="buynow"><span>Buy Now</span></div>
                <div class="additional-info">
                    <p class="description">${product.description || 'No description available.'}</p>
                    <div class="reviews">
                        <h3>Reviews</h3>
                        ${product.reviews.map(review => `
                        
                            <p><strong>${review.author}</strong>: ${review.rating} - ${review.title || 'No title'}</p>
                            <p>${review.content}</p>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="script.js" defer></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Product Page</title>
</head>
<body>
    <div class="trending_deals_wrapper">
        <button class="nav-button left" onclick="slideLeft()">&#8249;</button>
        <div class="trending_deals">
            ${productCards}
        </div>
        <button class="nav-button right" onclick="slideRight()">&#8250;</button>
    </div>
</body>
</html>
    `;
}

app.get('/', async (req, res) => {
    const products = await fetchProducts();
    const htmlContent = generateHTML(products);
    res.send(htmlContent);
});

app.use('/style.css', express.static(path.join(__dirname, 'style.css')));
app.use('/script.js', express.static(path.join(__dirname, 'script.js')));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
