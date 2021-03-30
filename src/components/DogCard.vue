<template>
	<div @click="$store.dispatch('saveRemoveDog',dog)" class="dog-card">
		<img :src="dog.img">
		<div v-if="dog.saved" class="">
		</div>
	</div>
</template>

<script>


export default {

	name: 'DogCart',
	props: {
		dog: Object
	},
}
</script>

<style lang="scss">

.dog-card {

}


</style>