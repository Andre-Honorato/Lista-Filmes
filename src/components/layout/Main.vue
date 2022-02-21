<template>
    <v-main class="d-flex justify-center align-center">
      <v-scroll-x-transition mode="out-in" appear>
        <router-view></router-view>
      </v-scroll-x-transition>
    </v-main>
</template>