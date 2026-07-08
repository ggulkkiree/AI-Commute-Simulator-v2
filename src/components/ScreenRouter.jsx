import { SCREEN_IDS } from '../data/screenIds.js';
import { useGame } from '../context/GameContext.jsx';
import StartScreen from '../screens/StartScreen.jsx';
import StudentSelect from '../screens/StudentSelect.jsx';
import CommuteInfo from '../screens/CommuteInfo.jsx';
import AIPlanInput from '../screens/AIPlanInput.jsx';
import AIPlanResult from '../screens/AIPlanResult.jsx';
import EveningPreparation from '../screens/EveningPreparation.jsx';
import EveningBagCheck from '../screens/EveningBagCheck.jsx';
import AlarmSetup from '../screens/AlarmSetup.jsx';
import SleepScene from '../screens/SleepScene.jsx';
import WakeUpScene from '../screens/WakeUpScene.jsx';
import MorningPrep from '../screens/MorningPrep.jsx';
import BagPacking from '../screens/BagPacking.jsx';
import CommuteScreen from '../screens/CommuteScreen.jsx';
import BusStop from '../screens/BusStop.jsx';
import BusRide from '../screens/BusRide.jsx';
import DestinationMap from '../screens/DestinationMap.jsx';
import ResultCutscene from '../screens/ResultCutscene.jsx';
import ResultScreen from '../screens/ResultScreen.jsx';
import TeacherReport from '../screens/TeacherReport.jsx';
import TeacherSettings from '../screens/TeacherSettings.jsx';

const screenMap = {
  [SCREEN_IDS.startScreen]: StartScreen,
  [SCREEN_IDS.studentSelect]: StudentSelect,
  [SCREEN_IDS.commuteInfo]: CommuteInfo,
  [SCREEN_IDS.aiPlanInput]: AIPlanInput,
  [SCREEN_IDS.aiPlanResult]: AIPlanResult,
  [SCREEN_IDS.eveningPreparation]: EveningPreparation,
  [SCREEN_IDS.eveningBagCheck]: EveningBagCheck,
  [SCREEN_IDS.alarmSetup]: AlarmSetup,
  [SCREEN_IDS.sleepScene]: SleepScene,
  [SCREEN_IDS.wakeUpScene]: WakeUpScene,
  [SCREEN_IDS.morningPrep]: MorningPrep,
  [SCREEN_IDS.bagPacking]: BagPacking,
  [SCREEN_IDS.commuteScreen]: CommuteScreen,
  [SCREEN_IDS.busStop]: BusStop,
  [SCREEN_IDS.busRide]: BusRide,
  [SCREEN_IDS.destinationMap]: DestinationMap,
  [SCREEN_IDS.resultCutscene]: ResultCutscene,
  [SCREEN_IDS.resultScreen]: ResultScreen,
  [SCREEN_IDS.teacherReport]: TeacherReport,
  [SCREEN_IDS.teacherSettings]: TeacherSettings,
};

export default function ScreenRouter() {
  const { state } = useGame();
  const CurrentScreen = screenMap[state.currentScreen] ?? StartScreen;

  return <CurrentScreen />;
}
