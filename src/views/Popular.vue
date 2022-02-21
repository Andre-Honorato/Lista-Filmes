<template>
  <v-container :class="{ 'dark': theme == 'dark', 'light': theme == 'light' }">
    <v-row class="mt-6">
      <v-col class="text-center">
        <h1>Filmes mais populares</h1>
      </v-col>
    </v-row>
    <v-row class="mt-6" v-if="isLoading">
      <v-col class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>
    <v-scroll-x-transition v-else appear>
      <v-row class="mt-6 mb-6" align="center" justify="start">
        <v-col cols="12" lg="4" md="4" v-for="film in getCategories" :key="film.id" class="my-2">
          <CardFilm :film="film" />
        </v-col>
      </v-row>
    </v-scroll-x-transition>
    <v-row class="mt-12 mb-12" v-show="!isLoading" justify="center">
      <v-col class="text-center hidden-sm-and-down">
        <v-pagination :length="pages" total-visible="15" v-model="page" @click="getFilms()"></v-pagination>
      </v-col>
      <v-col class="text-center d-flex d-md-none d-lg-none justify-center">
        <v-pagination :length="pages" total-visible="5" v-model="page" @click="getFilms()"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from 'axios'
import hash from 'object-hash'

import CardFilm from '../components/CardFilm.vue'
import { eventBus } from '../main'

export default {
  data() {
    return {
      isLoading: true,
      films: [],
      page: 1,
      pages: 0,
      categories: [],
      theme: undefined
    }
  },
  components: {
    CardFilm
  },
  methods: {
    async getFilms() {
      await this.$vuetify.goTo(0)
      this.isLoading = true
      const categories = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=3120c6cc2f5780a0cc2094cb918c5618&language=pt-BR`)
      this.categories = categories.data.genres
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3120c6cc2f5780a0cc2094cb918c5618&language=pt-BR&page=${this.page}`)
      this.pages = response.data.total_pages
      this.isLoading = false
      this.films = response.data.results
    }
  },
  async created() {
    eventBus.$on('theme', (theme) => {
      this.theme = theme
    })
    if (this.films.length == 0) {
      await this.getFilms()
    }
  },
  watch: {
    async page() {
      await this.getFilms()
    }
  },
  computed: {
    getCategories() {
      this.films.forEach(film => {
        film.categories = []
        this.categories.forEach(categorie => {
          film.genre_ids.forEach(genreId => {
            if (categorie.id == genreId) {
              film.categories.push({ name: categorie.name })
            }
          })
        })
      })
      this.films.forEach(film => {
        film.categories.map((i => ({ ...i, key: hash(i) })))
      })
      return this.films
    }
  }
}
</script>