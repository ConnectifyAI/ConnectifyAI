<script lang="ts">
    export let contents:Array<string>;
    export let title:string;
    </script>

<form method="GET" action="/login">
<div class="flex space-x-4 items-center">
    <h1>{title}:</h1>
    <select name={title} id={title} class="rounded-lg outline-gris">
        <option>select</option>
        {#each contents as value}
            <option value={value} class="text-gris font-dmMono">{value}</option>
        {/each}
    </select>
</div>
</form>
