const statuses = {
  MainShip: [
    {
      title: 'Docked',
      active: true,
      tooltip: 'Docked'
    },
    {
      title: 'Landed',
      active: true,
      tooltip: 'Landed'
    },
    {
      title: 'ShieldsUp',
      active: true,
      tooltip: 'Shields Up'
    },
    {
      title: 'InWing',
      active: true,
      tooltip: 'In Wing'
    },
    {
      title: 'ScoopingFuel',
      active: 'Supercruise',
      tooltip: 'Scooping Fuel'
    },
    {
      title: 'LowFuel',
      active: true,
      tooltip: ''
    },
    {
      title: 'OverHeating',
      active: 'notdockedlanded',
      tooltip: ''
    },
    {
      title: 'IsInDanger',
      active: 'notdockedlanded',
      tooltip: ''
    },
    {
      title: 'BeingInterdicted',
      active: 'Supercruise',
      tooltip: ''
    },
    {
      title: 'FsdCharging',
      active: 'notdockedlanded',
      tooltip: ''
    },
    {
      title: 'FsdMassLocked',
      active: 'innormalspace',
      tooltip: ''
    },
    {
      title: 'FsdCooldown',
      active: 'notdockedlanded',
      tooltip: ''
    },
  ],
  SRV: [
    {
      title: 'SrvUnderShip',
      active: true,
      tooltip: 'Srv Under Ship'
    },
    {
      title: 'LowFuel',
      active: true,
      tooltip: 'Low Fuel'
    },
    {
      title: 'ShieldsUp',
      active: true,
      tooltip: 'Shields Up'
    }
  ],
  Fighter: [
    {
      title: 'ShieldsUp',
      active: true,
      tooltip: 'Shields Up'
    }
  ]
}

export default statuses