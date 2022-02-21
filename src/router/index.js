import Vue from 'vue'
import VueRouter from 'vue-router'
import Popular from '../views/Popular.vue'
import Categories from '../views/Categories.vue'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    icon: 'mdi-home',
    redirect: '/popular'
  },
  {
    path: '/popular',
    name: 'Popular',
    component: Popular,
    icon: 'mdi-star'
  },
  {
    path: '/categories/:categorie',
    name: 'Categories',
    component: Categories,
    icon: 'mdi-bookshelf',
  },
  {
    path: '/search/:name',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
