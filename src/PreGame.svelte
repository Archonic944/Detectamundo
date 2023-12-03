<svelte:options accessors={true}/>
<script>
    import { getContext } from "svelte";
    import LocationsList from "./components/LocationsList.svelte";
    import StartButton from "./components/StartButton.svelte";
    import { gameStore } from "./gameStore";
    import { get } from "svelte/store";
    //player whose status is currently revealed
    let revealed = "";
    let hasBeenRevealed = [];
    for(let i = 0; i < $gameStore.players.length; i++){
        hasBeenRevealed.push(false);
    }
    //pick random player to be spy
    let spy = Math.floor(Math.random() * $gameStore.players.length);
    //pick random location to be location
    $gameStore.location = $gameStore.locations[Math.floor(Math.random() * $gameStore.locations.length)];
    //display overlay that tells whether the player is a spy
    function reveal(player){
        //unreveal player if they are already revealed
        if(player == revealed){
            revealed = "";
            hasBeenRevealed[$gameStore.players.indexOf(player)] = true;
            return;
        }
        revealed = player;
    }
    //returns a style string that scales the text to fit the container
    function scaleText(str){
        if(str.length >= 10){
            return "font-size: 16px;"
        }else return "";
    }
    function startGame(){
        gameStore.update((value) => {
            value.phase = "game";
            value.spy = spy;
            return value;
        });
    }
</script>

<main>
    <h2><strong>One of these players is the spy!</strong></h2>
    <p>Click 'reveal' next to your name to show the location, or your role if you're a spy.</p>
    <div id="players-container">
        {#each $gameStore.players as player}
            <div class="player-container">
                <div class="player-info">
                    <button class="reveal-button" on:click={() => reveal(player)}>{player == revealed ? "Done" : "Reveal"}</button>
                    <strong class="player-name" style={scaleText(player)}>{player}</strong>
                    {#if player == revealed}
                        {#if player == $gameStore.players[spy]}
                            <strong class="status-text" style="color:red;">SPY </strong>
                        {:else}
                            <strong class="status-text" style={"color:green;" + scaleText($gameStore.location)}>{$gameStore.location}</strong>
                        {/if}
                    {:else if hasBeenRevealed[$gameStore.players.indexOf(player)]}
                        <div class="status-text reveal-tag"><span class="sm-display">✓</span><span class="lg-display">revealed</span></div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
    {#if hasBeenRevealed.every((val, i, arr) => val === true)}
        <StartButton on:click={startGame}/>
    {/if}
    <h2 style="color:blueviolet;"><strong>Locations</strong></h2>
    <LocationsList locations={$gameStore.locations} showButtons={false}/>
</main>

<style>
.player-container {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
    font-size: 20px;
    width: 300px;
}

.player-info {
    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: auto;
    justify-items: center;
    margin: auto;
}

.reveal-button {
    grid-column: 1 / 2;
}

.status-text {
    grid-column: 3 / 4;
    justify-content: left;
    font-size: auto;
}

.reveal-button {
    background-color: rgb(51, 204, 204);
    color: white;
    border-radius: 5px;
    border-style: solid;
    border-width: 2px;
    border-color: rgb(31, 164, 184);
    width: 70px;
    height: 30px;
}

.reveal-button:hover {
    background-color: rgb(71, 224, 224);
}

.reveal-tag {
    background-color: rgb(238, 221, 64);
    color: white;
    border-radius: 20px;
    width: 75px;
    height: 20px;    
    font-size: small;
}

#players-container {
    min-width: min(85%, 500px);
    max-width: 70%;
    padding: 20px;
    border: 4px solid black;
    border-radius: 20px;
    margin: 15px auto 5px;
    display: flex;
    justify-content: center;
    flex-direction: column; /* Add this line */
}

.sm-display {
    display: none;
}

.lg-display {
    display: inline-block;
}
@media (max-width: 600px) {
    

    .sm-display {
        display: inline-block;
    }

    .lg-display {
        display: none;
    }

    .reveal-tag{
        width: 25px;
        height:20px;
        margin-left: -25px;
    }
    .player-info{
        grid-template-columns: auto 0.5fr auto;
    }
}
</style>
