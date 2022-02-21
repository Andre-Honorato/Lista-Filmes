<template>
    <v-app-bar app :class="theme ? '' : 'white'">
        <v-app-bar-nav-icon @click="openSideMenu"></v-app-bar-nav-icon>
        <v-toolbar flat>
            <v-toolbar-title class="font-weight-black text-h5">Lista Filmes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field 
                placeholder="Procure por um filme"
                prepend-inner-icon="mdi-magnify"
                class="expanding-search mr-4"
                :class="{ 'closed': searchClosed && !search }" 
                @keyup.enter="searchFilm"
                dense  
                @focus="searchClosed = false"
                @blur="searchClosed = true"
                v-model="search"
                hide-details
                solo
                clearable
                id="teste"
            >
            </v-text-field>
            <v-checkbox
                v-model="theme"
                color="primary"
                off-icon="mdi-moon-waxing-crescent"
                on-icon="mdi-white-balance-sunny"
                @click="toggleTheme"
                hide-details
                >         
            </v-checkbox>
        </v-toolbar>
    </v-app-bar>
</template>

<script>
import { eventBus } from '../../main'

export default {
    data() {
        return {
            theme: localStorage.getItem('theme') == 'dark' ? true : false,
            search: '',
            searchClosed: true
        }
    },
    beforeCreate() {
        if (localStorage.getItem('theme') == null) {
            localStorage.setItem('theme', 'light')
        }
    },
    created() {
       this.setTheme(this.theme)
    },
    mounted() {
        if (localStorage.getItem('theme') == 'dark') {
            document.querySelector('.v-navigation-drawer__content').classList.add('dark')
        }
        else {
            document.querySelector('.v-navigation-drawer__content').classList.add('light')
        }
    },
    methods: {
        toggleTheme() {
            this.setTheme(this.theme)
        },
        setTheme(value) {
            this.$vuetify.theme.dark = value
            if (value) {
                localStorage.setItem('theme', 'dark')
                eventBus.$emit('theme', 'dark')
            }
            else {
                localStorage.setItem('theme', 'light')
                eventBus.$emit('theme', 'light')
            }
        },
        openSideMenu() {
            eventBus.$emit('openSideMenu', true)
        },
        searchFilm() {
            this.$router.push(`/search/${this.search}`)
        }
    }
}
</script>

<style lang="sass">
    .v-input.expanding-search
        transition: max-width 0.3s
        max-width: 350px
        border-radius: 15px
        .v-input__slot
            cursor: pointer !important
            &:before, &:after
                border-color: transparent !important
                border-radius: 15px
        &.closed
            max-width: 45px
            .v-input__slot
                background: transparent !important
                border-radius: 15px
</style>