import { GAME_ACTIONS } from './gameActions.js';
import { initialGameState } from './initialGameState.js';
import { SCREEN_IDS } from '../data/screenIds.js';

export function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTIONS.GO_TO_SCREEN:
      return {
        ...state,
        currentScreen: action.payload,
      };

    case GAME_ACTIONS.ADD_STUDENT:
      return {
        ...state,
        studentList: [...(state.studentList ?? []), action.payload],
      };

    case GAME_ACTIONS.DELETE_STUDENT:
      return {
        ...state,
        studentList: (state.studentList ?? []).filter(
          (student) => student.id !== action.payload,
        ),
        selectedStudent:
          state.selectedStudent?.id === action.payload
            ? null
            : state.selectedStudent,
        studentLevel:
          state.selectedStudent?.id === action.payload ? null : state.studentLevel,
      };

    case GAME_ACTIONS.SET_SELECTED_STUDENT:
      return {
        ...state,
        selectedStudent: action.payload,
        studentLevel: action.payload?.level ?? null,
      };

    case GAME_ACTIONS.LOAD_SAVED_STUDENT:
      return {
        ...state,
        selectedStudent: action.payload,
        studentLevel: action.payload?.level ?? null,
        currentScreen: state.currentScreen,
      };

    case GAME_ACTIONS.CLEAR_SELECTED_STUDENT:
      return {
        ...state,
        selectedStudent: null,
        studentLevel: null,
      };

    case GAME_ACTIONS.SAVE_AI_PLAN_INPUT:
      return {
        ...state,
        aiPlanInput: {
          arrivalTime: action.payload?.arrivalTime ?? null,
          weather: action.payload?.weather ?? null,
          transport: action.payload?.transport ?? 'bus',
        },
        targetArrivalTime: action.payload?.arrivalTime ?? state.targetArrivalTime,
        weather: action.payload?.weather ?? state.weather,
      };

    case GAME_ACTIONS.SAVE_AI_PLAN_RESULT:
      return {
        ...state,
        aiPlanResult: {
          recommendedWakeUpTime:
            action.payload?.recommendedWakeUpTime ?? null,
          recommendedLeaveHomeTime:
            action.payload?.recommendedLeaveHomeTime ?? null,
          busNumber: action.payload?.busNumber ?? null,
          expectedArrivalTime: action.payload?.expectedArrivalTime ?? null,
          requiredItems: action.payload?.requiredItems ?? [],
        },
      };

    case GAME_ACTIONS.SAVE_EVENING_BAG_CHECK:
      return {
        ...state,
        studentChoices: {
          ...state.studentChoices,
          eveningBagChecked: action.payload?.eveningBagChecked ?? false,
          eveningCheckedItems: action.payload?.eveningCheckedItems ?? [],
        },
      };

    case GAME_ACTIONS.SAVE_ALARM_SETUP:
      return {
        ...state,
        studentChoices: {
          ...state.studentChoices,
          plannedWakeUpTime: action.payload?.plannedWakeUpTime ?? null,
          alarmChecked: action.payload?.alarmChecked ?? false,
          selectedAlarmTime:
            action.payload?.selectedAlarmTime ??
            state.studentChoices?.selectedAlarmTime ??
            null,
        },
      };

    case GAME_ACTIONS.SAVE_WAKE_UP_CHOICE:
      return {
        ...state,
        studentChoices: {
          ...state.studentChoices,
          selectedAlarmTime: action.payload?.selectedAlarmTime ?? null,
          wakeUpDelayMinutes: action.payload?.wakeUpDelayMinutes ?? 0,
          wakeUpChoice: action.payload?.wakeUpChoice ?? null,
        },
      };

    case GAME_ACTIONS.SAVE_MORNING_PREP:
      return {
        ...state,
        studentChoices: {
          ...state.studentChoices,
          completedMorningTasks: action.payload?.completedMorningTasks ?? [],
        },
      };

    case GAME_ACTIONS.SAVE_BAG_ITEMS:
      return {
        ...state,
        studentChoices: {
          ...state.studentChoices,
          selectedItems: action.payload?.selectedItems ?? [],
        },
      };

    case GAME_ACTIONS.SAVE_COMMUTE_START:
      return {
        ...state,
        studentChoices: {
          ...state.studentChoices,
          hasStartedCommute: action.payload?.hasStartedCommute ?? false,
        },
      };

    case GAME_ACTIONS.SAVE_BUS_SELECTION:
      return {
        ...state,
        studentChoices: {
          ...state.studentChoices,
          selectedBusNumber: action.payload?.selectedBusNumber ?? null,
        },
      };

    case GAME_ACTIONS.SAVE_BUS_RIDE:
      return {
        ...state,
        studentChoices: {
          ...state.studentChoices,
          hasCompletedBusRide: action.payload?.hasCompletedBusRide ?? false,
        },
      };

    case GAME_ACTIONS.SAVE_DESTINATION_ARRIVAL:
      return {
        ...state,
        studentChoices: {
          ...state.studentChoices,
          hasReachedDestinationArea:
            action.payload?.hasReachedDestinationArea ?? false,
        },
      };

    case GAME_ACTIONS.SAVE_RESULT_CUTSCENE:
      return {
        ...state,
        studentChoices: {
          ...state.studentChoices,
          hasSeenResultCutscene:
            action.payload?.hasSeenResultCutscene ?? false,
        },
      };

    case GAME_ACTIONS.SAVE_RESULT_SUMMARY:
      return {
        ...state,
        resultSummary: action.payload ?? null,
      };

    case GAME_ACTIONS.RESET_GAME_SESSION:
      return {
        ...state,
        currentScreen: SCREEN_IDS.studentSelect,
        targetArrivalTime: initialGameState.targetArrivalTime,
        weather: initialGameState.weather,
        aiPlanInput: initialGameState.aiPlanInput,
        aiPlanResult: initialGameState.aiPlanResult,
        studentChoices: initialGameState.studentChoices,
        resultSummary: initialGameState.resultSummary,
        reportData: initialGameState.reportData,
      };

    case GAME_ACTIONS.UPDATE_GAME_STATE:
      return {
        ...state,
        ...action.payload,
      };

    case GAME_ACTIONS.RESET_GAME:
      return initialGameState;

    default:
      return state;
  }
}
