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
