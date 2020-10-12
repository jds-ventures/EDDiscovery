<template>
  <div>
    <div class="wrapper">
        <article>
            <div id="StatusBox">
                <table id="Status"></table>
            </div>

            <div id="ActionBox">
                <p>Actions</p>
                <table id="Actions"></table>
            </div>
        </article>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppFooter from '../components/Footer.vue'

export default {
  name: 'Grid',
  components: {
    AppFooter
  },
  computed: {
    currentShipType: {
      get () {
        return this.$store.getters['indicators/CURRENT_SHIP_TYPE']
      }
    }
  },
  beforeCreated () {
    this.Socket.refresh()
  },
  created () {
    this.Socket.$on('open', this.onOpen)
    this.Socket.$on('close', this.onClose)
    this.Socket.$on('message', this.onMessage)
    this.Socket.$on('error', this.onError)
  },
  beforeDestroy () {
    this.Socket.$off('open', this.onOpen)
    this.Socket.$off('close', this.onClose)
    this.Socket.$off('message', this.onMessage)
    this.Socket.$off('error', this.onError)
  },
  methods: {
    onOpen (evt) {
      this.Socket.requestStatus(-1)
      this.Socket.requestIndicator()
    },
    onClose (evt) {},
    onMessage (evt) {
      let jdata = JSON.parse(evt.data)

      if (jdata.responsetype === 'indicator' || jdata.responsetype === 'indicatorpush') {
        console.log(jdata, 'Status', 'Actions', 'StatusOther')
      }
    },
    onError (evt) {
      console.error('Web Error ' + evt.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import '../../WebOld/Grid/grid.css';
</style>
