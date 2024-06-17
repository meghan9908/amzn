    function qtyDec(x){
    let id=x.parentElement;
    if(id.querySelector('.qty').value!=1){
    id.querySelector('.qty').value=Number(id.querySelector('.qty').value)-1;
    let price=id.querySelector('.price').innerHTML;
    price=Number(price.split('₹')[1]);
    price=price-Number(id.dataset.price.split('₹')[1]);
    id.querySelector('.price').innerHTML='₹ '+price.toFixed(2);
    }
    else{
    deletep(x);
    }
    order();
    }
function qtyInc(x){
    let id=x.parentElement;
    id.querySelector('.qty').value=Number(id.querySelector('.qty').value)+1;
    let price=id.querySelector('.price').innerHTML;
    price=Number(price.split('₹')[1]);
    price=price+Number(id.dataset.price.split('₹')[1]);
    id.querySelector('.price').innerHTML='₹ '+price.toFixed(2);
    order();
}
function deletep(x){
    let id=x.parentElement;
    id.querySelector(".price").innerHTML='₹ '+0;
    id.parentElement.style.display='none';
    order();
    const productElement = x.closest('.product-details');
    const productId = productElement.getAttribute('data-id');

    delete_from_cart(productId);
}

function delete_from_cart(productId) {
    fetch('/cart/delete_from_cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Product removed from cart successfully');
            // Optionally, remove the product from the DOM
            document.querySelector(`.product-details[data-id="${productId}"]`).closest('.product-image-container').remove();
        } else {
            alert('Failed to remove product from cart');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function order(){
    var price=0; 
    let p=document.querySelectorAll(".price");
    for(let i=0;i<p.length;i++)
    {
        price+=Number(p[i].innerHTML.split('₹')[1]);
    }
    var t=document.querySelectorAll(".total");
    t.forEach(function(item){
        item.innerHTML=`&#8377 ${price.toFixed(2)}`;
    });
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
