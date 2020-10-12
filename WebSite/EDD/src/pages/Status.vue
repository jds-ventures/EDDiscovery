<template>
  <div>
    <div class='wrapper'>
        <div class='wrapleft'>
            <article>
                <table id='StarData'>
                  <tr v-for='star in starData' v-bind:key='star.id'>
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
                  <p v-if="eliteRunning === false">Elite not running</p>
                </table>
                <div id='StatusOther'></div>
            </div>
        </aside>

    </div>

    <div id='ActionBox'>
        <p>Actions</p>
        <table id='Actions'></table>
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
  computed: {
    starData: {
      get () {
        return this.$store.getters['starData/RETRIEVE']
      }
    },
    currentShipType: {
      get () {
        return this.$store.getters['indicators/CURRENT_SHIP_TYPE']
      }
    },
    currentDocked: {
      get () {
        return this.$store.getters['indicators/CURRENT_DOCKED']
      }
    },
    currentSupercruise: {
      get () {
        return this.$store.getters['indicators/CURRENT_SUPERCRUISE']
      }
    },
    currentWing: {
      get () {
        return this.$store.getters['indicators/CURRENT_WING']
      }
    },
    currentLanded: {
      get () {
        return this.$store.getters['indicators/CURRENT_LANDED']
      }
    },
    eliteRunning: {
      get () {
        return this.$store.getters['indicators/CURRENT_RUNNING']
      }
    },
    indicators: {
      get () {
        return this.$store.getters['indicators/RETRIEVE']
      }
    }
  },
  beforeCreated () {
    this.$store.dispatch('indicators/CLEAR')
    this.Socket.refresh()
  },
  created () {
    this.Socket.$on('open', this.onOpen)
    this.Socket.$on('close', this.onClose)
    this.Socket.$on('message', this.onMessage)
    this.Socket.$on('error', this.onError)
  },
  beforeDestroy () {
    this.Socket.$off('open', this.onOpen)
    this.Socket.$off('close', this.onClose)
    this.Socket.$off('message', this.onMessage)
    this.Socket.$off('error', this.onError)
  },
  methods: {
    onOpen (evt) {
      this.Socket.requestStatus(-1)
      this.Socket.requestIndicator()
    },
    onClose (evt) {},
    onMessage (evt) {
      let jdata = JSON.parse(evt.data)

      if (jdata.responsetype === 'indicator' || jdata.responsetype === 'indicatorpush') {
        this.HandleIndicatorMessage(jdata, 'Status', 'Actions', 'StatusOther')
        // console.log(jdata, 'Status', 'Actions', 'StatusOther')
      } else if (jdata.responsetype === 'status' || jdata.responsetype === 'statuspush') {
        this.$store.dispatch('starData/FILL_DATA', jdata)
      }
    },
    onError (evt) {
      console.error('Web Error ' + evt.data)
    },
    HandleIndicatorMessage (jdata, statuselement, actionelement, statusotherelement) {
      var guifocus = jdata['GUIFocus']

      if (guifocus === 'GalaxyMap') { // translate the GUI focus to appropriate true tags for the set indicator code
        jdata['GalaxyMapOpen'] = true
      }
      if (guifocus === 'SystemMap') {
        jdata['SystemMapOpen'] = true
      }

      console.log('Indicators Mod' + JSON.stringify(jdata))

      var newshiptype = jdata['ShipType']
      var newinwing = jdata['InWing'] != null && jdata['InWing'] === true
      var newsupercruise = jdata['Supercruise'] != null && jdata['Supercruise'] === true
      var newlanded = jdata['Landed'] != null && jdata['Landed'] === true
      var newdocked = jdata['Docked'] != null && jdata['Docked'] === true

      if (newshiptype !== this.currentshiptype || newinwing !== this.currentWing || newsupercruise !== this.currentSupercruise || newlanded !== this.currentLanded || newdocked !== this.currentDocked) {
        this.$store.dispatch('indicators/SET_SHIP_TYPE', newshiptype)
        this.$store.dispatch('indicators/SET_CURRENT_WING', newinwing)
        this.$store.dispatch('indicators/SET_CURRENT_SUPERCRUISE', newsupercruise)
        this.$store.dispatch('indicators/SET_CURRENT_LANDED', newlanded)
        this.$store.dispatch('indicators/SET_CURRENT_DOCK', newdocked)
        console.log(123456)
        this.SetupIndicators(jdata, document.getElementById(statuselement), document.getElementById(actionelement))
      }

      this.SetIndicatorState(jdata, document.getElementById(statuselement))
      this.SetIndicatorState(jdata, document.getElementById(actionelement))

      if (statusotherelement != null) {
        var tstatusother = document.getElementById(statusotherelement)

        this.removeChildren(tstatusother)

        if (jdata['LegalState'] != null) {
          tstatusother.appendChild(this.CreatePara('Legal State: ' + jdata['LegalState']))
        }
        if (jdata['Firegroup'] >= 0 && newshiptype === 'MainShip') {
          tstatusother.appendChild(this.CreatePara('Fire Group: ' + 'ABCDEFGHIJK'[jdata['Firegroup']]))
        }
        if (jdata['ValidPips']) {
          tstatusother.appendChild(this.CreatePara('Pips: ' + 'S:' + jdata['Pips'][0] + ' E:' + jdata['Pips'][1] + ' W:' + jdata['Pips'][2]))
        }
        if (jdata['ValidPosition']) {
          tstatusother.appendChild(this.CreatePara('Pos: ' + jdata['Position'][0] + ', ' + jdata['Position'][1]))
          if (jdata['ValidAltitude']) {
            var alt = jdata['Position'][2]
            if (alt > 5000) {
              tstatusother.appendChild(this.CreatePara('Alt: ' + (alt / 1000.0) + 'km'))
            } else {
              tstatusother.appendChild(this.CreatePara('Alt: ' + alt + 'm'))
            }
          }
          if (jdata['ValidHeading']) {
            tstatusother.appendChild(this.CreatePara('Hdr: ' + jdata['Position'][3]))
          }
        }
        if (jdata['ValidPlanetRadius']) {
          tstatusother.appendChild(this.CreatePara('Radius: ' + jdata['PlanetRadius'] / 1000.0 + 'km'))
        }
      }
    },
    CreatePara (text) {
      var a2 = document.createElement('p')
      a2.innerHTML = text
      return a2
    },
    removeChildren (tab) {
      if (tab === null) return

      while (tab.hasChildNodes()) {
        tab.removeChild(tab.firstChild)
      }
    },
    SetIndicatorState (jdata, tstatus) {
      console.log(tstatus)
      if (tstatus === null) return

      tstatus.childNodes.forEach(function (x) {
        x.childNodes.forEach(function (y) {
          y.childNodes.forEach(function (y1) {
            y1.childNodes.forEach(function (z) {
              if (z.nodeName === 'IMG' && z.tag != null) {
                console.log('Entry is ' + z.nodeName + ' ' + z.tag)
                var indicator = z.tag[0]
                if (indicator != null) { // presuming this works if z.tag is not defined.
                  // console.log('..1 ' + z.tag + ' value is ' + jdata[z.tag])
                  if (jdata[indicator] != null && jdata[indicator] === true) {
                    z.classList.add('entryselected') // using a class means it does not mess up all the other properties.
                  } else {
                    z.classList.remove('entryselected')
                  }
                }
              }
            })
          })
        })
      })
    },
    SetupIndicators (jdata, tstatus, tactions) {
      this.removeChildren(tstatus)
      this.removeChildren(tactions)

      var innormalspace = !this.currentLanded && !this.currentDocked && !this.currentSupercruise
      var notdockedlanded = !this.currentDocked && !this.currentLanded
      let actionlist = []
      let statuslist = []

      console.log('Create Indicators with L:' + this.currentLanded + ' D:' + this.currentDocked + ' N:' + innormalspace + ' W:' + this.currentWing + ' S:' + this.currentSupercruise)

      if (this.currentshiptype === 'MainShip') {
        this.$store.dispatch('indicators/SET_RUNNING_STATE', true)

        statuslist = [
          this.CreateIndicator('Docked'), this.CreateIndicator('Landed'), this.CreateIndicator('ShieldsUp'),
          this.CreateIndicator('InWing'), this.CreateIndicator('ScoopingFuel', this.currentSupercruise),
          this.CreateIndicator('LowFuel'), this.CreateIndicator('OverHeating'), this.CreateIndicator('IsInDanger', !this.currentDocked, 'In Danger'),
          this.CreateIndicator('BeingInterdicted', this.currentSupercruise), this.CreateIndicator('FsdCharging', notdockedlanded),
          this.CreateIndicator('FsdMassLocked', innormalspace),
          this.CreateIndicator('FsdCooldown', this.currentSupercruise || innormalspace)
        ]

        tstatus.appendChild(this.tablerowmultitdlist(statuslist))

        actionlist = [
          this.CreateAction('LandingGear', 'LandingGearToggle', innormalspace), // reported..
          this.CreateAction('Lights', 'ShipSpotLightToggle'),
          this.CreateAction('FlightAssist', 'ToggleFlightAssist', innormalspace),
          this.CreateAction('HardpointsDeployed', 'DeployHardpointToggle', notdockedlanded),

          this.CreateAction('CargoScoopDeployed', 'ToggleCargoScoop', innormalspace),
          this.CreateAction('NightVision', 'NightVisionToggle', innormalspace),

          this.CreateAction('UseBoostJuice', null, innormalspace, 1500),
          this.CreateAction('ShieldCell', 'UseShieldCell', innormalspace, 1000),
          this.CreateAction('Chaff', 'FireChaffLauncher', innormalspace, 1000),
          this.CreateAction('HeatSink', 'DeployHeatSink', innormalspace, 1000),
          this.CreateAction('ChargeECM', null, innormalspace, 1500),

          this.CreateAction('Supercruise', null, notdockedlanded), // reported
          this.CreateActionButton('HyperSuperCombination', null, notdockedlanded), // not reported
          this.CreateActionButton('OrbitLinesToggle'),

          this.CreateActionButton('CyclePreviousTarget'),
          this.CreateActionButton('CycleNextTarget'),
          this.CreateActionButton('SelectHighestThreat', null, innormalspace),
          this.CreateActionButton('CyclePreviousHostileTarget', null, innormalspace),
          this.CreateActionButton('CycleNextHostileTarget', null, innormalspace),

          this.CreateActionButton('CyclePreviousSubsystem', null, innormalspace),
          this.CreateActionButton('CycleNextSubsystem', null, innormalspace),

          this.CreateActionButton('TargetWingman0', null, this.currentWing),
          this.CreateActionButton('TargetWingman1', null, this.currentWing),
          this.CreateActionButton('TargetWingman2', null, this.currentWing),
          this.CreateActionButton('SelectTargetsTarget', null, this.currentWing),
          this.CreateActionButton('WingNavLock', null, this.currentWing),

          this.CreateActionButton('TargetNextRouteSystem', null, this.currentSupercruise),

          this.CreateActionButton('CycleFireGroupPrevious'),
          this.CreateActionButton('CycleFireGroupNext'),

          this.CreateActionButton('IncreaseSystemsPower', null, !this.currentDocked),
          this.CreateActionButton('IncreaseEnginesPower', null, !this.currentDocked),
          this.CreateActionButton('IncreaseWeaponsPower', null, !this.currentDocked),
          this.CreateActionButton('ResetPowerDistribution', null, !this.currentDocked),

          this.CreateActionButton('OrderDefensiveBehaviour', null, innormalspace),
          this.CreateActionButton('OrderAggressiveBehaviour', null, innormalspace),
          this.CreateActionButton('OrderFocusTarget', null, innormalspace),
          this.CreateActionButton('OrderHoldFire', null, innormalspace),
          this.CreateActionButton('OrderHoldPosition', null, innormalspace),
          this.CreateActionButton('OrderFollow', null, innormalspace),
          this.CreateActionButton('OrderRequestDock', null, innormalspace),
          this.CreateActionButton('OpenOrders', null, innormalspace),

          this.CreateAction('GalaxyMapOpen'),
          this.CreateAction('SystemMapOpen'),
          this.CreateActionButton('Screenshot', 'F10', true, 'Screen Shot'),

          this.CreateAction('SilentRunning', 'ToggleButtonUpInput', innormalspace, 0, true, 'Silent Running')
        ]

        tactions.appendChild(this.tablerowmultitdlist(actionlist))
      } else if (this.currentshiptype === 'SRV') {
        this.$store.dispatch('indicators/SET_RUNNING_STATE', true)

        statuslist = [
          this.CreateIndicator('SrvUnderShip'), this.CreateIndicator('LowFuel'), this.CreateIndicator('ShieldsUp')
        ]

        actionlist = [
          this.CreateAction('SrvHandbrake', 'AutoBreakBuggyButton'),
          this.CreateAction('SrvTurret', 'ToggleBuggyTurretButton'),
          this.CreateAction('SrvDriveAssist', 'ToggleDriveAssist'),
          this.CreateAction('Lights', 'HeadlightsBuggyButton'),

          this.CreateActionButton('RecallDismissShip', 'F10'),

          this.CreateActionButton('IncreaseSystemsPower'),
          this.CreateActionButton('IncreaseEnginesPower'),
          this.CreateActionButton('IncreaseWeaponsPower'),
          this.CreateActionButton('ResetPowerDistribution'),

          this.CreateAction('GalaxyMapOpen'),
          this.CreateAction('SystemMapOpen'),
          this.CreateActionButton('Screenshot', 'F10', true, 'Screen Shot')
        ]

        tstatus.appendChild(this.tablerowmultitdlist(statuslist))
        tactions.appendChild(this.tablerowmultitdlist(actionlist))
      } else if (this.currentshiptype === 'Fighter') {
        this.$store.dispatch('indicators/SET_RUNNING_STATE', true)

        statuslist = [
          this.CreateIndicator('ShieldsUp')
        ]

        actionlist = [
          this.CreateAction('Lights', 'ShipSpotLightToggle'),
          this.CreateAction('FlightAssist', 'ToggleFlightAssist'),
          this.CreateAction('NightVision', 'NightVisionToggle'),
          this.CreateActionButton('IncreaseSystemsPower'),
          this.CreateActionButton('IncreaseEnginesPower'),
          this.CreateActionButton('IncreaseWeaponsPower'),
          this.CreateActionButton('ResetPowerDistribution'),

          this.CreateActionButton('OrderDefensiveBehaviour'),
          this.CreateActionButton('OrderAggressiveBehaviour'),
          this.CreateActionButton('OrderFocusTarget'),
          this.CreateActionButton('OrderHoldFire'),
          this.CreateActionButton('OrderHoldPosition'),
          this.CreateActionButton('OrderFollow'),
          this.CreateActionButton('OrderRequestDock'),
          this.CreateActionButton('OpenOrders'),

          this.CreateAction('GalaxyMapOpen'),
          this.CreateAction('SystemMapOpen'),
          this.CreateActionButton('Screenshot', 'F10', true, 'Screen Shot')
        ]

        tstatus.appendChild(this.tablerowmultitdlist(statuslist))
        tactions.appendChild(this.tablerowmultitdlist(actionlist))
      } else {
        console.log('Elite not running')
        this.$store.dispatch('indicators/SET_RUNNING_STATE', false)
      }
    },
    CreateIndicator (itype, enableit = true, tooltip = null) {
      if (enableit) {
        if (tooltip == null) {
          tooltip = itype.replace(/([a-z](?=[A-Z]))/g, '$1 ')
        }

        return console.log('http://192.168.0.15:6502/statusicons/' + itype + '.png', itype, 64, null, [itype, null], tooltip)
      } else {
        return null
      }
    },
    CreateAction (name, bindingname = null, enableit = true, flashit = 0, confirmit = false, tooltip = null) {
      if (enableit) {
        if (bindingname == null) {
          bindingname = name
        }

        if (tooltip == null) {
          tooltip = bindingname.replace(/([a-z](?=[A-Z]))/g, '$1 ')
        }
        // console.log('create action image name:' + itype + ' a:' + action + ' ')
        return console.log('http://192.168.0.15:6502/statusicons/' + name + '.png', name, 64, this.ClickActionItem(), [name, bindingname, flashit, confirmit], tooltip)
      } else {
        return null
      }
    },
    ClickActionItem (e) {
      if (e.target.tag[3]) {
        if (!confirm('Confirm ' + e.target.tag[0])) {
          return
        }
      }

      console.log('Press key ' + e.target.tag[1])
      var msg = {
        requesttype: 'presskey',
        key: e.target.tag[1]
      }

      this.Socket.send(JSON.stringify(msg))

      if (e.target.tag[2] > 0) {
        e.target.classList.add('entryselected') // using a class means it does not mess up all the other properties.
        console.log('Flash it! ' + e.target.tag[2])
        setTimeout(function (f) {
          console.log('Flash off!')
          e.target.classList.remove('entryselected') // using a class means it does not mess up all the other properties.
        }, e.target.tag[2])
      }
    },
    CreateActionButton (name, bindingname = null, enableit = true, tooltip = null) {
      return this.CreateAction(name, bindingname, enableit, 250, null, tooltip)
    },
    tablerowmultitdlist (elements, classnames = null) {
      var tr = document.createElement('tr')

      for (var i = 0; i < elements.length; i++) {
        if (elements[i] != null) {
          var td = document.createElement('td')
          tr.appendChild(td)

          if (classnames !== null) {
            elements[i].classList.add(classnames[i])
          }

          td.appendChild(elements[i])
        }
      }

      return tr
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
@import '../../WebOld/Status/status.css';
</style>
