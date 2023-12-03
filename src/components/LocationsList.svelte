<svelte:options accessors={true}/>
<script>
    export let showButtons = true;
    export let locations = [
        "Park",
        "Parking Garage",
        "McDonalds",
        "Disney World",
        "Sewer Tunnel",
        "Construction Site",
        "Pride Parade",
        "Ski Resort",
        "Gas Giant",
        "United Nations Conference",
        "Karate Studio",
        "Office",
        "Beach",
        "Terrorist Base",
        "Volcano",
        "Heaven",
        "Tortoise Habitat",
        "Active Blender",
        "Fancy Restaurant",
        "Casino",
        "Gym",
        "Climbing Gym",
        "Jerusalem",
        "Hell",
        "Desert Island",
        "Airport",
        "Airplane",
        "Movie Set",
        "Cornfield",
        "Professional Kitchen",
        "Jail",
        "Nightclub",
        "Dad's Birthday Party",
        "Ice Skating Rink",
        "Zoo"
    ]
    function removeLocation(i){
        locations = [...locations.slice(0, i), ...locations.slice(i + 1)];
    }
</script>

<main>
    {#each locations as location, i}
        <div class="location-container"><strong>{location} </strong>
        {#if showButtons}
            <button on:click={() => removeLocation(i)} class="location-remove-button">X</button>
        {/if}
        </div>
    {/each}
</main>

<style>
    button:hover{
        background-color: rgb(190, 190, 190);
    }

    button{
        background-color: rgb(164, 164, 164);
        border-width: 1px;
        border-style: solid;
        border-color: black;
        border-radius: 5px;
    }
</style>