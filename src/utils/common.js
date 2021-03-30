import axios from 'axios'
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
