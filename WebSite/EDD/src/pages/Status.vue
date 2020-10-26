<template>
  <div>
    <div class='wrapper'>
        <div class='wrapleft'>
            <article>
                <table id='StarData'>
                  <tr v-for='(star, index) in starData' v-bind:key='index'>
                    <a v-if='star.link === true' class='edsmetcbuttons' :href='star.title' target='_blank'>{{star.text}}</a>
                    <td v-if='star.link === false'>{{star.title}}</td>
                    <td v-if='star.link === false'>{{star.text}}</td>
                </tr>
                </table>
            </article>
        </div>

        <aside>
            <div id='StatusBox'>
                <table id='Status'>
                  <p v-if='eliteRunning === false'>Elite not running</p>
                  <td v-for='(status, index) in status' v-bind:key='index'>
                    <div class="tooltip">
                      <img :src='status.src' alt='' width='32' :class="{ 'entryselected' : status.enable === true}">
                      <span class='tooltiptext'>{{status.tooltip}}</span>
                    </div>
                  </td>
                </table>
                <div id='StatusOther'>
                  <p v-for='(status, index) in statusOther' v-bind:key='index'>{{status.text}}</p>
                </div>
            </div>
        </aside>

    </div>

    <div id='ActionBox'>
        <p>Actions</p>
        <table id='Actions'>
          <td v-for='(action, index) in actions' v-bind:key='index'>
            <div class="tooltip">
              <img @click='ClickAction(index, action.duration, action.socketMsg)' :src='action.src' alt='' width='32' :class="{ 'entryselected' : action.enable === true}">
              <span class='tooltiptext'>{{action.tooltip}}</span>
            </div>
          </td>
        </table>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppFooter from '../components/Footer.vue'

export default {
  name: 'Status',
  components: {
    AppFooter
  },
  mounted () {
    // Set to players current system on mount
    let statusRequest = {
      requesttype: 'status',
      entry: this.firstRow // -1 means send me the latest journal entry first, followed by length others.  else its the journal index
    }

    this.Socket.send(JSON.stringify(statusRequest))
  },
  computed: {
    starData: {
      get () {
        return this.$store.getters['starData/RETRIEVE']
      }
    },
    firstRow: {
      get () {
        return this.$store.getters['journal/FIRST_ROW']
      }
    },
    eliteRunning: {
      get () {
        return this.$store.getters['indicators/CURRENT_RUNNING']
      }
    },
    statusOther: {
      get () {
        return this.$store.getters['indicators/RETRIEVE_STATUS_OTHER']
      }
    },
    status: {
      get () {
        return this.$store.getters['indicators/RETRIEVE_STATUS']
      }
    },
    actions: {
      get () {
        return this.$store.getters['indicators/RETRIEVE_ACTIONS']
      }
    }
  },
  methods: {
    ClickAction (id, duration, msg) {
      var keyPressRequest = {
        requesttype: 'presskey',
        key: msg
      }

      if (duration !== null) {
        let data = this.actions

        let scope = this

        let counter = 0

        data.forEach(action => {
          if (counter === id) {
            data[id].enable = true

            this.$store.dispatch('indicators/UPDATE_ACTION_STATUS', data)

            setTimeout(function (f) {
              data[id].enable = false

              scope.$store.dispatch('indicators/UPDATE_ACTION_STATUS', data)
            }, duration)
          }
          counter++
        })
      }

      this.Socket.send(JSON.stringify(keyPressRequest))
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
/* Style the article section */

.wrapper
{
    clear: both;
    width: 100%;
}

/* clear the contents after wrapper.. works better than clearing on next item */
.wrapper::after
{
    content: "";
    visibility: hidden;
    height: 0;
    display: block;
    clear: both;
}

.wrapleft
{
    float: left;
    width: 100%;
}

/* this holds the status table */

article
{
    height: auto;
    overflow: auto;
    margin-right: 310px;
    line-height:1em;
}

article table
{
    width: 100%;
    border-collapse: collapse;
}

article table tr
{
    background-color: #000000;
    color: darkorange;
}

/* The aside holds the status indicators */

aside
{
    float: Right;
    width: 300px;
    margin-left: -300px;
}

/* Common status and action box styling */

#StatusBox, #ActionBox
{
    background-color: black;
    margin-top: 0.5em;
    width: 100%;
}

#ActionBox
{
    border: 2px solid #ffac28;
}

/* the p element can hold the name of the box, move it relative to give a inline label */

#ActionBox p
{
    color: black;
    position: relative;
    top: -0.5em;
    margin-left: 0.5em;
    display: inline;
    background-color: #ffac28;
}

#StatusBox p
{
    color: darkorange;
    line-height:0.1em;
}

#ActionBox td
{
    display: inline; /* td's in action box are inline so flow around the actionbox areas */
}

#StatusBox td
{
    display: inline;
}

/* the img element is the button .. style it */

#StatusBox img, #ActionBox img
{
    padding: 10px;
    border: 2px solid darkorange;
    border-radius: 8px;
}

#StatusBox img
{
    border-radius: 16px;
}

/* class assigned to say selected */

.entryselected
{
    background-color: green;
}

/* class to theme the status buttons */
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

.tooltip .tooltiptext
{
    margin-left: -120px;
    margin-top: 60px;
    width:200px;
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
