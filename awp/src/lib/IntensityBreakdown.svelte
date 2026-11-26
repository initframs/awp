<script>
    // @ts-nocheck
    import { Chart } from 'frappe-charts';
    import 'frappe-charts/dist/frappe-charts.min.css';

    let {
        ssTime = 0,
        atTime = 0,
    } = $props();

    let actualChartContainer;
    let actualChart;

    const FrappeChart = Chart;

    $effect(() => {
        if (!actualChartContainer) return;

        const actualValues = [ssTime, atTime];

        actualChart?.destroy();

        if (ssTime + atTime > 0) {
            actualChart = new FrappeChart(actualChartContainer, {
                type: 'pie',
                height: 250,
                data: {
                    labels: ['SS Minutes', 'AT Minutes'],
                    datasets: [{ values: actualValues }]
                },
                colors: ['var(--blue)', 'var(--red)']
            });
        }

        return () => {
            actualChart?.destroy();
        };
    });
</script>

<section class="intensity-breakdown">
    <div class="chart-section">
        <h2>Intensity Breakdown</h2>
        <div class="chart-container" bind:this={actualChartContainer}></div>
    </div>
</section>

<style>
    .intensity-breakdown {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        margin: 25px;
        margin-top: 40px;
    }

    .chart-section {
        flex: 1;
        min-width: 280px;
    }

    .chart-section h2 {
        margin: 0 0 15px 0;
        font-size: 1.5em;
    }

    .chart-container {
        width: 100%;
        max-width: 300px;
    }

    .intensity-breakdown {
        flex-direction: column;
        gap: 35px;
    }

    .chart-section {
        width: 100%;
    }
</style>