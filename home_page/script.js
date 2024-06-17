document.getElementById('prev').addEventListener('click', function () {
    const box = document.querySelector('.box');
    const items = document.querySelectorAll('.item');
    box.prepend(items[items.length - 1]);
});

document.getElementById('next').addEventListener('click', function () {
    const box = document.querySelector('.box');
    const items = document.querySelectorAll('.item');
    box.appendChild(items[0]);
});

function expansion(element) {
    const expandedClass = 'expanded';
    const allContainers = document.querySelectorAll('.container');
    const wrapper = element.closest('.trending_deals_wrapper');
    const wrappers = document.querySelectorAll('.trending_deals_wrapper');
    const currentlyExpanded = document.querySelector(`.container.${expandedClass}`);

    if (currentlyExpanded && currentlyExpanded !== element) {
        currentlyExpanded.classList.remove(expandedClass);
        allContainers.forEach(container => {
            container.style.display = 'flex';
        });
    }

    element.classList.toggle(expandedClass);
    wrapper.classList.toggle(expandedClass);

    if (element.classList.contains(expandedClass)) {
        allContainers.forEach(container => {
            if (container !== element) container.style.display = 'none';
        });
    } else {
        allContainers.forEach(container => container.style.display = 'flex');
    }

    if (wrapper.classList.contains(expandedClass)) {
        wrappers.forEach(wrap => {
            if (!wrap.contains(element)) wrap.style.display = 'none';
        });
    } else {
        wrappers.forEach(wrap => wrap.style.display = 'flex');
    }
}

function slideLeft(cont = '') {
    const trendingDeals = document.querySelector(`.trending_deals${cont}`);
    const items = trendingDeals.querySelectorAll('.container');
    trendingDeals.prepend(items[items.length - 1]);
}

function slideRight(cont = '') {
    const trendingDeals = document.querySelector(`.trending_deals${cont}`);
    const items = trendingDeals.querySelectorAll('.container');
    trendingDeals.appendChild(items[0]);
}

document.addEventListener('DOMContentLoaded', function () {
    let interval = setInterval(() => slideRight(), 2000);

    document.querySelectorAll('.trending_deals_wrapper').forEach(wrapper => {
        wrapper.addEventListener('mouseover', function () {
            clearInterval(interval);
        });

        wrapper.addEventListener('mouseout', function () {
            interval = setInterval(() => slideRight(), 2000);
        });
    });
});
function addToCart(productId) {
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