<template>
	<header>
		<router-link to="/">Home</router-link>
		<router-link to="/favourites">Favorites</router-link>
		<select v-model="selectedBreed">
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
		async selectedBreed(val){
			this.$router.push({name: 'dogs-show', params: { breed: val }})
		}
	}
}
</script>

<style lang="scss">

header {
	background: #0061ffd9;
	padding: 4vh;

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
	}
}

</style>