<script>
    // @ts-nocheck
    import { onMount } from 'svelte';

    import TrainingLoad from './lib/TrainingLoad.svelte';
    import IntensityBreakdown from './lib/IntensityBreakdown.svelte';
    import AddWorkout from './lib/AddWorkout.svelte';

    let workouts = $state([]);

    onMount(() => {
        const saved = localStorage.getItem('workouts');

        if (saved) {
            try {
                workouts = JSON.parse(saved);
            } catch {
                workouts = [];
            }
        }
    });

    $effect(() => {
        localStorage.setItem('workouts', JSON.stringify(workouts));
    });

    function addWorkout(workout) {
        workouts = [...workouts, workout];
    }

    let trainingMinutes = $derived(
        workouts.reduce((sum, w) => sum + w.duration, 0)
    );

    let ssTime = $derived(
        workouts
            .filter(w => w.intensity === 'ss')
            .reduce((sum, w) => sum + w.duration, 0)
    );

    let atTime = $derived(
        workouts
            .filter(w => w.intensity === 'at')
            .reduce((sum, w) => sum + w.duration, 0)
    );
</script>

<h1 id="title">awp</h1>

<TrainingLoad
    {trainingMinutes}
    {ssTime}
    {atTime}
    trainingGoal={180} // todo: make this configurable
    ssGoal={90}
    atGoal={60}
/>

<IntensityBreakdown
    {ssTime}
    {atTime}
/>

<AddWorkout onAdd={addWorkout} />

<h2 id="workout-history">Workout History</h2>

{#each workouts as workout (workout.id)}
    <div class="workout">
        <strong>{workout.type}</strong>
        <span>{workout.intensity === 'ss' ? 'Steady State' : 'Aerobic Threshold'}</span>
        <span>{workout.duration} minutes</span>
        <span>{new Date(workout.date).toLocaleDateString()}</span>
    </div>
{/each}

<style>
  #workout-history {
    margin-top: 40px;
    margin-left: 25px;
  }
  .workout {
    display: flex;
    gap: 10px;
    margin: 5px 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .workout strong {
    flex: 1;
  }
  .workout span {
    flex: 1;
  }
</style>