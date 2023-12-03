<script>
    import { gameStore } from "../gameStore";
    import StartButton from "./StartButton.svelte";
    //index of current voter in game.players
    let currentVoter = 0;
    let votes = [];
    let finished = false;
    for(let i = 0; i < $gameStore.players.length; i++){
        votes.push(0);
    };
    function vote(playerIndex){
        votes[playerIndex]++;
        if(currentVoter + 1 >= $gameStore.players.length){
            finished = true;
            currentVoter++;
        }else{
            currentVoter++;
        }
    }
    function finish(){
        let max = 0;
        let maxIndex = 0;
        let tie = true;
        //determine max votes
        for(let i = 0; i < votes.length; i++){
            if(votes[i] != max) tie = false;
            if(votes[i] > max){
                max = votes[i];
                maxIndex = i;
            }
        }
        if((maxIndex == $gameStore.spy) && !tie){
            gameStore.update(value => {
                value.phase = "spyguessed";
                return value;
            });
        }else{
            gameStore.update(value => {
                value.phase = "spynotguessed";
                return value;
            });
        }
    }
</script>

<main>
    <h2 style="margin-top:0px;">Time to vote!</h2>
    {#if !finished}<h2>Current voter: {$gameStore.players[currentVoter]}</h2>
    <p>Who do you think the spy is?</p>
    {:else}
    <p>Press the button to see the results!</p>
    {/if}
    {#each $gameStore.players as player, index}
        <div class="player-vote-option" style={currentVoter == index ? "color:orange;" : ""}>
            {player} 
            {#if !finished && currentVoter != index} 
                <button class="blue-button" on:click={() => vote(index)}>Vote</button>
            {/if}
            {#each {length: votes[index]} as _, i}
            <img src="/src/assets/person-svgrepo-com.svg" alt="voter" width="25" height="25">
            {/each}
        </div>
    {/each}
    {#if finished}
        <StartButton text="Finish" on:click={finish}/>
    {/if}
</main>

<style>
    .player-vote-option {
        margin: 10px auto;
        padding: 3px;
        width: 70%;
        font-weight: bold;
        border-top-style: solid;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: gray;
        font-size: 20px;
        color: darkcyan;
    }

    img{
        vertical-align: middle;
    }
</style>