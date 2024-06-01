document.getElementById('prev').addEventListener('click', function () {
    const box = document.querySelector('.box');
    const items = document.querySelectorAll('.item');
    box.prepend(items[items.length - 1]);
});
function next_switch() {
    const box = document.querySelector('.box');
    const items = document.querySelectorAll('.item');
    box.appendChild(items[0]);
}
document.getElementById('next').addEventListener('click',next_switch);
setInterval(next_switch,2000);