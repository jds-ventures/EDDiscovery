<template>
  <div class='wrapper'>
    <div class='wrapleft'>
      <article id='JArticle'>
        <table id='Journal'>
          <tr v-for='journal in journals' v-bind:key='journal.id'>
            <td>
              <div class='tooltip' @click='ClickJournalItem(journal.id)'>
                <img :src='journal.image' alt='' width='24'>
                <span class='tooltiptext'>Tooltip</span>
              </div>
            </td>
            <td>{{journal.t1}}</td>
            <td>{{journal.t2}}</td>
            <td>{{journal.t3}}</td>
            <td>{{journal.t4}}</td>
          </tr>
        </table>
      </article>
    </div>
      <aside>
      <table id='StarData'>
        <tr v-for='star in starData' v-bind:key='star.id'>
            <a v-if="star.link === true" class="edsmetcbuttons" :href="star.title" target='_blank'>{{star.text}}</a>
            <td v-if="star.link === false">{{star.title}}</td>
            <td v-if="star.link === false">{{star.text}}</td>
        </tr>
      </table>
    </aside>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppFooter from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    AppFooter
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
  computed: {
    journals: {
      get () {
        return this.$store.getters['journal/RETRIEVE']
      }
    },
    starData: {
      get () {
        return this.$store.getters['starData/RETRIEVE']
      }
    },
    nextRow: {
      get () {
        return this.$store.getters['journal/NEXT_ROW']
      }
    }
  },
  methods: {
    onOpen (evt) {
      this.Socket.requestJournal(-1, 50)
      this.Socket.requestStatus(-1)
    },
    onClose (evt) {},
    onMessage (evt) {
      let jdata = JSON.parse(evt.data)
      switch (jdata.responsetype) {
        case 'journalrequest':
          this.$store.dispatch('journal/FILL_DATA', jdata)
          break
        case 'journalpush':
          this.$store.dispatch('journal/FILL_DATA', jdata)
          break
        case 'journalrefresh':
          this.$store.dispatch('journal/CLEAR_JOURNAL')
          this.$store.dispatch('journal/FILL_DATA', jdata)
          break
        case 'status':
          this.$store.dispatch('starData/FILL_DATA', jdata)
          break
      }
    },
    onError (evt) {
      console.error(evt.data)
    },
    ClickJournalItem (entryno) {
      this.Socket.requestStatus(entryno)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
@import '../../WebOld/index.css';
@import '../../WebOld/tooltip.css';
</style>
