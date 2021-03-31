<template>
	<div class="home">
		<DogsList :key='nextKey' :items="dogs" />
	</div>
</template>

<script>
import DogsList from '@/components/DogsList.vue'
import { mapState } from 'vuex'
export default {
	name: 'Home',
	components: {
		DogsList
	},
	computed: {
		...mapState(['dogs'])
	},
	data(){
		return {
			nextKey: 1
		}
	},
	watch: {
		$route(){
			this.runList()
			this.nextKey++
		}
	},
	created(){
	
		if(this.$route.params.breed !== '') {
			this.runList()
		}

	},
	methods: {
		runList(forceInsert){
			let breed = this.$route.params.breed
			this.$store.dispatch('getDogsByBreed', { breed, forceInsert })
		}
	}
}
</script>
