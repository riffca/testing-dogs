<template>
	<header>
		<router-link :to="{ name: 'home' }">Home</router-link>
		<router-link :to="{ name: 'favourites' }">Favourites</router-link>
		<select placeholder="Select breed" v-model="selectedBreed">
			<option value="" disabled selected>select breed...</option>
			<option :key="index" v-for="breed, index in breedList" :value="breed">{{breed}}</option>
		</select>	
	</header>
</template>

<script>

import { mapState} from 'vuex'
export default {
	computed: {
		...mapState(['breedList'])
	},
	name: 'AppHeader',

	data () {
		return {
			selectedBreed: '',
		}
	},

	watch: {
		// $route(val){
		// 	if(['home', 'favourites'].includes(val.name)) {
		// 		this.selectedBreed = ''
		// 	}
		// },
		async selectedBreed(val){
			this.$router.push({name: 'dogs-show', params: { breed: val }})
		}
	}
}
</script>

<style lang="scss">

header {
	//background: #0061ffd9;
	background: #3d87ff;
	padding: 4vh;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	right: 0;
	a {

		margin: 0 2vw;
		color: blue;
		font-weight: bold;

		text-decoration: none;

		&.router-link-exact-active {
			color: white;
		}
	}

	select {
		font-weight: bold;
		font-size: 16px;

		option:first {
			color: blue;
		} 
	}
}

</style>