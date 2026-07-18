import { bonHighleeScenario } from './scenarios/bonHighlee.js';

const destinationStop = bonHighleeScenario.commute.destinationStop;

// Mock commute data for the Bon & Highlee core route briefing.
export const commuteConfig = {
  scenarioId: 'bonHighlee',
  companyName: 'Bon & Highlee',
  destinationName: 'Bon & Highlee 사무실',
  targetArrivalTimes: ['09:00', '10:00', '13:00'],
  defaultTargetArrivalTime: '10:00',
  recommendedDepartureTime: '09:10',
  busNumber: '200',
  wrongBusNumbers: ['999', '119'],
  startStop: '우리 집 앞 정류장',
  destinationStop: destinationStop.name,
  stopList: [
    '우리 집 앞 정류장',
    '중앙시장',
    '우리동네',
    destinationStop.name,
  ],
  estimatedWalkMinutes: 20,
  estimatedBusMinutes: 30,
  weatherOptions: ['맑음', '비', '더움', '추움'],
};
