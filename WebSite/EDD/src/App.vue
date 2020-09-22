<template>
  <fullscreen :background="'#000000'" id="app">
    <app-header></app-header>
    <app-nav></app-nav>
    <router-view />
    <app-footer></app-footer>
  </fullscreen>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppNav from './components/NavBar.vue'
import AppFooter from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppNav,
    AppFooter
  },
  beforeMount () {
    this.onLoad()
  },
  methods: {
    onLoad () {}
  }
}
</script>

<style>
/* Legacy EDD WebSite CSS Resources */
@import "../WebOld/header.css";
@import "../WebOld/index.css";
@import "../WebOld/tooltip.css";
</style>
