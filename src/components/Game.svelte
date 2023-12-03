<script>
    import { onMount } from "svelte";
    import Timer from "./Timer.svelte";
    import { gameStore } from "../gameStore";
    let timer;
    function vote() {
        $gameStore.phase = "vote";
    }
</script>

<main>
    <Timer bind:this={timer} time={$gameStore.time} on:expire={vote}/>
    <button id="pausetimer" on:click={() => timer.paused = !timer.paused}>{(timer && timer.paused) ? "Unpause" : "Pause"}</button>
    <h2>Take turns asking questions about the location (e.g. Is this a good place to walk your dog?).<br>Anyone can start, and they can pick whoever they want.<br>After you answer a question, you can then ask anyone except who just asked you.</h2>
    <p style="color:gray;">The timer is counting down to when you must vote to guess who is the spy. If you choose to vote before the timer ends, you may.</p>
    <button class="blue-button" id="vote-button" on:click={vote}>Vote</button>
</main>

<style>
    #pausetimer {
        margin: 10px auto;
        width: 75px;
        height: 40px;
        border: 1px solid black;
        font-size: fit-content;
        padding: 2px;
    }

    #vote-button {
        margin: 10px auto;
        width: 35%;
        height: 100px;
        font-size: max(3vw, 25px);
    }

    @media only screen and (max-width: 600px) {
        #vote-button {
            height: 80px;
        }
    }
</style>