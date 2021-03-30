<template>
	<div class="home">
		<DogsList :items="$store.state.dogs" :scrollFunc="runList(true)" />
	</div>
</template>

<script>
import DogsList from '@/components/DogsList.vue'

export default {
	name: 'Home',
	components: {
		DogsList
	},
	watch: {
		$route(){
			this.runList()
		}
	},
	created(){
		this.runList()
	},
	methods: {
		runList(forceInsert){
			let breed = this.$route.params.breed
			if(breed) {
				this.$store.dispatch('getDogsByBreed', { breed, forceInsert })
			} 
		}
	}
}
</script>
