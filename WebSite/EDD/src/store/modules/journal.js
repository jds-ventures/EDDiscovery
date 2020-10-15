/*
    [journal.js]
    - Independent state management module for journal

    Namespaced is TRUE:
    • getters    ==>  this.$store.getters['journal/example']
    • actions    ==>  dispatch('journal/example')
    • mutations  ==>  commit('journal/example')

    Contents:
    • 1. State
    • 2. Getters
    • 3. Mutations
    • 4. Actions

*/

export const journal = {
  namespaced: true,

  // (1). State
  state: {
    data: [],
    keys: [],
    nextRow: -9999
  },

  // (2). Getters
  getters: {
    RETRIEVE: state => {
      return state.data
    },
    NEXT_ROW: state => {
      return state.nextRow
    }
  },

  // (3). Mutations
  mutations: {
    parseJournalRow: (state, payload) => {
      if (!state.keys.includes(payload[0])) {
        state.keys.push(payload[0]) // update state
        state.data.push({
          id: payload[0],
          image: payload[1][0],
          t1: payload[1][1],
          t2: payload[1][2],
          t3: payload[1][3],
          t4: payload[1][4]
        }) // update state
      }
    },
    resetState: (state) => {
      state.data = []
      state.keys = []
      state.nextRow = -9999
    }
  },

  // (4). Actions
  actions: {
    ADD_RECORD: ({commit}, payload) => {
      commit('insertRecord', payload)
    },
    CLEAR_JOURNAL: ({commit}) => {
      commit('resetState')
    },
    HANDLE_JOURNAL_MESSAGE: ({commit, state}, payload) => {
      let firstrow = payload.firstrow

      let rowId = payload.firstrow

      if (firstrow >= 0) {
        var rows = payload.rows
        console.log(payload)
        for (var i = 0; i < rows.length; i++) {
          var obj = rows[i]

          var image = 'http://192.168.0.15:6502' + '/journalicons/' + obj[0] + '.png'
          var t1 = obj[1]
          var t2 = obj[2]
          var t3 = obj[3]
          var t4 = obj[4]

          commit('parseJournalRow', [rowId--, [image, t1, t2, t3, t4]])
          rowId--
        }

        var nextrow = firstrow - rows.length
        if (state.nextRow === -9999 || nextrow < state.nextRow) {
          state.nextRow = nextrow
        }
      } else {
        commit('parseJournalRow', [rowId--, ['', 'No Data', '', '', '']])
      }
    }
  }
}
