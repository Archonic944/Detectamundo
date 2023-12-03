<svelte:options accessors={true}/>
<script>
    import { get_current_component } from "svelte/internal";
    var instance = get_current_component()

  export var player;
  export var whenDestroyed;
  function onClickX(){
    whenDestroyed();
    instance.$destroy();
  }
</script>

<main>
  <div id="entry_box">
    <strong>{player} </strong> <button id="x_button" on:click={onClickX}>X</button>
  </div>
</main>

<style>
  #entry_box {
    min-height: 40;
    font-size: 16px;
    color: green;
    
  }
  #x_button {
    border: 2px solid darkred;
    background-color: rgb(243, 107, 123);
    border-radius: 4px;
  }
  main {
    scale: 1.2;
    margin: 10px;
  }
</style>