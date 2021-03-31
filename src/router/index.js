import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
Vue.use(VueRouter)

const routes = [
	{
		path: '/favourites',
		name: 'favourites',
		component: () => import('../views/Favourites.vue')
	},
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/:breed',
		name: 'dogs-show',
		component: Home
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})



router.beforeEach((to, from, next)=>{
	setTimeout(()=>store.commit('clearDogs'))
	next()
})

export default router
