
const EventEmitter = require('events');
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const app = express();
const cart =  require('./cart_server')
const myEmitter = new EventEmitter();
const uri = "Replace with your MongoDB connection string";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function fetchProducts() {
    await client.connect();
    const database = client.db('AMAZON'); // Replace with your database name
    const collection = database.collection('products'); // Replace with your collection name
    const products = await collection.find({}).toArray();
    return products;
}
async function add_to_cart(product){
  await client.connect();
  const database = client.db('AMAZON');
  const collection = database.collection('cart');
  collection.insertOne(product,function(err,res){
    if(err) throw err;
    console.log('sucessfully inserted')
  })  
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
                <div class="buynow"><span onclick="addToCart('${product._id}')">Add To Cart</span></div>
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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://kit.fontawesome.com/4e55e9649e.js" crossorigin="anonymous"></script>
    <title>Product Page</title>
</head>
<body>
<!-- -------------------NAVBAR------------------ -->
    <header>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top navbar-scroll">
        <div class="container-fluid">
          <a class="navbar-brand" href="#!">TrendY</a>
          <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#!">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#!">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#!">Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#!">Attractions</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#!">Opinions</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#!">Contact</a>
              </li>
            </ul>
            <ul class="navbar-nav d-flex flex-row">
              <li class="nav-item me-3 me-lg-0">
                <a class="nav-link" href="/cart">
                  <i class="fa fa-shopping-cart fa-2x ga-right" ></i>
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a class="nav-link" href="#!">
                    <span class="fa fa-instagram fa-2x ga-right"></span>
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a class="nav-link" href="#!">
                    <span class="fa fa-facebook-square fa-2x ga-right"></span>
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a class="nav-link" href="#!">
                    <span class="fa fa-youtube fa-2x ga-right w3-hover-text-red"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <!-- Navbar -->
  </header>
        
    <div class="box">
        <div class="item">
            <img src="/images/buds.png" alt="Wireless Buds">
            <div class="product-name">Wireless Buds</div>
            <div class="discount">Flat 20% Discount</div>
        </div>
        <div class="item">
            <img src="/images/elctronics.png" alt="Electronics">
            <div class="product-name">Electronics</div>
            <div class="discount">Buy 1 Get 1 Free</div>
        </div>
        <div class="item">
            <img src="/images/grocery.png" alt="Groceries">
            <div class="product-name">Groceries</div>
            <div class="discount">10% Off on Groceries</div>
        </div>
        <div class="item">
            <img src="/images/sneakers.png" alt="Sneakers">
            <div class="product-name">Sneakers</div>
            <div class="discount">Flat 30% Off</div>
        </div>
        <div class="item">
            <img src="/images/ac.jpg" alt="Sneakers">
            <div class="product-name">AC</div>
            <div class="discount">Flat 30% Off</div>
        </div>
        <div class="item">
            <img src="/images/makeup.png" alt="Makeup">
            <div class="product-name">Makeup</div>
            <div class="discount">Free Gift with Purchase</div>
        </div>
        <div class="item">
            <img src="/images/pixel_phone.png" alt="Pixel Phone">
            <div class="product-name">Pixel Phone</div>
            <div class="discount">20% Off on Smartphones</div>
        </div>
        <div class="item">
            <img src="/images/medicine.png" alt="Medicine">
            <div class="product-name">Medicine</div>
            <div class="discount">Save 15% on Medicines</div>
        </div>
        <div class="item">
            <img src="/images/oven.jpg" alt="Medicine">
            <div class="product-name">Ovens</div>
            <div class="discount">Save Upto 90% on Oven</div>
        </div>
        <div class="item">
            <img src="/images/fridge.jpg" alt="Medicine">
            <div class="product-name">fridge</div>
            <div class="discount">Save 25% on fridges</div>
        </div>
        <div class="item">
            <img src="/images/machine.jpg" alt="Medicine">
            <div class="product-name">Waching Machines</div>
            <div class="discount">Min 15% on Washing Machines</div>
        </div>
    </div>
    <div class=buttons>
        <button class="navi-button left"id='prev'><i class="fa-solid fa-chevron-left fa-fade fa-2x ga-right prev"></i>
        <button class="navi-button right" id='next' ><i class="fa-solid fa-chevron-right fa-fade fa-2x ga-right next"></i>
    </div>
<!--product cards for trending deals -->
<div class="trending_deals_wrapper">
    <button class="nav-button left" onclick="slideLeft()"><i class="fa-solid fa-chevron-left fa-bounce fa-2x ga-right prev"></i>
    </button>
    <div class="trending_deals">
        ${productCards}
    </div>
    <button class="nav-button right" onclick="slideRight()"><i class="fa-solid fa-chevron-right fa-bounce fa-2x ga-right next"></i>
</button>
</div>
<!--product cards for beauty -->
<div class="trending_deals_wrapper beauty-deals">
    <button class="nav-button left" onclick="slideLeft('.beauty-deals')"><i class="fa-solid fa-chevron-left fa-bounce fa-2x ga-right prev"></i>
    </button>
    <div class="trending_deals beauty-deals">
        ${productCards}
    </div>
    <button class="nav-button right" onclick="slideRight('.beauty-deals')"><i class="fa-solid fa-chevron-right fa-bounce fa-2x ga-right next"></i>
</button>
</div>
<!--product cards for electronics -->
<div class="trending_deals_wrapper electronics-deals">
    <button class="nav-button left" onclick="slideLeft('.electronics')"><i class="fa-solid fa-chevron-left fa-bounce fa-2x ga-right prev"></i>
    </button>
    <div class="trending_deals electronics">
        ${productCards}
    </div>
    <button class="nav-button right" onclick="slideRight('.electronics')"><i class="fa-solid fa-chevron-right fa-bounce fa-2x ga-right next"></i>
</button>
</div>
<!--product cards for fashion -->
<div class="trending_deals_wrapper fashion-deals">
    <button class="nav-button left" onclick="slideLeft('.fashion-deals')"><i class="fa-solid fa-chevron-left fa-bounce fa-2x ga-right prev"></i>
    </button>
    <div class="trending_deals fashion-deals">
        ${productCards}
    </div>
    <button class="nav-button right" onclick="slideRight('.fashion-deals')"><i class="fa-solid fa-chevron-right fa-bounce fa-2x ga-right next"></i>
</button>
    </div>
    <!-- footer -->
    <!-- Remove the container if you want to extend the Footer to full width. -->
<div class="footer_wrapper my-5">
  <!-- Footer -->
  <footer class="text-center text-white" style="background-color: #3f51b5">
    <!-- Grid container -->
    <div class="footer">
      <!-- Section: Links -->
      <section class="mt-5">
        <!-- Grid row-->
        <div class="row text-center d-flex justify-content-center pt-5">
          <!-- Grid column -->
          <div class="col-md-2">
            <h6 class="text-uppercase font-weight-bold">
              <a href="#!" class="text-white">About us</a>
            </h6>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-2">
            <h6 class="text-uppercase font-weight-bold">
              <a href="#!" class="text-white">Products</a>
            </h6>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-2">
            <h6 class="text-uppercase font-weight-bold">
              <a href="#!" class="text-white">Awards</a>
            </h6>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-2">
            <h6 class="text-uppercase font-weight-bold">
              <a href="#!" class="text-white">Help</a>
            </h6>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-2">
            <h6 class="text-uppercase font-weight-bold">
              <a href="#!" class="text-white">Contact</a>
            </h6>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row-->
      </section>
      <!-- Section: Links -->

      <hr class="my-5" />

      <!-- Section: Text -->
      <section class="mb-5">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-8">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              distinctio earum repellat quaerat voluptatibus placeat nam,
              commodi optio pariatur est quia magnam eum harum corrupti
              dicta, aliquam sequi voluptate quas.
            </p>
          </div>
        </div>
      </section>
      <!-- Section: Text -->

      <!-- Section: Social -->
      <section class="text-center mb-5">
        <a href="" class="text-white me-4">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-google"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="" class="text-white me-4">
          <i class="fab fa-github"></i>
        </a>
      </section>
      <!-- Section: Social -->
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div
         class="text-center p-3"
         style="background-color: rgba(0, 0, 0, 0.2)"
         >
      © 2020 Copyright:
      <a class="text-white" href="https://mdbootstrap.com/"
         >MDBootstrap.com</a
        >
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->
</div>
<!-- End of .container -->
</body>
</html>
    `;
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'cart')));

app.get('/', async (req, res) => {
    const products = await fetchProducts();
    const htmlContent = generateHTML(products);
    res.send(htmlContent);
});
app.post('/add-to-cart', async (req, res) => {
    const { productId } = req.body;
    if (!productId) {
        return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    try {
        const database = client.db('AMAZON');
        const productsCollection = database.collection('products');
        console.log(productId)
        const product = await productsCollection.findOne({ _id: new ObjectId(productId)});
        if (!product) {
            console.log(`"product found"${product}`)
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        await add_to_cart(product);
        res.json({ success: true });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
app.get('/cart',async(req,res)=>{
    console.log(typeof cart)
    console.log(typeof cart.createCartCollection);
    const creation = await cart.createCartCollection();
    const products = await cart.fetchCartProducts();
    const htmlContent = cart.generateCartHTML(products)
    res.send(htmlContent)
})
app.use('/cart/cart.js',express.static(path.join(__dirname,'/cart/cart.js')))
app.use('/cart/cart.css', express.static(path.join(__dirname, '/cart/cart.css')))
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/style.css', express.static(path.join(__dirname, 'style.css')));
app.use('/script.js', express.static(path.join(__dirname, 'script.js')));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

