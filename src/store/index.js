import Vue from 'vue'
import Vuex from 'vuex'
import { request, storage, arrRandom, convertDogs, setObserver } from '@/utils/common'
Vue.use(Vuex)


let store = new Vuex.Store({
	state: {
		dogs: [], 
		breedList: []
	},
	mutations: {
		'setObserver'(state,cb) {
			state.infiniteScrollObserver = setObserver(cb)
		},

		'clearDogs'(state) {
			state.dogs = []
		},
		'addDogs'(state, dogs) {
			state.dogs = [...state.dogs, ...convertDogs(dogs)]
		},
		'setDogs'(state, dogs){
			state.dogs = convertDogs(dogs)
		},
		'setBreedList'(state, list){
			state.breedList = list
		},
		'updateFavourites'(state) {
			state.dogs = convertDogs(state.dogs)
		}
	},
	actions: {
		async setupDogs({dispatch}){
			await dispatch('getDogsByBreed', {})
		},

		saveFavourite({commit},dog){
			let query = { img: dog.img}
			let resolve = storage.favourites.find(query)
			if(resolve.length) {
				storage.favourites.remove(query)
			} else {
				storage.favourites.insert(dog)
			}
			commit('updateFavourites')
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
