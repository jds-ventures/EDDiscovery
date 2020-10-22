const actions = {
  MainShip: [
    {
      title: 'LandingGear',
      socketMsg: 'LandingGearToggle',
      active: 'innormalspace',
      tooltip: 'Landing Gear Toggle',
      duration: null // Set to null for toggle
    },
    {
      title: 'Lights',
      socketMsg: 'ShipSpotLightToggle',
      active: 'innormalspace',
      tooltip: 'Ship Spot Light Toggle',
      duration: null // Set to null for toggle
    },
    {
      title: 'FlightAssist',
      socketMsg: 'ToggleFlightAssist',
      active: 'innormalspace',
      tooltip: 'Toggle Flight Assist',
      duration: null // Set to null for toggle
    },
    {
      title: 'HardpointsDeployed',
      socketMsg: 'DeployHardpointToggle',
      active: 'notdockedlanded',
      tooltip: 'Deploy Hardpoint Toggle',
      duration: null // Set to null for toggle
    },
    {
      title: 'CargoScoopDeployed',
      socketMsg: 'ToggleCargoScoop',
      active: 'innormalspace',
      tooltip: 'Toggle Cargo Scoop',
      duration: null // Set to null for toggle
    },
    {
      title: 'NightVision',
      socketMsg: 'NightVisionToggle',
      active: 'innormalspace',
      tooltip: 'Night Vision Toggle',
      duration: null // Set to null for toggle
    },
    {
      title: 'UseBoostJuice',
      socketMsg: 'UseBoostJuice',
      active: 'innormalspace',
      tooltip: 'Use Boost Juice',
      duration: 1500 // Set to null for toggle
    },
    {
      title: 'ShieldCell',
      socketMsg: 'UseShieldCell',
      active: 'innormalspace',
      tooltip: 'Use Shield Cell',
      duration: 1000 // Set to null for toggle
    },
    {
      title: 'Chaff',
      socketMsg: 'FireChaffLauncher',
      active: 'innormalspace',
      tooltip: 'Fire Chaff Launcher',
      duration: 1000 // Set to null for toggle
    },
    {
      title: 'HeatSink',
      socketMsg: 'DeployHeatSink',
      active: 'innormalspace',
      tooltip: 'Deploy Heat Sink',
      duration: 1000 // Set to null for toggle
    },
    {
      title: 'ChargeECM',
      socketMsg: 'ChargeECM',
      active: 'innormalspace',
      tooltip: 'Charge ECM',
      duration: 1500 // Set to null for toggle
    },
    {
      title: 'Supercruise',
      socketMsg: 'Supercruise',
      active: 'notdockedlanded',
      tooltip: 'Engage Supercruise',
      duration: null // Set to null for toggle
    },
    {
      title: 'HyperSuperCombination',
      socketMsg: 'HyperSuperCombination',
      active: 'notdockedlanded',
      tooltip: 'Hyper Super Combination',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrbitLinesToggle',
      socketMsg: 'OrbitLinesToggle',
      active: 'notdockedlanded',
      tooltip: 'Orbit Lines Toggle',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'CyclePreviousTarget',
      socketMsg: 'CyclePreviousTarget',
      active: 'notdockedlanded',
      tooltip: 'Cycle Previous Target',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'CycleNextTarget',
      socketMsg: 'CycleNextTarget',
      active: 'notdockedlanded',
      tooltip: 'Cycle Next Target',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'SelectHighestThreat',
      socketMsg: 'SelectHighestThreat',
      active: 'innormalspace',
      tooltip: 'Select Highest Threat',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'CyclePreviousHostileTarget',
      socketMsg: 'CyclePreviousHostileTarget',
      active: 'innormalspace',
      tooltip: 'Cycle Previous Hostile Target',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'CycleNextHostileTarget',
      socketMsg: 'CycleNextHostileTarget',
      active: 'innormalspace',
      tooltip: 'Cycle Next Hostile Target',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'CyclePreviousSubsystem',
      socketMsg: 'CyclePreviousSubsystem',
      active: 'innormalspace',
      tooltip: 'Cycle Previous Subsystem',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'CycleNextSubsystem',
      socketMsg: 'CycleNextSubsystem',
      active: 'innormalspace',
      tooltip: 'Cycle Next Subsystem',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'TargetWingman0',
      socketMsg: 'TargetWingman0',
      active: 'inwing',
      tooltip: 'Target Wingman 0',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'TargetWingman1',
      socketMsg: 'TargetWingman1',
      active: 'inwing',
      tooltip: 'Target Wingman 1',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'TargetWingman2',
      socketMsg: 'TargetWingman2',
      active: 'inwing',
      tooltip: 'Target Wingman 2',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'SelectTargetsTarget',
      socketMsg: 'SelectTargetsTarget',
      active: 'inwing',
      tooltip: 'Select Targets Target',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'WingNavLock',
      socketMsg: 'WingNavLock',
      active: 'inwing',
      tooltip: 'Wing Nav Lock',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'TargetNextRouteSystem',
      socketMsg: 'TargetNextRouteSystem',
      active: 'insupercruise',
      tooltip: 'Target Next Route System',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'CycleFireGroupPrevious',
      socketMsg: 'CycleFireGroupPrevious',
      active: 'notdockedlanded',
      tooltip: 'Cycle Fire Group Previous',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'CycleFireGroupNext',
      socketMsg: 'CycleFireGroupNext',
      active: 'notdockedlanded',
      tooltip: 'Cycle Fire Group Next',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'IncreaseSystemsPower',
      socketMsg: 'IncreaseSystemsPower',
      active: 'notdockedlanded',
      tooltip: 'Increase Systems Power',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'IncreaseEnginesPower',
      socketMsg: 'IncreaseEnginesPower',
      active: 'notdockedlanded',
      tooltip: 'Increase Engines Power',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'IncreaseWeaponsPower',
      socketMsg: 'IncreaseWeaponsPower',
      active: 'notdockedlanded',
      tooltip: 'Increase Weapons Power',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'ResetPowerDistribution',
      socketMsg: 'ResetPowerDistribution',
      active: 'notdockedlanded',
      tooltip: 'Reset Power Distribution',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderDefensiveBehaviour',
      socketMsg: 'OrderDefensiveBehaviour',
      active: 'innormalspace',
      tooltip: 'Order Defensive Behaviour',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderAggressiveBehaviour',
      socketMsg: 'OrderAggressiveBehaviour',
      active: 'innormalspace',
      tooltip: 'Order Aggressive Behaviour',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderFocusTarget',
      socketMsg: 'OrderFocusTarget',
      active: 'innormalspace',
      tooltip: 'Order Focus Target',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderHoldFire',
      socketMsg: 'OrderHoldFire',
      active: 'innormalspace',
      tooltip: 'Order Hold Fire',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderHoldPosition',
      socketMsg: 'OrderHoldPosition',
      active: 'innormalspace',
      tooltip: 'Order Hold Position',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderFollow',
      socketMsg: 'OrderFollow',
      active: 'innormalspace',
      tooltip: 'Order Follow',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderRequestDock',
      socketMsg: 'OrderRequestDock',
      active: 'innormalspace',
      tooltip: 'Order Request Dock',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OpenOrders',
      socketMsg: 'OpenOrders',
      active: 'innormalspace',
      tooltip: 'Open Orders',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'GalaxyMapOpen',
      socketMsg: 'GalaxyMapOpen',
      active: true,
      tooltip: 'Open Galaxy Map',
      duration: null // Set to null for toggle
    },
    {
      title: 'SystemMapOpen',
      socketMsg: 'SystemMapOpen',
      active: true,
      tooltip: 'Open System Map',
      duration: null // Set to null for toggle
    },
    {
      title: 'Screenshot',
      socketMsg: 'F10',
      active: true,
      tooltip: 'Screenshot',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'SilentRunning',
      socketMsg: 'ToggleButtonUpInput',
      active: 'innormalspace',
      tooltip: 'Silent Running',
      duration: null // Set to null for toggle
    }
  ],
  SRV: [
    {
      title: 'SrvHandbrake',
      socketMsg: 'AutoBreakBuggyButton',
      active: 'landed',
      tooltip: 'Srv Handbrake',
      duration: null // Set to null for toggle
    },
    {
      title: 'SrvTurret',
      socketMsg: 'ToggleBuggyTurretButton',
      active: 'landed',
      tooltip: 'Srv Turret',
      duration: null // Set to null for toggle
    },
    {
      title: 'SrvTurret',
      socketMsg: 'ToggleBuggyTurretButton',
      active: 'landed',
      tooltip: 'Srv Turret',
      duration: null // Set to null for toggle
    },
    {
      title: 'SrvDriveAssist',
      socketMsg: 'ToggleDriveAssist',
      active: 'landed',
      tooltip: 'Srv Drive Assist',
      duration: null // Set to null for toggle
    },
    {
      title: 'Lights',
      socketMsg: 'HeadlightsBuggyButton',
      active: 'landed',
      tooltip: 'Lights',
      duration: null // Set to null for toggle
    },
    {
      title: 'RecallDismissShip',
      socketMsg: 'RecallDismissShip',
      active: 'landed',
      tooltip: 'Recall / Dismiss Ship',
      duration: null // Set to null for toggle
    },
    {
      title: 'IncreaseSystemsPower',
      socketMsg: 'IncreaseSystemsPower',
      active: 'notdockedlanded',
      tooltip: 'Increase Systems Power',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'IncreaseEnginesPower',
      socketMsg: 'IncreaseEnginesPower',
      active: 'notdockedlanded',
      tooltip: 'Increase Engines Power',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'IncreaseWeaponsPower',
      socketMsg: 'IncreaseWeaponsPower',
      active: 'notdockedlanded',
      tooltip: 'Increase Weapons Power',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'ResetPowerDistribution',
      socketMsg: 'ResetPowerDistribution',
      active: 'notdockedlanded',
      tooltip: 'Reset Power Distribution',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'GalaxyMapOpen',
      socketMsg: 'GalaxyMapOpen',
      active: true,
      tooltip: 'Open Galaxy Map',
      duration: null // Set to null for toggle
    },
    {
      title: 'SystemMapOpen',
      socketMsg: 'SystemMapOpen',
      active: true,
      tooltip: 'Open System Map',
      duration: null // Set to null for toggle
    },
    {
      title: 'Screenshot',
      socketMsg: 'F10',
      active: true,
      tooltip: 'Screenshot',
      duration: 500 // Set to null for toggle
    }
  ],
  Fighter: [
    {
      title: 'Lights',
      socketMsg: 'ShipSpotLightToggle',
      active: 'innormalspace',
      tooltip: 'Ship Spot Light Toggle',
      duration: null // Set to null for toggle
    },
    {
      title: 'FlightAssist',
      socketMsg: 'ToggleFlightAssist',
      active: 'innormalspace',
      tooltip: 'Toggle Flight Assist',
      duration: null // Set to null for toggle
    },
    {
      title: 'NightVision',
      socketMsg: 'NightVisionToggle',
      active: 'innormalspace',
      tooltip: 'Night Vision Toggle',
      duration: null // Set to null for toggle
    },
    {
      title: 'IncreaseSystemsPower',
      socketMsg: 'IncreaseSystemsPower',
      active: 'notdockedlanded',
      tooltip: 'Increase Systems Power',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'IncreaseEnginesPower',
      socketMsg: 'IncreaseEnginesPower',
      active: 'notdockedlanded',
      tooltip: 'Increase Engines Power',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'IncreaseWeaponsPower',
      socketMsg: 'IncreaseWeaponsPower',
      active: 'notdockedlanded',
      tooltip: 'Increase Weapons Power',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'ResetPowerDistribution',
      socketMsg: 'ResetPowerDistribution',
      active: 'notdockedlanded',
      tooltip: 'Reset Power Distribution',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderDefensiveBehaviour',
      socketMsg: 'OrderDefensiveBehaviour',
      active: 'innormalspace',
      tooltip: 'Order Defensive Behaviour',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderAggressiveBehaviour',
      socketMsg: 'OrderAggressiveBehaviour',
      active: 'innormalspace',
      tooltip: 'Order Aggressive Behaviour',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderFocusTarget',
      socketMsg: 'OrderFocusTarget',
      active: 'innormalspace',
      tooltip: 'Order Focus Target',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderHoldFire',
      socketMsg: 'OrderHoldFire',
      active: 'innormalspace',
      tooltip: 'Order Hold Fire',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderHoldPosition',
      socketMsg: 'OrderHoldPosition',
      active: 'innormalspace',
      tooltip: 'Order Hold Position',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderFollow',
      socketMsg: 'OrderFollow',
      active: 'innormalspace',
      tooltip: 'Order Follow',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OrderRequestDock',
      socketMsg: 'OrderRequestDock',
      active: 'innormalspace',
      tooltip: 'Order Request Dock',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'OpenOrders',
      socketMsg: 'OpenOrders',
      active: 'innormalspace',
      tooltip: 'Open Orders',
      duration: 500 // Set to null for toggle
    },
    {
      title: 'GalaxyMapOpen',
      socketMsg: 'GalaxyMapOpen',
      active: true,
      tooltip: 'Open Galaxy Map',
      duration: null // Set to null for toggle
    },
    {
      title: 'SystemMapOpen',
      socketMsg: 'SystemMapOpen',
      active: true,
      tooltip: 'Open System Map',
      duration: null // Set to null for toggle
    },
    {
      title: 'Screenshot',
      socketMsg: 'F10',
      active: true,
      tooltip: 'Screenshot',
      duration: 500 // Set to null for toggle
    }
  ]
}

export default actions
