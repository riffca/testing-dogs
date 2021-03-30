<template>
	<div ref="list" class="dogs-list">
		<div class="dogs-list__dog-card" :ref="'dogCard'+index" v-for="(dog,index) in items" :key="index">
			<DogCard :dog="dog" />
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

	mounted(){

		if(this.getLastRef() && this.scrollFunc) {
			// для того, чтобы все время наблюдать за последним элементом списка
			// мы используем нечто вроде замыкания
			// прекращаем наблюдать за целевым элементом после создания очередного li
			// и начинаем наблюдать за этим новым (последним) элементом
			let observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {

					console.log('some---->',entry)

					if (entry.isIntersecting) {
						this.$store.dispatch('loadMoreDogs')
					}
					observer.unobserve(entry.target)
					observer.observe(this.getLastRef())
				})
			}, {
				threshold: 1
			})

			observer.observe(this.getLastRef())

		}


	},

	methods: {
		getLastRef(){
			return this.$refs['dogCard'+this.items.length-1]
		}
	},
	data () {
		return {

		}
	}
}
</script>

<style lang="scss">

.dogs-list {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	gap: 0px 0px;
}

.dogs-list__dog-card {

	img {
		max-width:5vw;

	}

}
</style>