import Vue from 'vue'
import Vuex from 'vuex'
import { request, storage, arrRandom } from '@/utils/common'
Vue.use(Vuex)

let store = new Vuex.Store({
	state: {
		dogs: [], 
		favourites: [],
		breedList: []
	},
	mutations: {
		'setDogs'(state, dogs){
			if(!dogs.some(i=>i.img)) {
				dogs = dogs.map(item=>({
					img: item, 
					saved: false,
				}))
			}
			state.dogs = dogs
		},
		'setFavourites'(state){
			state.favourites = storage.favourites.documents
		},	
		'setBreedList'(state, list){
			state.breedList = list
		}
	},
	actions: {
		async setupDogs({commit, dispatch}){
			commit('setFavourites')
			await dispatch('getDogsByBreed', {})
		},

		saveFavourite({commit},breed){
			storage.add('favourites',breed)
			commit('setFavourites')
		},

		getDogsByBreed({commit, rootState},{ breed, forceInsert}){
			
			if(!breed) {
				breed = arrRandom(rootState.breedList) || 'african'
			}

			const url = `https://dog.ceo/api/breed/${breed}/images/random/20` 
			return request(url)
				.then(data=>{
					if(forceInsert) {
						commit('addDogs', data.message)
					} else {
						commit('setDogs', data.message)
					}
				})
				.catch(err=>{
					console.warn('Connection err', err)
				})

		},

		listBreeds({commit}){
			const url = `https://dog.ceo/api/breeds/list/all`
			return request(url)
				.then(data=>{
					commit('setBreedList', Object.keys(data.message))
				})
				.catch(err=>{
					console.warn('Connection err', err)
				})
		}

	},

})

export default store
