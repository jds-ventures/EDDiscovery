/*
    [indicators.js]
    - Independent state management module for indicators

    Namespaced is TRUE:
    • getters    ==>  this.$store.getters['indicators/example']
    • actions    ==>  dispatch('indicators/example')
    • mutations  ==>  commit('indicators/example')

    Contents:
    • 1. State
    • 2. Getters
    • 3. Mutations
    • 4. Actions

*/

import actions from './indicators/actions'
import statuses from './indicators/statuses'

export const indicators = {
  namespaced: true,

  // (1). State
  state: {
    status: [],
    statusOther: [],
    actions: [],
    currentShipType: '',
    currentDocked: '',
    currentSupercruise: '',
    currentWing: false,
    currentLanded: false,
    eliteRunning: false
  },

  // (2). Getters
  getters: {
    RETRIEVE_STATUS: state => {
      return state.status
    },
    RETRIEVE_STATUS_OTHER: state => {
      return state.statusOther
    },
    RETRIEVE_ACTIONS: state => {
      return state.actions
    },
    CURRENT_SHIP_TYPE: state => {
      return state.currentShipType
    },
    CURRENT_DOCKED: state => {
      return state.currentDocked
    },
    CURRENT_SUPERCRUISE: state => {
      return state.currentSupercruise
    },
    CURRENT_WING: state => {
      return state.currentWing
    },
    CURRENT_LANDED: state => {
      return state.currentLanded
    },
    CURRENT_RUNNING: state => {
      return state.eliteRunning
    }
  },

  // (3). Mutations
  mutations: {
    resetState: (state) => {
      state.status = []
      state.statusOther = []
      state.actions = []
      state.currentShipType = ''
      state.currentDocked = ''
      state.currentSupercruise = ''
      state.currentWing = ''
      state.currentLanded = ''
      state.eliteRunning = null
    },
    setShipType: (state, payload) => {
      state.currentShipType = payload
    },
    setCurrentDock: (state, payload) => {
      state.currentDocked = payload
    },
    setCurrentSupercruise: (state, payload) => {
      state.currentSupercruise = payload
    },
    setCurrentWing: (state, payload) => {
      state.currentWing = payload
    },
    setCurrentLanded: (state, payload) => {
      state.currentLanded = payload
    },
    setRunningState: (state, payload) => {
      state.eliteRunning = payload
    },
    updateActionStatus: (state, payload) => {
      state.actions = payload
    },
    createIndicator: (state, payload) => {
      if (payload.active === false) return

      let obj = {
        src: 'http://192.168.0.15:6502/statusicons/' + payload.title + '.png',
        alt: payload.title,
        tooltip: payload.tooltip,
        enable: payload.enableIt
      }

      state.status.push(obj)
    },
    createAction: (state, payload) => {
      if (payload.active === false) return

      let obj = {
        src: 'http://192.168.0.15:6502/statusicons/' + payload.title + '.png',
        alt: payload.title,
        tooltip: payload.tooltip,
        socketMsg: payload.socketMsg,
        enable: payload.enableIt,
        duration: payload.duration
      }

      state.actions.push(obj)
    }
  },

  // (4). Actions
  actions: {
    CLEAR: ({commit}) => {
      commit('resetState')
    },
    UPDATE_ACTION_STATUS: ({commit}, payload) => {
      commit('updateActionStatus', payload)
    },
    HANDLE_INDICATOR_MESSAGE: ({commit, dispatch, state}, payload) => {
      let guifocus = payload['GUIFocus']

      switch (guifocus) {
        case 'GalaxyMap':
          payload['GalaxyMapOpen'] = true
          break
        case 'SystemMap':
          payload['SystemMapOpen'] = true
          break
        default:
          break
      }

      let newshiptype = payload['ShipType']
      let newinwing = payload['InWing'] != null && payload['InWing'] === true
      let newsupercruise = payload['Supercruise'] != null && payload['Supercruise'] === true
      let newlanded = payload['Landed'] != null && payload['Landed'] === true
      let newdocked = payload['Docked'] != null && payload['Docked'] === true

      if (newshiptype !== state.currentShipType || newinwing !== state.currentWing || newsupercruise !== state.currentSupercruise || newlanded !== state.currentLanded || newdocked !== state.currentDocked) {
        commit('setShipType', newshiptype)
        commit('setCurrentWing', newinwing)
        commit('setCurrentSupercruise', newsupercruise)
        commit('setCurrentLanded', newlanded)
        commit('setCurrentDock', newdocked)
        dispatch('SETUP_INDICATORS', payload)
      }

      let counter = 0
      state.statusOther = []

      if (payload['LegalState'] != null) {
        state.statusOther.push({
          id: counter++,
          text: 'Legal State: ' + payload['LegalState']
        })
      }
      if (payload['Firegroup'] >= 0 && newshiptype === 'MainShip') {
        state.statusOther.push({
          id: counter++,
          text: 'Fire Group: ' + 'ABCDEFGHIJK'[payload['Firegroup']]
        })
      }
      if (payload['ValidPips']) {
        state.statusOther.push({
          id: counter++,
          text: 'Pips: ' + 'S:' + payload['Pips'][0] + ' E:' + payload['Pips'][1] + ' W:' + payload['Pips'][2]
        })
      }
      if (payload['ValidPosition']) {
        state.statusOther.push({
          id: counter++,
          text: 'Pos: ' + payload['Position'][0] + ', ' + payload['Position'][1]
        })
        if (payload['ValidAltitude']) {
          var alt = payload['Position'][2]
          if (alt > 5000) {
            state.statusOther.push({
              id: counter++,
              text: 'Alt: ' + (alt / 1000.0) + 'km'
            })
          } else {
            state.statusOther.push({
              id: counter++,
              text: 'Alt: ' + alt + 'm'
            })
          }
        }
        if (payload['ValidHeading']) {
          state.statusOther.push({
            id: counter++,
            text: 'Hdr: ' + payload['Position'][3]
          })
        }
      }
      if (payload['ValidPlanetRadius']) {
        state.statusOther.push({
          id: counter++,
          text: 'Radius: ' + payload['PlanetRadius'] / 1000.0 + 'km'
        })
      }
    },
    SETUP_INDICATORS: ({commit, state}, payload) => {
      const innormalspace = !state.currentLanded && !state.currentDocked && !state.currentSupercruise
      const notdockedlanded = !state.currentDocked && !state.currentLanded
      let actionlist = []

      if (state.currentShipType === 'MainShip') {
        commit('setRunningState', true)

        console.log(1234, payload)

        // Cycle through all possible Indicator types for Current Ship Type and displays what is required
        statuses[state.currentShipType].forEach(status => {
          let isActive

          if (status.active === true) {
            isActive = true
          } else if (status.active === 'notdockedlanded') {
            isActive = notdockedlanded
          } else if (status.active === 'innormalspace') {
            isActive = innormalspace
          } else {
            isActive = payload[status.active]
          }

          commit('createIndicator', {
            title: status.title,
            enableIt: payload[status.title],
            tooltip: status.tooltip,
            active: isActive
          })
        })

        actions[state.currentShipType].forEach(status => {
          let isActive

          if (status.active === true) {
            isActive = true
          } else if (status.active === 'notdockedlanded') {
            isActive = notdockedlanded
          } else if (status.active === 'innormalspace') {
            isActive = innormalspace
          } else {
            isActive = payload[status.active]
          }

          commit('createAction', {
            title: status.title,
            enableIt: payload[status.title],
            tooltip: status.tooltip,
            socketMsg: status.socketMsg,
            active: isActive,
            duration: status.duration
          })
        })

        /*

        commit('createAction', {
          iType: 'ChargeECM',
          enableIt: payload.ChargeECM,
          toolTip: 'ChargeECM',
          active: innormalspace,
          duration: 1500
        })

        commit('createAction', {
          iType: 'Supercruise',
          enableIt: payload.Supercruise,
          toolTip: 'Supercruise',
          active: notdockedlanded,
          duration: null
        })

        commit('createAction', {
          iType: 'HyperSuperCombination',
          enableIt: false,
          toolTip: 'HyperSuperCombination',
          active: notdockedlanded,
          duration: 500
        })

        commit('createAction', {
          iType: 'OrbitLinesToggle',
          enableIt: false,
          toolTip: 'OrbitLinesToggle',
          active: notdockedlanded,
          duration: 500
        })

        commit('createAction', {
          iType: 'CyclePreviousTarget',
          enableIt: false,
          toolTip: 'CyclePreviousTarget',
          active: notdockedlanded,
          duration: 500
        })

        commit('createAction', {
          iType: 'CycleNextTarget',
          enableIt: false,
          toolTip: 'CycleNextTarget',
          active: notdockedlanded,
          duration: 500
        })

        commit('createAction', {
          iType: 'SelectHighestThreat',
          enableIt: false,
          toolTip: 'SelectHighestThreat',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'CyclePreviousHostileTarget',
          enableIt: false,
          toolTip: 'CyclePreviousHostileTarget',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'CycleNextHostileTarget',
          enableIt: false,
          toolTip: 'CycleNextHostileTarget',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'CyclePreviousSubsystem',
          enableIt: false,
          toolTip: 'CyclePreviousSubsystem',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'CycleNextSubsystem',
          enableIt: false,
          toolTip: 'CycleNextSubsystem',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'TargetWingman0',
          enableIt: false,
          toolTip: 'TargetWingman0',
          active: payload.InWing,
          duration: 500
        })

        commit('createAction', {
          iType: 'TargetWingman1',
          enableIt: false,
          toolTip: 'TargetWingman1',
          active: payload.InWing,
          duration: 500
        })

        commit('createAction', {
          iType: 'TargetWingman2',
          enableIt: false,
          toolTip: 'TargetWingman2',
          active: payload.InWing,
          duration: 500
        })

        commit('createAction', {
          iType: 'SelectTargetsTarget',
          enableIt: false,
          toolTip: 'SelectTargetsTarget',
          active: payload.InWing,
          duration: 500
        })

        commit('createAction', {
          iType: 'WingNavLock',
          enableIt: false,
          toolTip: 'WingNavLock',
          active: payload.InWing,
          duration: 500
        })

        commit('createAction', {
          iType: 'TargetNextRouteSystem',
          enableIt: false,
          toolTip: 'TargetNextRouteSystem',
          active: payload.Supercruise,
          duration: 500
        })

        commit('createAction', {
          iType: 'CycleFireGroupPrevious',
          enableIt: false,
          toolTip: 'CycleFireGroupPrevious',
          active: notdockedlanded,
          duration: 500
        })

        commit('createAction', {
          iType: 'CycleFireGroupNext',
          enableIt: false,
          toolTip: 'CycleFireGroupNext',
          active: notdockedlanded,
          duration: 500
        })

        commit('createAction', {
          iType: 'IncreaseSystemsPower',
          enableIt: false,
          toolTip: 'IncreaseSystemsPower',
          active: notdockedlanded,
          duration: 500
        })
        commit('createAction', {
          iType: 'IncreaseEnginesPower',
          enableIt: false,
          toolTip: 'IncreaseEnginesPower',
          active: notdockedlanded,
          duration: 500
        })
        commit('createAction', {
          iType: 'IncreaseWeaponsPower',
          enableIt: false,
          toolTip: 'IncreaseWeaponsPower',
          active: notdockedlanded,
          duration: 500
        })

        commit('createAction', {
          iType: 'ResetPowerDistribution',
          enableIt: false,
          toolTip: 'ResetPowerDistribution',
          active: notdockedlanded,
          duration: 500
        })

        commit('createAction', {
          iType: 'OrderDefensiveBehaviour',
          enableIt: false,
          toolTip: 'OrderDefensiveBehaviour',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'OrderAggressiveBehaviour',
          enableIt: false,
          toolTip: 'OrderAggressiveBehaviour',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'OrderFocusTarget',
          enableIt: false,
          toolTip: 'OrderFocusTarget',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'OrderHoldFire',
          enableIt: false,
          toolTip: 'OrderHoldFire',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'OrderHoldPosition',
          enableIt: false,
          toolTip: 'OrderHoldPosition',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'OrderFollow',
          enableIt: false,
          toolTip: 'OrderFollow',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'OrderRequestDock',
          enableIt: false,
          toolTip: 'OrderRequestDock',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'OpenOrders',
          enableIt: false,
          toolTip: 'OpenOrders',
          active: innormalspace,
          duration: 500
        })

        commit('createAction', {
          iType: 'GalaxyMapOpen',
          enableIt: false,
          toolTip: 'GalaxyMapOpen',
          active: true,
          duration: 500
        })

        commit('createAction', {
          iType: 'SystemMapOpen',
          enableIt: false,
          toolTip: 'SystemMapOpen',
          active: true,
          duration: 500
        })

        commit('createAction', {
          iType: 'Screenshot',
          enableIt: false,
          toolTip: 'F10',
          active: true,
          duration: 500
        })

        commit('createAction', {
          iType: 'SilentRunning',
          enableIt: false,
          toolTip: 'ToggleButtonUpInput',
          active: innormalspace,
          duration: 500
        })

        */

      } else if (state.currentShipType === 'SRV') {

        actionlist = [
          CreateAction('SrvHandbrake', 'AutoBreakBuggyButton'),
          CreateAction('SrvTurret', 'ToggleBuggyTurretButton'),
          CreateAction('SrvDriveAssist', 'ToggleDriveAssist'),
          CreateAction('Lights', 'HeadlightsBuggyButton'),

          CreateActionButton('RecallDismissShip', 'F10'),

          CreateActionButton('IncreaseSystemsPower'),
          CreateActionButton('IncreaseEnginesPower'),
          CreateActionButton('IncreaseWeaponsPower'),
          CreateActionButton('ResetPowerDistribution'),

          CreateAction('GalaxyMapOpen'),
          CreateAction('SystemMapOpen'),
          CreateActionButton('Screenshot', 'F10', true, 'Screen Shot')
        ]

        tactions.appendChild(tablerowmultitdlist(actionlist))
      } else if (state.currentShipType === 'Fighter') {

        actionlist = [
          CreateAction('Lights', 'ShipSpotLightToggle'),
          CreateAction('FlightAssist', 'ToggleFlightAssist'),
          CreateAction('NightVision', 'NightVisionToggle'),
          CreateActionButton('IncreaseSystemsPower'),
          CreateActionButton('IncreaseEnginesPower'),
          CreateActionButton('IncreaseWeaponsPower'),
          CreateActionButton('ResetPowerDistribution'),

          CreateActionButton('OrderDefensiveBehaviour'),
          CreateActionButton('OrderAggressiveBehaviour'),
          CreateActionButton('OrderFocusTarget'),
          CreateActionButton('OrderHoldFire'),
          CreateActionButton('OrderHoldPosition'),
          CreateActionButton('OrderFollow'),
          CreateActionButton('OrderRequestDock'),
          CreateActionButton('OpenOrders'),

          CreateAction('GalaxyMapOpen'),
          CreateAction('SystemMapOpen'),
          CreateActionButton('Screenshot', 'F10', true, 'Screen Shot')
        ]

        tactions.appendChild(tablerowmultitdlist(actionlist))
      } else {
        commit('setRunningState', false)
      }
    }
  }
}
