const destinationStop = {
  id: 'bon-highlee-front',
  name: '\ubcf8\uc564\ud558\uc774\ub9ac \uc55e',
  legacyNames: ['\ubcf8\ud558\uc774\ub9ac \uc815\ub958\uc7a5'],
};

// Scenario placeholder for the core Bon Highlee commute flow.
export const bonHighleeScenario = {
  id: 'bonHighlee',
  title: 'Bon Highlee',
  coreFlowOnly: true,
  commute: {
    destinationStop,
  },
};

export function isBonHighleeDestinationStop({ stopId, stopName } = {}) {
  if (stopId) {
    return stopId === destinationStop.id;
  }

  return (
    stopName === destinationStop.name ||
    destinationStop.legacyNames.includes(stopName)
  );
}

export function getBonHighleeStopDisplayName({ stopId, stopName } = {}) {
  return isBonHighleeDestinationStop({ stopId, stopName })
    ? destinationStop.name
    : stopName;
}
