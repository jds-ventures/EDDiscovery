<template>
  <div>
    <div class="wrapper">
        <article>
            <div id="StatusBox">
                <table id="Status">
                  <p v-if='eliteRunning === false'>Elite not running</p>
                  <td v-for='(status, index) in status' v-bind:key='index'>
                    <div class="tooltip">
                      <img :src='status.src' alt='' width='64' :class="{ 'entryselected' : status.enable === true}">
                      <span class='tooltiptext'>{{status.tooltip}}</span>
                    </div>
                  </td>
                </table>
            </div>

            <div id="ActionBox">
                <p>Actions</p>
                <table id="Actions">
                  <td v-for='(action, index) in actions' v-bind:key='index'>
                    <div class="tooltip">
                      <img @click='ClickAction(index, action.duration, action.socketMsg)' :src='action.src' alt='' width='32' :class="{ 'entryselected' : action.enable === true}">
                      <span class='tooltiptext'>{{action.tooltip}}</span>
                    </div>
                  </td>
                </table>
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
    eliteRunning: {
      get () {
        return this.$store.getters['indicators/CURRENT_RUNNING']
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
      console.log(999, msg)

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
            console.log(5555, id)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import '../../WebOld/Grid/grid.css';
</style>
