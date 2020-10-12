<template>
  <div>
    <footer>
      <button v-if="$route.path == '/'" @click='loadAmount =  loadAmount - 100'>-</button>
      <button v-if="$route.path == '/'" @click='loadMore'>Load {{loadAmount}} More</button>
      <button v-if="$route.path == '/'" @click='loadAmount =  loadAmount + 100'>+</button>

      <p>(C) Elite Dangerous Discovery Team 2019-2020</p>
      <p>
        <a href='https://github.com/EDDiscovery/EDDiscovery/wiki'> Help </a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      loadAmount: 500
    }
  },
  computed: {
    nextRow: {
      get () {
        return this.$store.getters['journal/NEXT_ROW']
      }
    }
  },
  methods: {
    loadMore () {
      if (this.nextRow >= 0) {
        this.Socket.requestJournal(this.nextRow, this.loadAmount)
      }
    }
  },
  watch: {
    loadAmount (newVal, oldVal) {
      if (newVal < 0) {
        this.loadAmount = 0
      } else if (newVal > 1000) {
        this.loadAmount = 1000
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
@import '../../WebOld/index.css';
</style>
