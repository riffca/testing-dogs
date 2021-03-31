import axios from 'axios'
import { v4 as uuid } from 'uuid';
const Pocket = require('pocketjs')
export const isDevelopment = process.env.NODE_ENV === 'development' 
export const arrRandom  = arr => arr[Math.floor(Math.random() * arr.length)]

export function request(url = '', type='get') {
	if(isDevelopment) {
		console.log(`[req] --> ${url}`)
	}
	return axios({
		url,
		method: type,
	}).then(res=>{
		if(isDevelopment) {
			console.log('<-- [res]', res)
		}
		return res.data
	}).catch(console.log)
}

class Storage {
	constructor(){
		const pocket = new Pocket()
		pocket.restore()
		this.pocket = pocket
		this.favourites = pocket.collection('favourites')
	}
}

export const storage = new Storage()


export function convertDogs(items){
	if(!items.some(i=>i.img)) {
		items = items.map(item=>({
			img: item, 
			saved: false,
			id: uuid()
		}))
	}
	return items.map(doc=>{
		if(storage.favourites.documents.some(item=>item.img === doc.img)) {
			doc.saved = true
		} else {
			doc.saved = false
		}
		return doc
	})
}

export function setObserver(cb){
	return new IntersectionObserver((entries, observer) => {
		entries.forEach(async entry => {
			if (entry.isIntersecting) {
				cb()
				observer.unobserve(entry.target)
			}
		})
	}, {
		rootMargin: '-10px',
		threshold: 0.5
	})
}
