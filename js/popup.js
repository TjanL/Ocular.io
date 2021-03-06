let sites = $("#sites");

const storage = new Storage();
await storage.openDatabase();
const utils = new Utils(storage);
const limit = 6;

let daily = await utils.dailyReport();
let dailyData = {
    labels: daily.chart.labels.slice(0, limit),
    datasets: [{
        data: daily.chart.data.slice(0, limit),
        backgroundColor: [
            'rgba(225,75,126,1)',
            'rgba(213,36,96,1)',
            'rgba(232,118,157,1)',
            'rgba(221,53,110,1)',
            'rgba(191,32,86,1)',
            'rgba(228,97,141,1)'
        ]
    }]
};

let ctx = $("#daily");
let barChart = new Chart(ctx, {
    type: 'bar',
    data: dailyData,
    options: {
        indexAxis: 'y',
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

daily.chart.labels.slice(0, limit).forEach((label) => {
    sites.append(
        `<li>
            <h5 style="margin: 0">
                ${label}<br>
                <p class="text-muted" style="margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${daily.data[label].join(", ").toString()}</p>
            </h5>
        </li>
        `
    );
});
