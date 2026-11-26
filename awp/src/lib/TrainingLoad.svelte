<script>
    let { trainingMinutes = 0, ssTime = 0, atTime = 0, trainingGoal = 0, ssGoal = 0, atGoal = 0 } = $props();

    let totalHours = $derived(Math.floor(trainingMinutes / 60));
    let totalMinutes = $derived(trainingMinutes % 60);

    let totalGoalHours = $derived(Math.floor(trainingGoal / 60));
    let totalGoalMinutes = $derived(trainingGoal % 60);

    let totalGoalPercent = $derived(Math.floor((trainingMinutes / trainingGoal) * 100));

    let ssHours = $derived(Math.floor(ssTime / 60));
    let ssMinutes = $derived(ssTime % 60);

    let ssGoalHours = $derived(Math.floor(ssGoal / 60));
    let ssGoalMinutes = $derived(ssGoal % 60);

    let ssGoalPercent = $derived(Math.floor((ssTime / ssGoal) * 100));

    let atHours = $derived(Math.floor(atTime / 60));
    let atMinutes = $derived(atTime % 60);

    let atGoalHours = $derived(Math.floor(atGoal / 60));
    let atGoalMinutes = $derived(atGoal % 60);

    let atGoalPercent = $derived(Math.floor((atTime / atGoal) * 100));

</script>

<section class="training-load">
<div>
    <h2>Total Time</h2>
    <h1>{totalHours}h {totalMinutes}m/{totalGoalHours}h {totalGoalMinutes}m</h1>
    <p>{totalGoalPercent}% of goal</p>
</div>
<div>
    <h3>Steady State Time</h3>
    <h2>{ssHours}h {ssMinutes}m/{ssGoalHours}h {ssGoalMinutes}m</h2>
    <p>{ssGoalPercent}% of goal</p>
</div>
<div>
    <h3>Aerobic Threshold Time</h3>
    <h2>{atHours}h {atMinutes}m/{atGoalHours}h {atGoalMinutes}m</h2>
    <p>{atGoalPercent}% of goal</p>
</div>
</section>

<style>
.training-load {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin:0;
    margin-bottom: 25px;
}

.training-load div {
    margin: 25px;
    margin-bottom: 0;
}

.training-load h1, .training-load h2, .training-load h3 {
    margin: 0;
}

.training-load p {
    margin: 0;
    font-size: 1.5em;
}

.training-load h1 {
    font-size: 2.5em;
}

.training-load > div:nth-child(2) h2 {
    text-decoration: underline;
    text-decoration-color: var(--blue);
    text-decoration-thickness: 4px;
}

.training-load > div:nth-child(3) h2 {
    text-decoration: underline;
    text-decoration-color: var(--red);
    text-decoration-thickness: 4px;
}
</style>