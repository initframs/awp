<script>
    let { onAdd } = $props();

    let open = $state(false);

    let workoutType = $state('cycling');
    let workoutIntensity = $state('ss');
    let hours = $state(0);
    let minutes = $state(0);

    function addWorkout() {
        const totalMinutes = Number(hours) * 60 + Number(minutes);

        if (totalMinutes <= 0) return;

        onAdd({
            id: crypto.randomUUID(),
            type: workoutType,
            intensity: workoutIntensity,
            duration: totalMinutes,
            date: new Date().toISOString()
        });

        hours = 0;
        minutes = 0;
        open = false;
    }
</script>

{#if !open}
    <button
        class="add-button"
        style="position: fixed; bottom: 20px; right: 20px;"
        onclick={() => (open = true)}
    >
        +
    </button>
{/if}

{#if open}
    <div
        class="backdrop"
        role="presentation"
        onclick={() => (open = false)}
    >
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
            class="modal"
            role="dialog"
            aria-modal="true"
            onclick={(e) => e.stopPropagation()}
            tabindex="-1"
        >
            <button class="close-button" onclick={() => (open = false)}>
                &times;
            </button>

            <h2>Add Workout</h2>
            <label for="workout-type">Workout Type</label>
            <select bind:value={workoutType}>
                <option value="cycling">Cycling</option>
                <option value="running">Running</option>
                <option value="erging">Erging</option>
            </select>

            <label for="workout-intensity">Workout Intensity</label>
            <select id="workout-intensity" name="workout-intensity" bind:value={workoutIntensity}>
                <option value="ss">Steady State</option>
                <option value="at">Aerobic Threshold</option>
            </select>
            <br/>
            <br/>
            <p>
                <span style="font-weight: bold; color: var(--blue);">Steady State</span> is a low to moderate intensity workout, relative effort about 4-6 out of 10. You should be able to speak complete sentences and require little recovery time after the workout.
            </p>
            <br />
            <p>
                <span style="font-weight: bold; color: var(--red);">Aerobic Threshold</span> is a moderate to high intensity workout, relative effort about 7-8 out of 10. You should be able to speak a few words but it should feel uncomfortable/painful, and require recovery time after the workout.
            </p>
            <br />
            <div class="time-inputs">
                <label for="workout-hours">Time (hours)</label>
                <input type="number" id="workout-hours" name="workout-hours" min="0" max="23" bind:value={hours} />
                <label for="workout-minutes">Time (minutes)</label>
                <input type="number" id="workout-minutes" name="workout-minutes" min="0" max="59" bind:value={minutes} />
            </div>
            <br/>
            <button onclick={addWorkout}>Add Workout</button>
        </div>
    </div>
{/if}

<style>
    .add-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: black;
        color: white;
        border: none;
        border-radius: 12px;
        width: 50px;
        height: 50px;
        font-size: 36px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0 4px;
    }

    .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        z-index: 100;
    }

    .modal {
        position: relative;
        background: var(--bg);
        color: #222;
        width: 100%;
        max-width: 400px;
        padding: 28px 24px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        border:2px solid var(--red);
    }

    .modal h2 {
        margin: 0 0 12px;
        font-size: 22px;
    }

    .modal p {
        color: black;
        font-size: 15px;
        margin: 0;
    }

    label {
        display: block;
        margin: 12px 0 4px;
        font-weight: bold;
    }

    select {
        width: 100%;
        padding: 8px;
        font-size: 16px;
        border-radius: 4px;
        border: 1px solid #000000;
        background: white;
        color: black;
    }

    .time-inputs {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .time-inputs input {
        width: 60px;
        padding: 8px;
        font-size: 16px;
        border-radius: 4px;
        border: 1px solid #000000;
        background: white;
        color: black;
    }

    .time-inputs label {
        margin: 0;
    }

    button {
        background: var(--red);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 16px;
        font-size: 16px;
        cursor: pointer;
    }

    .close-button {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 32px;
        height: 32px;
        padding: 0;
        border: none;
        border-radius: 20%;
        background: black;
        color: white;
        font-size: 22px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 4px;
    }
</style>