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
        const data = this.$store.getters['journal/RETRIEVE']
        return data.sort((a, b) => b.id - a.id)
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
    },
    onClose (evt) {},
    onMessage (evt) {
      let jdata = JSON.parse(evt.data)
      switch (jdata.responsetype) {
        case 'journalrequest':
          this.$store.dispatch('journal/HANDLE_JOURNAL_MESSAGE', jdata)
          break
        case 'journalpush':
          this.$store.dispatch('journal/HANDLE_JOURNAL_MESSAGE', jdata)
          break
        case 'journalrefresh':
          this.$store.dispatch('journal/HANDLE_JOURNAL_MESSAGE', jdata)
          break
        case 'status':
          this.$store.dispatch('starData/HANDLE_SYSTEM_MESSAGE', jdata)
          break
      }
    },
    onError (evt) {
      console.error(evt.data)
    },
    ClickJournalItem (entryno) {
      let statusRequest = {
        requesttype: 'status',
        entry: entryno // -1 means send me the latest journal entry first, followed by length others.  else its the journal index
      }

      this.Socket.send(JSON.stringify(statusRequest))
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
@import '../../WebOld/index.css';
@import '../../WebOld/tooltip.css';
</style>
