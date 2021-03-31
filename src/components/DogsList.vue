<template>
	<div ref="list" class="dogs-list">
		<div
			@click="$store.dispatch('saveFavourite',dog)"
			class="center" :ref="'dogCard'+index" v-for="(dog,index) in items" :key="dog.id">
			<DogCard :dog="dog" :dogIndex="index" />
		</div>
	</div>
</template>

<script>

import DogCard from './DogCard'
export default {
	components: {DogCard},
	props: {
		items: {
			type: Array,
			default:()=>[]
		},
		scrollFunc: Function
	},
	created(){
		this.$store.commit('setObserver',()=>{
			return this.$store.dispatch('getDogsByBreed',{ breed: this.$route.params.breed, forceInsert: true })
		})
	},
}
</script>

<style lang="scss">

.dogs-list {
	padding: 1vw 10vw;
	margin-top: calc(12vh + 12px);
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	gap: .25vw .25vw;
}

</style>