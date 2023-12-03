<svelte:options accessors/>
<script>
    import { createEventDispatcher } from "svelte";
    //time in seconds
    export let time = 0;
    export let paused = false;
    let intervalId = [0];
    intervalId[0] = setInterval(() => {
        if(!paused){
            time--;
            if(time < 0){
                dispatch("expire");
                clearInterval(intervalId[0]);
            }
        }
    }, 1000);
    const dispatch = createEventDispatcher();
</script>

<main>
    <!-- This h1 element displays the time remaining in the timer. The class applied to it changes depending on the time remaining. -->
    <h1 
        class={paused ? "paused" : (time > 60 ? "fine" : (time > 10 ? "danger-zone" : "running-out"))}
    >        
        <!-- The time remaining is displayed in minutes and seconds. -->
        {Math.floor(time/60)}:{("" + Math.floor(time % 60)).padStart(2, "0")}
    </h1>
</main>

<style>
    .running-out{
        color: red;
    }

    .danger-zone {
        color: rgb(234, 219, 20);
    }

    .fine {
        color: green;
    }

    .paused {
        color: rgb(32, 170, 230)
    }

    h1{
        font-size: 8em;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>