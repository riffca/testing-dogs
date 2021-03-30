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
	data(){
		return {
			viewKey: 1,
		}
	},	
	async created(){

		this.$store.dispatch('setupDogs')
		this.$store.dispatch('listBreeds')

	},
	// mounted(){
	// 	this.updateViewKey()
	// },
	// methods: {
	// 	updateViewKey() {
	// 		this.viewKey+=1;
	// 	}

	// }


}




</script>

<style lang="scss">

* {
	margin: 0;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

</style>
