<script>
    import { onMount } from "svelte";
    import { GameValues, gameStore } from "./gameStore";
    import GameController from "./GameController.svelte";
    import { get_current_component } from "svelte/internal";
    import { get } from "svelte/store";
    let instance = get_current_component();
    gameStore.set(new GameValues(instance));
    let active = true;
    export function restart(){
        active = false; //deload game controller to make sure nothing funky happens with subscriptions
        let values = new GameValues(instance);
        values.locations = $gameStore.locations;
        values.players = $gameStore.players;
        gameStore.set(values);
        active = true;
    }
</script>

<main>
    {#if active}
        <GameController/>
    {/if}
</main>