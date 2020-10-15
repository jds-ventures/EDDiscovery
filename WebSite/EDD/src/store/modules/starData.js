/*
    [starData.js]
    - Independent state management module for starData

    Namespaced is TRUE:
    • getters    ==>  this.$store.getters['starData/example']
    • actions    ==>  dispatch('starData/example')
    • mutations  ==>  commit('starData/example')

    Contents:
    • 1. State
    • 2. Getters
    • 3. Mutations
    • 4. Actions

*/

export const starData = {
  namespaced: true,

  // (1). State
  state: {
    data: [],
    keys: []
  },

  // (2). Getters
  getters: {
    RETRIEVE: state => {
      return state.data
    }
  },

  // (3). Mutations
  mutations: {
    parseJsonRow: (state, payload) => {
      if (!state.keys.includes(payload[0])) {
        state.keys.push(payload[0])

        let value = (payload[4] !== '') ? payload[1][payload[3]][payload[4]] : payload[1][payload[3]]

        state.data.push({
          id: payload[0],
          title: payload[2],
          text: value,
          link: false
        })
      }
    },
    parseRowButton: (state, payload) => {
      if (payload[1] != null) {
        if (!state.keys.includes(payload[0])) {
          state.keys.push(payload[0])

          state.data.push({
            id: payload[0],
            title: payload[1][1],
            text: payload[1][0],
            link: true
          })
        }
      }
    },
    parseRowString: (state, payload) => {
      if (!state.keys.includes(payload[0])) {
        state.keys.push(payload[0])

        state.data.push({
          id: payload[0],
          title: payload[1],
          text: payload[2],
          link: false
        })
      }
    },
    resetState: (state) => {
      state.data = []
      state.keys = []
    }
  },

  // (4). Actions
  actions: {
    HANDLE_SYSTEM_MESSAGE: ({commit}, payload) => {
      commit('resetState')

      let recordId = 0

      if (payload['entry'] >= 0) {
        // Commander Name
        commit('parseJsonRow', [recordId++, payload, 'Cmdr:', 'Commander', ''])

        // Current System
        commit('parseJsonRow', [recordId++, payload, 'Star System', 'SystemData', 'System'])

        // API Data from sources, EDSM, EDDB, ROSS
        let edsm = payload.SystemData.EDSMID > 0 ? ['EDSM', 'https://www.edsm.net/system/id/' + payload.SystemData.EDSMID + '/name/' + payload.SystemData.System, true] : null
        let eddb = payload.EDDB.EDDBID > 0 ? ['EDDB', 'https://eddb.io/system/' + payload.EDDB.EDDBID, true] : null
        let ross = payload.EDDB.EDDBID > 0 ? ['ROSS', 'https://ross.eddb.io/system/update/' + payload.EDDB.EDDBID, true] : null

        // Parse and display buttons with above data
        commit('parseRowButton', [recordId++, edsm])
        commit('parseRowButton', [recordId++, eddb])
        commit('parseRowButton', [recordId++, ross])

        // Body Name
        commit('parseJsonRow', [recordId++, payload, 'Body Name:', 'Bodyname', ''])
        // Position
        commit('parseRowString', [recordId++, 'Position:', payload.SystemData.PosX + ',' + payload.SystemData.PosY + ',' + payload.SystemData.PosZ])
        // Distance to Sol & Home Base
        commit('parseRowString', [recordId++, 'To', 'Sol: ' + payload['SolDist'] + ' Home:' + payload['HomeDist']])
        // System State
        commit('parseJsonRow', [recordId++, payload, 'State', 'EDDB', 'State'])
        // System Allegiance
        commit('parseJsonRow', [recordId++, payload, 'Allegiance', 'EDDB', 'Allegiance'])
        // System Goverment
        commit('parseJsonRow', [recordId++, payload, 'Government', 'EDDB', 'Gov'])
        // System Economy
        commit('parseJsonRow', [recordId++, payload, 'Economy', 'EDDB', 'Economy'])
        // System Faction
        commit('parseJsonRow', [recordId++, payload, 'Faction', 'EDDB', 'Faction'])
        // System Security
        commit('parseJsonRow', [recordId++, payload, 'Security', 'EDDB', 'Security'])
        // Ship Fueld
        commit('parseRowString', [recordId++, 'Fuel', payload['Ship']['Fuel'] + ' / ' + payload['Ship']['TankSize']])
        // Mats & Data
        commit('parseRowString', [recordId++, 'Mats/Data', payload['Ship']['Materials'] + ' / ' + payload['Ship']['Data']])
        // Current Materials
        commit('parseJsonRow', [recordId++, payload, 'Materials', 'Ship', 'Materials'])
        // Current Credits
        commit('parseJsonRow', [recordId++, payload, 'Credits', 'Credits', ''])

        if (payload.Travel.Dist !== '') {
          if (payload.Travel.UnknownJumps !== 0) {
            commit('parseRowString', [recordId++, 'Travel', payload.Travel.Dist + ' ly, ' + payload.Travel.Time + ', ' + payload.Travel.Jumps + '(+' + payload.Travel.UnknownJumps + ')'])
          } else {
            commit('parseRowString', [recordId++, 'Travel', payload.Travel.Dist + ' ly, ' + payload.Travel.Time + ', ' + payload.Travel.Jumps])
          }
        } else {
          commit('parseRowString', [recordId++, 'Travel', '-'])
        }
      }
    },
    CLEAR_SYSTEM_TABLE: ({commit}) => {
      commit('resetState')
    }
  }
}
