import { Chart } from 'chart.js';
import { firstSundayOfAdvent } from './functions';

export function createChart() {
    const year = new Date().getFullYear();
    const chart = new Chart('chart', {
        type: 'line',
        options: {
            title: 'Julefølelse',
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'month',
                        displayFormats: {
                            second: 'HH:mm:ss',
                            minute: 'HH:mm',
                        }
                    }
                }]
            },
            tooltips: {
                enabled: false,
            }
        },
        data: {
            datasets: [{
                label: `Julefølelse ${year}`,
                backgroundColor: "#b3000c80",
                lineTension: 0,
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