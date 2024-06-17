var cart=[{"productId":1,
    "productName":"Rolex GMT-Master I Men's Watch with Jubilee Bracelet",
    "price":11999 ,"quantity":1,
    "productImage":"https://images-cdn.ubuy.co.in/64ef979827e9a37b097b7202-rolex-gmt-master-ii-men-39-s-watch.jpg"
        },{"productId":2,
    "productName":"Rolex GMT-Master II Men's Watch with Jubilee Bracelet",
    "price":12999 ,"quantity":1,
    "productImage":"https://images-cdn.ubuy.co.in/64ef979827e9a37b097b7202-rolex-gmt-master-ii-men-39-s-watch.jpg"
    },{"productId":3,"productName":"Rolex GMT-Master III Men's Watch with Jubilee Bracelet",
    "price":13999 ,"quantity":1,
    "productImage":"https://images-cdn.ubuy.co.in/64ef979827e9a37b097b7202-rolex-gmt-master-ii-men-39-s-watch.jpg"
    },{"productId":4,"productName":"Rolex GMT-Master IV Men's Watch with Jubilee Bracelet",
    "price":14999 ,"quantity":1,
    "productImage":"https://images-cdn.ubuy.co.in/64ef979827e9a37b097b7202-rolex-gmt-master-ii-men-39-s-watch.jpg"
    }]
function qtyDec(x){
    i=getIndex(x);
    cart[i].quantity-=1;
    if(!(cart[i].quantity)){
        deletep(x);
    }
    order();
    myfun();
    }
function qtyInc(x){
    i=getIndex(x);
    cart[i].quantity+=1;
    order();
    myfun();
}
function getIndex(x){
    let ind=0;
    let id=x.parentElement.dataset.id;
    cart.forEach(function(value,index,arr){
        if(value.productId==id){
            ind= index;
        }
    });
    return ind;
}
function deletep(x){
    cart.splice(getIndex(x),1);
    myfun();
}
function myfun(){
    var html='';
    for(let i=0;i<cart.length;i++)
    {
        html+=`
        <div class="product-image-container">
            <img src="${cart[i].productImage}" class="product-image">
            <div class="product-details" data-id=${cart[i].productId}>
                <span class="product-name"> ${cart[i].productName}</span>
                <br><br>
                <span>&#8377 </span>
                <span class="price">${(cart[i].price)*cart[i].quantity}</span>
                <br><br>
                <button class="qty-minus" onclick="qtyDec(this)">-</button>
                <input type="text" class="qty" value=${cart[i].quantity}>
                <button class="qty-plus" onclick="qtyInc(this)">+</button>
                <span class="delete" onclick="deletep(this) ">Delete</span>
            </div>
        </div>`;    
    }
    m=document.querySelector(".product-info");
    m.innerHTML=html;
    document.querySelector(".cartLen").innerHTML=` (${cart.length} item)`;
    order();
}
function order(){
    var price=0; 
    let p=document.querySelectorAll(".price");
    for(let i=0;i<p.length;i++)
    {
        price+=Number(p[i].innerHTML.split('&#8377')[1]);
    }
    var t=document.querySelectorAll(".total")
    t.forEach(function myF(item){
        item.innerHTML=`&#8377 ${price}`;
    })
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.querySelector('.modal');
    if (event.target == modal) {
        modal.style.display = "none";
        cart.splice(0,cart.length);
        myfun();
    }
}
function insertion(productId) {
    fetch('/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Product added to cart!');
        } else {
            alert('Failed to add product to cart.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}