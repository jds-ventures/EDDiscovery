// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fullscreen from 'vue-fullscreen'

Vue.use(fullscreen)

Vue.config.productionTip = false

// Legacy EDD WebSite JS Resources

require('../WebOld/jslib/elements.js')
require('../WebOld/jslib/http.js')
require('../WebOld/jslib/tables.js')
require('../WebOld/jslib/websockets.js')
require('../WebOld/header.js')
require('../WebOld/journal/journal.js')
require('../WebOld/systemtable/systemtable.js')
require('../WebOld/index.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
