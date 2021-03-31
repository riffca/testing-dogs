<template>
	<div id="app">
		<AppHeader />
		<router-view></router-view>
	</div>
</template>

<script>

import AppHeader from '@/components/AppHeader'
export default {

	components: {
		AppHeader
	},
	async created(){

		this.$store.dispatch('listBreeds')

	},

}




</script>

<style lang="scss">

* {
	margin: 0;
}

.center {
	display: flex;
	justify-content: center;
	align-items: center;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

</style>
