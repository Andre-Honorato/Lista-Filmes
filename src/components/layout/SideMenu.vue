<template>
    <v-navigation-drawer app temporary v-model="active" bottom>
        <v-list rounded>
            <v-list-item color="primary" to="/popular">
                <v-list-item-icon>
                    <v-icon>mdi-star</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Mais populares</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-group group="categories">
                <template v-slot:activator>
                    <v-list-item-icon>
                        <v-icon>mdi-bookshelf</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Categorias</v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item v-for="(categorie, i) in categories" :key="categorie.id" :to="`/categories/${categorie.slug}`">
                    <v-list-item-icon>
                        <v-icon>{{categoriesIcons[i]}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{categorie.name}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import axios from 'axios'
import slugify from 'slugify'

import { eventBus } from '../../main'

export default {
    data() {
        return {
            active: false,
            categories: [],
            categoriesIcons: [
                'mdi-redhat',
                'mdi-compass',
                'mdi-brush',
                'mdi-emoticon',
                'mdi-police-badge',
                'mdi-movie-open',
                'mdi-drama-masks',
                'mdi-human-male-female-child',
                'mdi-rocket-launch',
                'mdi-map-search',
                'mdi-knife',
                'mdi-music-note-eighth',
                'mdi-incognito',
                'mdi-heart',
                'mdi-dna',
                'mdi-television-classic',
                'mdi-help',
                'mdi-fencing',
                'mdi-pistol'
            ]
        }
    },
    methods: {
        async getCategories() {
            const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=3120c6cc2f5780a0cc2094cb918c5618&language=pt-BR`)
            this.categories = response.data.genres
            this.categories.forEach(categorie => {
                categorie.slug = slugify(categorie.name).toLowerCase()
            })
        }
    },
    created() {
        this.getCategories()
        eventBus.$on('openSideMenu', (value) => {
            this.active = value
        })
    },
    mounted() {
        eventBus.$on('theme', (theme) => {
            if (theme == 'dark') {
                document.querySelector('.v-navigation-drawer__content').classList.remove('light')
                document.querySelector('.v-navigation-drawer__content').classList.add('dark')
            }
            else {
                document.querySelector('.v-navigation-drawer__content').classList.remove('dark')
                document.querySelector('.v-navigation-drawer__content').classList.add('light')
            }
        })
    }
}
</script>