<script lang='ts'>
	export let data;
	export let form;


	// your script goes here

console.log(data.datasetInfo.features)



</script>
<form method="POST" action="?/search">
	<label>
		query from db
		<input name="query" >
	</label>
	<button> send query </button>
</form>
