import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { SCREEN_IDS } from '../data/screenIds.js';

function hasWakeUpPlan(aiPlanInput, aiPlanResult) {
  return Boolean(
    aiPlanInput?.arrivalTime &&
      aiPlanResult?.recommendedWakeUpTime &&
      aiPlanResult?.recommendedLeaveHomeTime,
  );
}

export default function WakeUpScene() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const canShowWakeUpPlan = hasWakeUpPlan(aiPlanInput, aiPlanResult);

  const handleWakeUp = () => {
    dispatch({
      type: GAME_ACTIONS.SAVE_WAKE_UP_CHOICE,
      payload: {
        selectedAlarmTime: aiPlanResult.recommendedWakeUpTime,
      },
    });
    goToScreen(SCREEN_IDS.morningPrep);
  };

  if (!canShowWakeUpPlan) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="아침이 되었어요"
          description="먼저 AI 출근 계획을 확인해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            아침 준비 정보가 아직 없어요
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
        title="아침이 되었어요"
        description="일어나서 출근 준비를 시작해요."
      />

      <InfoCard className="mx-auto max-w-4xl text-center">
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-amber-50 text-7xl shadow-inner">
          <span aria-hidden="true">☀️</span>
        </div>
        <p className="mt-8 text-5xl font-bold text-slate-950">
          좋은 아침이에요
        </p>
        <p className="mt-5 text-2xl leading-9 text-slate-600">
          오늘도 출근 준비를 시작해 볼까요?
        </p>
      </InfoCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <InfoCard
          title="추천 기상 시간"
          value={aiPlanResult.recommendedWakeUpTime}
          description="아침 준비 시간을 생각해서 추천한 시간이에요."
          highlight
        />

        <InfoCard className="flex flex-col justify-center">
          <p className="text-3xl font-bold text-slate-950">
            오늘 출근 정보
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-amber-50 p-5">
              <p className="text-lg font-semibold text-slate-500">도착 시간</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                오늘 {aiPlanInput.arrivalTime}까지 도착해요.
              </p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-5">
              <p className="text-lg font-semibold text-slate-500">출발 시간</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {aiPlanResult.recommendedLeaveHomeTime}쯤 집에서 나가면 좋아요.
              </p>
            </div>
          </div>
        </InfoCard>
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.sleepScene)}
        >
          잠자기 화면으로 돌아가기
        </PrimaryButton>
        <PrimaryButton onClick={handleWakeUp}>바로 일어나기</PrimaryButton>
      </div>
    </section>
  );
}
