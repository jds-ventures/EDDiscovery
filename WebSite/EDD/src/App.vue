<template>
  <fullscreen style="overflow: hidden;" :background="'#000000'" id='app'>
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
  components: {
    AppHeader,
    AppNav
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
      let journalRequest = {
        requesttype: 'journal',
        start: -1,
        length: 50
      }

      this.Socket.send(JSON.stringify(journalRequest))

      let statusRequest = {
        requesttype: 'status',
        entry: -1 // -1 means send me the latest journal entry first, followed by length others.  else its the journal index
      }

      this.Socket.send(JSON.stringify(statusRequest))

      let indicatorRequest = {
        requesttype: 'indicator'
      }

      this.Socket.send(JSON.stringify(indicatorRequest))
    },
    onClose (evt) {},
    onMessage (evt) {
      const jdata = JSON.parse(evt.data)

      if (jdata.responsetype === 'journalrequest' || jdata.responsetype === 'journalpush' || jdata.responsetype === 'journalrefresh') {
        this.$store.dispatch('journal/HANDLE_JOURNAL_MESSAGE', jdata)
      } else if (jdata.responsetype === 'status' || jdata.responsetype === 'statuspush') {
        this.$store.dispatch('starData/HANDLE_SYSTEM_MESSAGE', jdata)
      } else if (jdata.responsetype === 'indicator' || jdata.responsetype === 'indicatorpush') {
        this.$store.dispatch('indicators/CLEAR')
        this.$store.dispatch('indicators/HANDLE_INDICATOR_MESSAGE', jdata)
      }
    },
    onError (evt) {
      console.error(evt.data)
    }
  }
}
</script>

<style>
@import './app.css';
</style>
