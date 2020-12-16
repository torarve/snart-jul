import { firstSundayOfAdvent, isXmas } from './functions';
import { createChart } from './chart';

document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const title = document.getElementById('title');
    const element = document.getElementById('count-down');
    setInterval((title, element) => {
        const now = new Date();
        const xmas = new Date(now.getFullYear(), 11, 24);
        let diff = Math.trunc((xmas - now) / 1000); // seconds left
        const seconds = diff % 60;
        diff = Math.trunc(diff / 60); // minutes left
        const minutes = diff % 60;
        diff = Math.trunc(diff / 60); // hours left
        const hours = diff % 24;
        const days = Math.trunc(diff / 24); // days left

        if (!isXmas(now)) {
            title.innerText = 'Snart jul?'
            element.innerText = `Det er ${days} dager ${hours} timer ${minutes} minutt og  ${seconds} sekund til jul.`;
        }
        else {
            title.innerText = 'Det er jul!'
            if(now.getMonth()==11)
            {
                switch(now.getDate()) 
                {
                    case 24:
                        element.innerHTML = 'I dag er det <a href="https://no.wikipedia.org/wiki/Julaften">julaften</a>.';
                        break;
                    case 25:
                        element.innerHTML = 'I dag er <a href="https://no.wikipedia.org/wiki/F%C3%B8rste_juledag">første juledag</a>.';
                        break;
                    case 26:
                        element.innerHTML = 'I dag er <a href="https://no.wikipedia.org/wiki/Andre_juledag">andre juledag</a>.';
                        break;
                    default:
                        element.innerHTML = `I dag er <a href="https://no.wikipedia.org/wiki/Tyvendedag_jul">${now.getDate()-24}. dag jul.</a>.`;
                        break;
                }
            }
            else {
                element.innerHTML = `I dag er <a href="https://no.wikipedia.org/wiki/Tyvendedag_jul">${now.getDate()+7}. dag jul</a>.`;
            }
        }
    }, 500, title, element);

    console.log(firstSundayOfAdvent(2020));
    createChart();
});