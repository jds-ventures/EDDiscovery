import Vue from 'vue'

var loc = window.location
let uri

if (loc.protocol === 'https:') {
  uri = 'wss:'
} else {
  uri = 'ws:'
}

// Set manually for dev purposes
uri += '//' + '192.168.0.15:6502' + '/'

let socket = new WebSocket(uri, 'EDDJSON')

const emitter = new Vue({
  methods: {
    refresh () {
      socket = new WebSocket(uri, 'EDDJSON')
    },
    requestJournal (start, len) {
      let msg = {
        requesttype: 'journal',
        start: start,
        length: len
      }

      socket.send(JSON.stringify(msg))
    },
    requestStatus (entryno) {
      let msg = {
        requesttype: 'status',
        entry: entryno // -1 means send me the latest journal entry first, followed by length others.  else its the journal index
      }

      socket.send(JSON.stringify(msg))
    },
    requestIndicator () {
      var msg = {
        requesttype: 'indicator'
      }

      socket.send(JSON.stringify(msg))
    }
  }
})

socket.onopen = function (evt) {
  emitter.$emit('open', evt)
}

socket.onclose = function (evt) {
  emitter.$emit('close', evt)
}

socket.onmessage = function (evt) {
  emitter.$emit('message', evt)
}

socket.onerror = function (err) {
  emitter.$emit('error', err)
}

export default emitter
