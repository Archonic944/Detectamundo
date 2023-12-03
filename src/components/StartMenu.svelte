<svelte:options accessors={true}/>
<script type="js">
  import StartButton from './StartButton.svelte';
  import PlayerList from './PlayerList.svelte';
  import { createEventDispatcher } from 'svelte';
    import { gameStore } from '../gameStore';
  let playerList;
  const dispatch = createEventDispatcher();
  function preGame(){
    dispatch('preGame', {players: playerList.players});
  }
</script>

<main>
  <p>
    A game for multiple players. One is a spy, and must try their best to blend in answering questions about the selected location, while not knowing what it is. Each will be told their role after clicking start.
  </p>
  <StartButton on:click={preGame}/>
  <PlayerList bind:this={playerList}/>
</main>