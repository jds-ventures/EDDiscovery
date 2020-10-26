<template>
  <div class='wrapper'>
    <div class='wrapleft'>
      <article id='JArticle' @scroll="onScroll">
        <table id='Journal'>
          <tr v-for='journal in journals' v-bind:key='journal.id'>
            <td>
              <div class='tooltip' @click='ClickJournalItem(journal.id)'>
                <img :src='journal.image' :alt='journal.description' width='24'>
                <span class='tooltiptext'>{{journal.description}}</span>
              </div>
            </td>
            <td>{{journal.timestamp}}</td>
            <td>{{journal.description}}</td>
            <td>{{journal.information}}</td>
            <td>{{journal.note}}</td>
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
    ClickJournalItem (entryno) {
      let statusRequest = {
        requesttype: 'status',
        entry: entryno // -1 means send me the latest journal entry first, followed by length others.  else its the journal index
      }

      this.Socket.send(JSON.stringify(statusRequest))
    },
    onScroll ({target: {scrollTop, clientHeight, scrollHeight}}) {
      if (scrollTop + clientHeight >= scrollHeight) {
        let msg = {
          requesttype: 'journal',
          start: this.nextRow,
          length: 50
        }

        this.Socket.send(JSON.stringify(msg))
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
/* Style the article section */

.wrapper
{
    clear: both;
    width: 100%;
}

.wrapleft
{
    float:left;
    width:100%;
}

article
{
    height: 800px;
    overflow: auto;
    margin-right: 310px;
}

article table
{
    width: 100%;
    border-collapse:collapse;
}

article table tr
{
    background-color: #000000;
    color: darkorange;
}

article table tr td
{
    border: 2px solid darkorange;
}

article table td:nth-child(1)
{
    width: auto;
}

article table td:nth-child(2)
{
    width: 20%;
}

article table td:nth-child(3)
{
    width: 20%;
}

article table td:nth-child(4)
{
    width: 40%;
}

article table td:nth-child(5)
{
    width: 20%;
}

/* Style the aside */

aside
{
    float: Right;
    width: 300px;
    margin-left: -300px;
}

aside table
{
    width: 100%;
    border-collapse: collapse;
}

aside table tr
{
    background-color: #000000;
    color: darkorange;
}

article table tr td
{
    border: 2px solid darkorange;
}
aside tr td:first-of-type
{
    width: 40%;
}

aside tr td:last-of-type
{
    width: 60%;
    font-style: italic;
}

/* EDSM Buttons on aside */
.edsmetcbuttons
{
    width: 6em;
    margin: 1px 0px 1px 10px;
    line-height: 1;
    background-color: orange;
    border: 1px solid darkorange;
    color: #000;
    text-decoration: none;
}

footer button
{
    width: 6em;
    color: orange;
    background-color: black;
    border: 1px solid darkorange;
}

/* Chrome only */

::-webkit-scrollbar
{
    width: auto;
}

::-webkit-scrollbar-track
{
    background: darkorange;
}

::-webkit-scrollbar-thumb
{
    background: rgb(80,80,80);
}

::-webkit-scrollbar-thumb:hover
{
    background: rgb(100,100,100);
}

body p {
    color: aliceblue;
}
/* Style a item div wrapped in tooltip */

.tooltip
{
    display: inline;
}

/* Tooltip text - you should position it to your satisfaction */
.tooltip .tooltiptext
{
    visibility: hidden;
    color: orange;
    background-color: black;
    border: 1px solid orange;
    border-radius: 1px;
    text-align: center;
    padding: 5px 0;
    position: absolute;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext
{
    transition-delay: 500ms;
    transition-duration: 2000ms;
    visibility: visible;
}
</style>
