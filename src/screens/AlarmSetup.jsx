import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

function hasAlarmPlan(aiPlanInput, aiPlanResult) {
  return Boolean(
    aiPlanInput?.arrivalTime &&
      aiPlanResult?.recommendedWakeUpTime &&
      aiPlanResult?.recommendedLeaveHomeTime,
  );
}

export default function AlarmSetup() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const canShowAlarmPlan = hasAlarmPlan(aiPlanInput, aiPlanResult);

  const handleConfirmAlarm = () => {
    dispatch({
      type: GAME_ACTIONS.SAVE_ALARM_SETUP,
      payload: {
        plannedWakeUpTime: aiPlanResult.recommendedWakeUpTime,
        alarmChecked: true,
        selectedAlarmTime: aiPlanResult.recommendedWakeUpTime,
      },
    });
    goToScreen(SCREEN_IDS.sleepScene);
  };

  if (!canShowAlarmPlan) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="알람을 맞춰요"
          description="먼저 AI 출근 계획을 확인해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            알람으로 확인할 시간이 아직 없어요
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            먼저 AI 출근 계획을 확인해 주세요.
          </p>
          <PrimaryButton
            variant="secondary"
            className="mt-8"
            onClick={() => goToScreen(SCREEN_IDS.aiPlanResult)}
          >
            AI 계획 화면으로 돌아가기
          </PrimaryButton>
        </InfoCard>
      </section>
    );
  }

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        title="알람을 맞춰요"
        description="내일 일어날 시간을 확인해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard
        title="AI 추천 기상 시간"
        value="아침 준비 시간을 생각해서 추천한 시간이에요."
        className="mb-6"
      />

      <InfoCard className="mx-auto max-w-4xl text-center">
        <div
          className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-sky-50 text-6xl shadow-inner"
          aria-hidden="true"
        >
          ⏰
        </div>
        <p className="mt-8 text-7xl font-bold text-slate-950">
          {aiPlanResult.recommendedWakeUpTime}
        </p>
        <p className="mt-5 text-2xl leading-9 text-slate-600">
          이 시간에 일어나면 아침 준비를 할 수 있어요.
        </p>
      </InfoCard>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <InfoCard
          title="목표 도착 시간"
          value={aiPlanInput.arrivalTime}
          highlight
        />
        <InfoCard
          title="추천 출발 시간"
          value={aiPlanResult.recommendedLeaveHomeTime}
          highlight
        />
      </div>

      <InfoCard className="mt-6">
        <p className="text-3xl font-bold text-slate-950">기억해요</p>
        <p className="mt-4 rounded-2xl bg-sky-50 p-5 text-2xl font-bold leading-9 text-slate-800">
          내일 아침에 알람을 확인해요.
        </p>
      </InfoCard>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.eveningBagCheck)}
        >
          가방 확인으로 돌아가기
        </PrimaryButton>
        <PrimaryButton onClick={handleConfirmAlarm}>
          알람 맞췄어요
        </PrimaryButton>
      </div>
    </section>
  );
}
