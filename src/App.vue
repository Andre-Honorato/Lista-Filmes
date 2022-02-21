<template>
  <v-app>
    <SideMenu />
    <Header />
    <Main />
  </v-app>
</template>

<script>
import SideMenu from './components/layout/SideMenu.vue'
import Header from './components/layout/Header.vue'
import Main from './components/layout/Main.vue'
import { eventBus } from './main'

export default {
  components: {
    SideMenu,
    Header,
    Main
  },
  mounted() {
    
  },
  created() {
    eventBus.$on('theme', (theme) => {
      if (theme == 'dark') {
        document.querySelector('html').classList.remove('light')
        document.querySelector('html').classList.add('dark')
      }
      else {
        document.querySelector('html').classList.remove('dark')
        document.querySelector('html').classList.add('light')
      }
    })
  }
}
</script>

<style>
  html {
    overflow-x: hidden;
  }
    html.dark::-webkit-scrollbar {
    width: 15px;
  }

  html.dark::-webkit-scrollbar-track {
    background: #202020;
    border-left: 1px solid #2c2c2c;
  }

  html.dark::-webkit-scrollbar-thumb {
    background: #3e3e3e;
    border: solid 3px #202020;
    border-radius: 7px;
  }

  html.dark::-webkit-scrollbar-thumb:hover {
    background: white;
  }
  html.light::-webkit-scrollbar {
    width: 15px;
  }

  html.light::-webkit-scrollbar-track {
    background: #e6e6e6;
    border-left: 1px solid #dadada;
  }

  html.light::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border: solid 3px #e6e6e6;
    border-radius: 7px;
  }

  html.light::-webkit-scrollbar-thumb:hover {
    background: black;
  }
  .v-navigation-drawer__content.dark::-webkit-scrollbar {
    width: 15px;
  }

  .v-navigation-drawer__content.dark::-webkit-scrollbar-track {
    background: #202020;
    border-left: 1px solid #2c2c2c;
  }

  .v-navigation-drawer__content.dark::-webkit-scrollbar-thumb {
    background: #3e3e3e;
    border: solid 3px #202020;
    border-radius: 7px;
  }

  .v-navigation-drawer__content.dark::-webkit-scrollbar-thumb:hover {
    background: white;
  }
  .v-navigation-drawer__content.light::-webkit-scrollbar {
    width: 15px;
  }

  .v-navigation-drawer__content.light::-webkit-scrollbar-track {
    background: #e6e6e6;
    border-left: 1px solid #dadada;
  }

  .v-navigation-drawer__content.light::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border: solid 3px #e6e6e6;
    border-radius: 7px;
  }

  .v-navigation-drawer__content.light::-webkit-scrollbar-thumb:hover {
    background: black;
  }
</style>