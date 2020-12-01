document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const xmas = new Date(now.getFullYear(), 11, 24);
    const element = document.getElementById('count-down');

    setInterval((xmas, element) => {
        const now = new Date();
        let diff = Math.trunc((xmas - now) / 1000); // seconds left
        const seconds = diff % 60;
        diff = Math.trunc(diff / 60); // minutes left
        const minutes = diff % 60;
        diff = Math.trunc(diff / 60); // hours left
        const hours = diff % 24;
        const days = Math.trunc(diff / 24); // days left

        element.innerHTML = `Det er ${days} dager ${hours} timer ${minutes} minutt og  ${seconds} sekund til jul.`;
    }, 500, xmas, element);
});