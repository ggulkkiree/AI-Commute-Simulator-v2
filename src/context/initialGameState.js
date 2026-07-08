import { SCREEN_IDS } from '../data/screenIds.js';
import { students as defaultStudents } from '../data/students.js';
import { morningActivities as morningActivityDefinitions } from '../data/morningActivities.js';
import { loadSelectedStudent, loadStudentList } from '../utils/storage.js';

const savedStudent = loadSelectedStudent();
const savedStudentList = loadStudentList(defaultStudents);

// Initial state for the core commute simulation flow.
export const initialGameState = {
  currentScreen: SCREEN_IDS.startScreen,
  studentList: savedStudentList,
  selectedStudent: savedStudent,
  studentLevel: savedStudent?.level ?? null,
  targetArrivalTime: null,
  wakeUpTime: '07:00',
  currentTime: '07:00',
  weather: null,
  aiPlanInput: {
    arrivalTime: null,
    weather: null,
    transport: 'bus',
  },
  aiPlanResult: {
    recommendedWakeUpTime: null,
    recommendedLeaveHomeTime: null,
    busNumber: null,
    expectedArrivalTime: null,
    requiredItems: [],
  },
  studentChoices: {
    selectedAlarmTime: null,
    selectedItems: [],
    selectedBusNumber: null,
    completedMorningTasks: [],
    hasStartedCommute: false,
    hasCompletedBusRide: false,
    hasReachedDestinationArea: false,
    hasSeenResultCutscene: false,
    eveningBagChecked: false,
    eveningCheckedItems: [],
    plannedWakeUpTime: null,
    alarmChecked: false,
    wakeUpDelayMinutes: 0,
    wakeUpChoice: null,
  },
  eveningPackedItems: [],
  morningActivities: morningActivityDefinitions.map((activity) => ({
    id: activity.id,
    completed: false,
  })),
  bagItems: [],
  bagChecked: false,
  selectedBus: null,
  currentStop: null,
  wokeUpEarly: null,
  rawJudgment: null,
  displayJudgment: null,
  feedbackTags: [],
  resultSummary: null,
  reportData: null,
  scenarioId: 'bonHighlee',
};
