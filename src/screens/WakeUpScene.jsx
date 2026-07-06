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
            AI 출근 계획을 확인한 뒤 아침 준비를 시작할 수 있어요.
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
        description="일어나서 오늘 출근 준비를 시작해요."
      />

      <InfoCard className="mx-auto max-w-5xl bg-amber-50/70 text-center">
        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-white text-8xl shadow-inner">
          <span aria-hidden="true">☀️</span>
        </div>
        <p className="mt-8 text-5xl font-extrabold text-slate-950">
          좋은 아침이에요
        </p>
        <p className="mt-5 text-3xl font-bold leading-10 text-slate-700">
          이제 일어나서 준비할 시간이에요.
        </p>
        <div className="mx-auto mt-8 max-w-2xl rounded-[2rem] border-2 border-amber-100 bg-white px-8 py-7 shadow-inner">
          <p className="text-2xl font-extrabold text-slate-500">기상 시간</p>
          <p className="mt-3 text-7xl font-extrabold leading-none text-slate-950">
            {aiPlanResult.recommendedWakeUpTime}
          </p>
        </div>
      </InfoCard>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <InfoCard
          title="집에서 출발할 시간"
          value={aiPlanResult.recommendedLeaveHomeTime}
          description="아침 준비를 마치고 이 시간쯤 출발해요."
          highlight
        />
        <InfoCard
          title="도착 목표 시간"
          value={aiPlanInput.arrivalTime}
          description="오늘 이 시간까지 도착하는 것이 목표예요."
          highlight
        />
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.sleepScene)}
        >
          잠자기 화면으로 돌아가기
        </PrimaryButton>
        <PrimaryButton onClick={handleWakeUp}>
          일어나서 준비하기
        </PrimaryButton>
      </div>
    </section>
  );
}
