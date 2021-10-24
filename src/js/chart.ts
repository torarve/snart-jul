import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

import { firstSundayOfAdvent } from './functions';

export function createChart() {
    const year = new Date().getFullYear();
    const chart = new Chart('chart', {
        type: 'line',
        options: {            
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month',
                    }
                }
            },
        },
        data: {
            datasets: [{
                label: `Julefølelse ${year}`,
                fill: true,
                backgroundColor: '#b3000c80',
                pointRadius: 0,
                data: [
                    {x: new Date(year, 0, 1), y: 100},
                    {x: new Date(year, 0, 14), y: 0},
                    {x: new Date(year, 10, 1), y: 0},
                    {x: firstSundayOfAdvent(year), y: 10},
                    {x: new Date(year, 11, 24, 16, 0, 0), y: 100},
                    {x: new Date(year, 11, 31, 59, 59, 59), y:100}
                ]
            }]
        }
    });
}