<script type="js">
  import PreGame from './PreGame.svelte';
import LocationsList from './components/LocationsList.svelte';
  import StartMenu from './components/StartMenu.svelte'
    import { gameStore } from './gameStore';
    import Game from './components/Game.svelte';
    import Vote from './components/Vote.svelte';
  import PlayAgainButton from './components/PlayAgainButton.svelte';
  let locationsElement;
  function preGame(event){
    gameStore.update(value => {
      value.locations = locationsElement.locations;
      value.players = event.detail.players;
      value.phase = "pregame";
      return value;
    });
  }
</script>
<main>
  <h1>
    Detectamundo!
  </h1>
  {#if $gameStore.phase == "prepregame"}
    <StartMenu on:preGame={preGame}/>
    <h2>Locations</h2>
    <LocationsList bind:this={locationsElement}/>
  {:else if $gameStore.phase == "pregame"}
    <PreGame/>
  {:else if $gameStore.phase == "game"}
    <Game/>
  {:else if $gameStore.phase == "vote"}
    <audio src="/src/assets/snd_pling.m4a" preload="auto" autoplay={true} controls={false} loop={false}></audio>
    <Vote/>
  {:else}
    {#if $gameStore.phase == "spyguessed"}
      <h2 style="color:green;">The spy has been guessed!</h2>
      <p><strong style="color:darkcyan;">{$gameStore.players[$gameStore.spy]}</strong> was the spy.</p>
      <PlayAgainButton/>
    {:else if $gameStore.phase == "spynotguessed"}
      <h2 style="color:darkred;">The spy was not guessed!</h2>
      <p><strong color="darkcyan;">{$gameStore.players[$gameStore.spy]}</strong> was the spy.</p>
      <PlayAgainButton/>
    {/if}
  {/if}
</main>
