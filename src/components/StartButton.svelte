<script>
  export let text = "Start game";
</script>

<main>
  <button on:click>
    {text}
  </button>
</main>

<style>
  button{
    width: 115px;
    height: 50px;
    background-color: lightgreen;
    border-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    appearance: none;
    border-style: none;
    border-width: 0px;
    margin: 15px auto 15px auto;
  }
  button:hover{
    background-color: rgb(117, 227, 117);
  }
</style>