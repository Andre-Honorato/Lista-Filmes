<template>
    <v-card shaped elevation="12" height="100%">
        <v-img :src="film.backdrop_path ? `https://image.tmdb.org/t/p/w500${film.backdrop_path}` : 'https://www.plantapronta.com.br/img/logo.png'" max-height="200px"></v-img>
        <v-card-title style="word-break: break-word;">{{film.title}}</v-card-title>
        <v-card-subtitle>{{film.release_date.split('-').reverse().join('/')}}</v-card-subtitle>
        <v-card-text>
            <v-chip-group column>
                <v-chip v-for="categorie in film.categories" :key="categorie.id" @click="toCategorie(categorie.name)">{{categorie.name}}</v-chip>
            </v-chip-group>
        </v-card-text>
        <v-card-text>
            <v-row align="center" class="mx-0 mb-1">
                <v-rating
                    :value="film.vote_average"
                    color="amber"
                    dense
                    size="20"
                    length="1"
                    readonly>
                </v-rating>
                <div>
                    <span class="text-h6">
                        {{film.vote_average}}
                    </span>
                    <span class="text-h7">/ 10</span>
                </div>
            </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn text color="primary" @click="show = !show">Mais</v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-card-subtitle :style="subtitleTheme">{{film.overview || 'Sem sinopse'}}</v-card-subtitle>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script>
import slugify from 'slugify'

export default {
  data() {
    return {
      show: false
    }
  },
  props: {
      film: {
          type: Object,
          required: true
      }
  },
  methods: {
      toCategorie(categorieName) {
          this.$router.push(`/categories/${slugify(categorieName).toLowerCase()}`)
      }
  },
  computed: {
      subtitleTheme() {
          if (this.$vuetify.theme.dark) {
              return { color: '#ffffff', opacity: '.7' }
          }
          else {
              return {}
          }
      }
  }
}
</script>