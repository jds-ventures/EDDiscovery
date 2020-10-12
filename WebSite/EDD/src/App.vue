<template>
  <fullscreen :background='fullscreenBgCol' id='app'>
    <app-header></app-header>
    <app-nav></app-nav>
    <router-view />
  </fullscreen>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppNav from './components/NavBar.vue'

export default {
  name: 'App',
  data () {
    return {
      fullscreenBgCol: '#000000'
    }
  },
  components: {
    AppHeader,
    AppNav
  }
}
</script>

<style>
body {
  background: black;
}
</style>
