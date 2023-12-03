<script>
    import { GameValues, gameStore } from "../gameStore";
    import StartButton from "./StartButton.svelte";

</script>
<main>
    <StartButton text="Play again" on:click={() => $gameStore.app.restart()}/>
</main>