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
    const wrapper = document.querySelector('.trending_deals_wrapper');
    const currentlyExpanded = document.querySelector(`.${expandedClass}`);

    if (currentlyExpanded && currentlyExpanded !== element) {
        currentlyExpanded.classList.remove(expandedClass);
        allContainers.forEach(container => {
            if (container !== element) {
                
                container.style.display = 'flex';
            }
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
}

function slideLeft() {
    const trendingDeals = document.querySelector('.trending_deals');
    const item = document.querySelectorAll('.container');
    trendingDeals.prepend(item[item.length - 1]);
}

function slideRight() {
    const trendingDeals = document.querySelector('.trending_deals');
    const item = document.querySelectorAll('.container');
    trendingDeals.appendChild(item[0]);
}

document.addEventListener('DOMContentLoaded', function () {
    let interval = setInterval(slideRight, 2000);

    document.querySelector('.trending_deals_wrapper').addEventListener('mouseover', function () {
        clearInterval(interval);
    });

    document.querySelector('.trending_deals_wrapper').addEventListener('mouseout', function () {
        interval = setInterval(slideRight, 2000);
    });
});
