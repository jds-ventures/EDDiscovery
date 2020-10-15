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
    }
  ],
  SRV: [

  ],
  Fighter: [

  ]
}

export default actions