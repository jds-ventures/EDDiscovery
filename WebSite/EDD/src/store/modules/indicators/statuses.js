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
      tooltip: 'Low Fuel'
    },
    {
      title: 'OverHeating',
      active: true,
      tooltip: 'Over Heating'
    },
    {
      title: 'IsInDanger',
      active: 'notdockedlanded',
      tooltip: 'In Danger'
    },
    {
      title: 'BeingInterdicted',
      active: 'Supercruise',
      tooltip: 'Being Interdicted'
    },
    {
      title: 'FsdCharging',
      active: 'notdockedlanded',
      tooltip: 'Fsd Charging'
    },
    {
      title: 'FsdMassLocked',
      active: 'innormalspace',
      tooltip: 'Fsd Mass Locked'
    },
    {
      title: 'FsdCooldown',
      active: 'notdockedlanded',
      tooltip: 'Fsd Cooldown'
    }
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
