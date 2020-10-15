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

let socket

const emitter = new Vue({
  methods: {
    send (message) {
      if (socket.readyState === 1) socket.send(message)
    },
    close () {
      if (socket.readyState === 1) {
        emitter.$emit('message', 'Closing Socket.')
        socket.close()
        socket = null // prevent memory leak
      }
    },
    connect () {
      socket = new WebSocket(uri, 'EDDJSON')

      socket.onclose = function (evt) {
        emitter.$emit('close', evt)
      }

      socket.onmessage = function (evt) {
        emitter.$emit('message', evt)
      }

      socket.onerror = function (err) {
        emitter.$emit('error', err)
      }

      socket.onopen = function (evt) {
        emitter.$emit('open', evt)
      }
      emitter.$emit('message', 'Openning Socket.')
    }
  }
})

emitter.connect()

export default emitter
