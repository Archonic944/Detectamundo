<svelte:options accessors/>
<script>
  import PlayerListEntry from './PlayerListEntry.svelte'
  let container;
  let playerName;
  export let players = [];
  function onAdd(){
    if(playerName){
      let entry = new PlayerListEntry({
        target: container,
        props: {
          player: playerName,
          whenDestroyed: () => {
            let index = players.indexOf(entry.player);
            if(index > -1) players.splice(index, 1);
          }
        }
      });
      players.push(playerName);
      playerName = "";
    }
  }
  function keyPress(event){
    if(event.key == "Enter") onAdd();
  }
</script>

<main>
<div id="add-player-container">
  add player: <input on:keyup={keyPress} type="text" placeholder="player name..." bind:value={playerName}> <button id="add-player-button" class="blue-button" on:click={onAdd} >
    <strong>+</strong>
  </button>
</div>
<div id="players-container" bind:this={container}></div>
</main>

<style>
  #add-player-container {
    font-size: 18px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  
  #add-player-button {
    width: 25px;
    height: 25px;
  }
  input {
    min-width: 20px;
    margin-left: 5px;
    margin-right: 5px;
  }
</style>