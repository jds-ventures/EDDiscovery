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
        let msg = {
          requesttype: 'journal',
          start: this.nextRow,
          length: this.loadAmount
        }

        this.Socket.send(JSON.stringify(msg))
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
/* Style the article section */

body
{
    background-color: black;
}

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
</style>
