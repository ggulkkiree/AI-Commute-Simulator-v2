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
  destinationStop: '본하이리 정류장',
  stopList: [
    '우리 집 앞 정류장',
    '중앙시장',
    '아주터미널',
    '본하이리 정류장',
  ],
  estimatedWalkMinutes: 20,
  estimatedBusMinutes: 30,
  weatherOptions: ['맑음', '비', '더움', '추움', '미세먼지'],
};
