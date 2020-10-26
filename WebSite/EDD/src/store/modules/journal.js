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
    // Journal entries
    data: [],
    // All journal entries IDs
    keys: [],
    // Default set to -9999 (after latest entry) else it will be the next entries ID to load
    nextRow: -9999,
    // Default set to -1 (latest entry) else it will be the first loaded entries ID
    firstRow: -1,
    // Stores descriptions to compare against new records and remove duplicates
    duplicateCheck: {
      timestamp: null,
      description: null,
      information: null
    }
  },

  // (2). Getters
  getters: {
    RETRIEVE: state => {
      return state.data
    },
    NEXT_ROW: state => {
      return state.nextRow
    },
    FIRST_ROW: state => {
      return state.firstRow
    }
  },

  // (3). Mutations
  mutations: {
    parseJournalRow: (state, payload) => {
      if (!state.keys.includes(payload[0])) {
        // New date object from EDD timestamp
        const date = new Date(payload[1][1])

        // Format timestamp to add a leading 0 if number is less than 10 & building date format
        const timestamp = function () {
          if (date.getSeconds() < 10) {
            return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + '0' + date.getSeconds()
          } else {
            return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
          }
        }

        // If the data is the same as the previous entry and there are no notes attached to it then return null and do not add record to the journal
        if (state.duplicateCheck.timestamp === timestamp() && state.duplicateCheck.description === payload[1][2] && state.duplicateCheck.information === payload[1][3] && payload[1][4] === '') return false

        // Push to state
        state.keys.push(payload[0])

        // Push to state
        state.data.push({
          id: payload[0],
          image: payload[1][0],
          timestamp: timestamp(),
          description: payload[1][2],
          information: payload[1][3],
          note: payload[1][4]
        })

        // FIlters out any duplicated records from EDD main app
        state.duplicateCheck = {
          timestamp: timestamp(),
          description: payload[1][2],
          information: payload[1][3]
        }
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
      state.firstrow = payload.firstrow

      let rowId = payload.firstrow

      if (state.firstrow >= 0) {
        let journalEntries = payload.rows

        for (let i = 0; i < journalEntries.length; i++) {
          let journalEntry = journalEntries[i]

          let image = 'http://192.168.0.15:6502' + '/journalicons/' + journalEntry[0] + '.png'
          let timestamp = journalEntry[1]
          let description = journalEntry[2]
          let information = journalEntry[3]
          let note = journalEntry[4]

          commit('parseJournalRow', [rowId, [image, timestamp, description, information, note]])
          rowId--
        }

        let nextrow = state.firstrow - journalEntries.length
        if (state.nextRow === -9999 || nextrow < state.nextRow) {
          state.nextRow = nextrow
        }
      } else {
        commit('parseJournalRow', [rowId, ['', 'No Data', '', '', '']])
      }
    }
  }
}
