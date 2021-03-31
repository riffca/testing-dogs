<template>
	<div ref='img' :style="{'background-size': 'cover', 'background-image': `url(${dog.img})`}" class="dog-card">
		<div v-show="dog.saved">
			<img class="card-heart" src="/img/heart.png" alt="">
		</div>		
		<div class="preview-img">
			<img class="card-heart" src="/img/dog-placeholder.jpg" alt="">
		</div>
	</div>
</template>

<script>

import { mapState } from 'vuex'
export default {
	beforeDestroy(){
		this.isLastDog(()=>	this.infiniteScrollObserver.unobserve(this.$refs.img))
	},
	mounted(){
		this.isLastDog(()=>this.infiniteScrollObserver.observe(this.$refs.img))
	},
	methods: {
		isLastDog(cb){
			if(this.dogIndex === this.dogs.length -1) cb()
		}
	},
	watch:{
		dogs(val){
			if(this.dogIndex !== val.length -1) {
				this.infiniteScrollObserver.unobserve(this.$refs.img)
			}
		}
	},
	computed: {
		...mapState(['dogs', 'infiniteScrollObserver'])
	},
	name: 'DogCard',
	props: {
		dog: Object,
		dogIndex: Number
	},
}
</script>

<style lang="scss">

.dog-card {
	position: relative;
	cursor: pointer;
	margin: .5vw;
	width: 100%;
	height: 20vw;


	.card-heart {
		max-width: 13%;
		height: auto; 
		width: auto; 
		max-height: 34vh;
		margin-top: 5%;
	}

	.preview-img {
		position: absolute;	
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 	-10;

		img {
			min-width: 3vw;
		}
	}
}


</style>