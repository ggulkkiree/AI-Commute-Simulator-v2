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
          title="알람을 확인해요"
          description="먼저 AI 출근 계획을 확인해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            알람으로 확인할 시간이 아직 없어요
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            AI 출근 계획을 확인한 뒤 추천 기상 시간을 볼 수 있어요.
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
        title="알람을 확인해요"
        description="AI가 추천한 기상 시간을 보고 알람을 확인해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard className="mb-6 text-center">
        <p className="text-3xl font-extrabold text-slate-950 lg:text-4xl">
          이 시간에 일어나기로 해요
        </p>
        <p className="mt-3 text-2xl font-semibold leading-9 text-slate-600">
          아침 준비 시간을 생각해서 AI가 추천한 시간이에요.
        </p>
      </InfoCard>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <InfoCard className="flex min-h-96 flex-col items-center justify-center text-center">
          <div
            className="flex h-36 w-36 items-center justify-center rounded-full bg-sky-50 text-8xl shadow-inner"
            aria-hidden="true"
          >
            ⏰
          </div>
          <p className="mt-8 text-8xl font-extrabold leading-none text-slate-950">
            {aiPlanResult.recommendedWakeUpTime}
          </p>
          <p className="mt-5 text-3xl font-extrabold text-slate-700">
            일어날 시간
          </p>
        </InfoCard>

        <div className="grid gap-6">
          <InfoCard
            title="집에서 출발할 시간"
            value={aiPlanResult.recommendedLeaveHomeTime}
            description="이 시간쯤 집에서 나가면 좋아요."
            highlight
          />
          <InfoCard
            title="도착 목표 시간"
            value={aiPlanInput.arrivalTime}
            description="내일 이 시간까지 도착해요."
            highlight
          />
        </div>
      </div>

      <InfoCard className="mt-6">
        <p className="text-3xl font-bold text-slate-950">기억해요</p>
        <p className="mt-4 rounded-2xl bg-amber-50 p-5 text-2xl font-bold leading-9 text-slate-800">
          알람을 확인했으면 이제 편하게 잘 준비를 해요.
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
          알람 확인했어요
        </PrimaryButton>
      </div>
    </section>
  );
}
