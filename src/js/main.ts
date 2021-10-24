import { isXmas, xmasEve, xmasFeeling } from './functions';
import { createChart } from './chart';
import { differenceInCalendarDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const title = document.getElementById('title');
    const element = document.getElementById('count-down');
    const feelingElement = document.getElementById('xmas-feeling');
    setInterval((title, element) => {
        const now = new Date();
        if (!isXmas(now)) {
            title.innerHTML = 'Snart <a href="https://no.wikipedia.org/wiki/Jul">jul</a>?';
            const xmas = xmasEve(now);
            const seconds = differenceInSeconds(xmas, now, { roundingMethod: 'floor' }) %60;
            const minutes = differenceInMinutes(xmas, now, { roundingMethod: 'floor' }) % 60;
            const hours = differenceInHours(xmas, now, { roundingMethod: 'floor' }) % 24;
            const days = differenceInCalendarDays(xmas, now);
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

        const currentFeeling = xmasFeeling(now)*100;
        feelingElement.innerText = `Din julefølelse er nå ${currentFeeling.toFixed(2)}%`;
    }, 500, title, element);

    createChart();
});