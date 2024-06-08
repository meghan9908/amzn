function expansion(element) {
    const expandedClass = 'expanded';
    const allContainers = document.querySelectorAll('.container');
    const wrapper = document.querySelector('.trending_deals_wrapper');
    const currentlyExpanded = document.querySelector(`.${expandedClass}`);

    if (currentlyExpanded && currentlyExpanded !== element) {
        currentlyExpanded.classList.remove(expandedClass);
        allContainers.forEach(container => {
            if (container !== element) container.style.display = 'flex';
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