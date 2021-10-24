import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';

import { firstSundayOfAdvent, xmasFeeling } from './functions';

function inside(point, area) {
    return (area.top<point.y && point.y<area.bottom)
        && (area.left<point.x && point.x<area.right);
}

export function createChart() {
    const year = new Date().getFullYear();
    const chart = new Chart('chart', {
        type: 'line',
        options: {            
            scales: {
                x: {
                    type: 'time',
                    adapters: {
                        date: {
                            locale: nb,
                        },
                    },
                    time: {
                        unit: 'month',
                    }
                }
            },
            events: ['mousemove', 'touchmove'],
            onHover: function(evt, elements) {
                const area = chart.chartArea;
                const pos = getRelativePosition(evt, chart);
                chart.$marker.inside = false;
                if (inside(pos, area)) {
                    chart.$marker.position = pos;
                    chart.$marker.date = chart.scales.x.getValueForPixel(pos.x);
                    chart.$marker.inside = true;
                    chart.update();
                }
            },
        },
        plugins: 
        [
            {
                id: "my-chart-plugin",
                beforeInit: function(chart) {
                    chart.$marker = {
                        position: {x: 0, y: 0}
                    }
                },
                beforeDatasetsDraw: function(chart) {
                    const marker = chart.$marker;
                    const d = new Date(marker.date);
                    if(marker.inside) {
                        const area = chart.chartArea;
                        const pos = marker.position;
                        chart.ctx.save()
                        chart.ctx.beginPath();
                        chart.ctx.strokeStyle = "gray";
                        chart.ctx.moveTo(pos.x, area.top);
                        chart.ctx.lineTo(pos.x, area.bottom);
                        chart.ctx.stroke();
                        const dateStr = format(d, 'dd. MMM yyyy H:mm', { locale: nb });
                        const feeling = xmasFeeling(d);
                        const feelingStr = `Julefølelse ${(feeling*100).toFixed(2)}%`;
                        const w = Math.max(chart.ctx.measureText(dateStr).width, chart.ctx.measureText(feelingStr).width);
                        const xAdjust = (pos.x + w > area.right) ? -(w + 8) : 8;
                        chart.ctx.fillStyle = "gray";
                        chart.ctx.fillText(dateStr, pos.x + xAdjust, pos.y - 16);
                        chart.ctx.fillText(feelingStr, pos.x + xAdjust, pos.y);
                        chart.ctx.restore();
                    }
                },
            }
        ],
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