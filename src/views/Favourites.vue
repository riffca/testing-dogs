<template>
	<div class="favourites">
		<DogsList offLoad :items="withHeart" />
	</div>
</template>

<script>
import DogsList from '@/components/DogsList.vue'
import { storage, convertDogs } from '@/utils/common'
export default {
	name: 'Home',
	components: {
		DogsList
	},
	data(){
		return {
			savedDogs: []
		}
	},
	created(){
		this.runList()
	},

	computed: {
		withHeart(){
			return convertDogs(this.savedDogs)
		}
	},
	methods: {
		runList(){
			this.savedDogs = storage.favourites.documents
		}
	}
}
</script>