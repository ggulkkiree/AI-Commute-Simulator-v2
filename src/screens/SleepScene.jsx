import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

function hasSleepPlan(aiPlanInput, aiPlanResult) {
  return Boolean(
    aiPlanInput?.arrivalTime &&
      aiPlanResult?.recommendedWakeUpTime &&
      aiPlanResult?.recommendedLeaveHomeTime,
  );
}

export default function SleepScene() {
  const { state, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const canShowSleepPlan = hasSleepPlan(aiPlanInput, aiPlanResult);

  if (!canShowSleepPlan) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="잠자기"
          description="먼저 전날 준비를 확인해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            잠자기 전에 준비를 확인해요
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            가방과 알람을 확인한 뒤 잠자기 화면으로 올 수 있어요.
          </p>
          <PrimaryButton
            variant="secondary"
            className="mt-8"
            onClick={() => goToScreen(SCREEN_IDS.eveningPreparation)}
          >
            전날 준비로 돌아가기
          </PrimaryButton>
        </InfoCard>
      </section>
    );
  }

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        title="잠자기"
        description="전날 준비를 마쳤어요. 이제 내일을 위해 쉬어요."
      />

      <InfoCard className="mx-auto max-w-5xl bg-indigo-50/60 text-center">
        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-white text-8xl shadow-inner">
          <span aria-hidden="true">🌙</span>
        </div>
        <p className="mt-8 text-5xl font-extrabold text-slate-950">
          전날 준비를 마쳤어요
        </p>
        <p className="mt-5 text-3xl font-bold leading-10 text-slate-700">
          잘 준비했어요. 이제 잠을 자요.
        </p>
      </InfoCard>

      <InfoCard className="mt-6">
        <p className="text-3xl font-extrabold text-slate-950">내일 요약</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[1.75rem] bg-amber-50 p-5">
            <p className="text-xl font-bold text-slate-500">일어날 시간</p>
            <p className="mt-2 text-4xl font-extrabold text-slate-950">
              {aiPlanResult.recommendedWakeUpTime}
            </p>
          </div>
          <div className="rounded-[1.75rem] bg-sky-50 p-5">
            <p className="text-xl font-bold text-slate-500">출발 시간</p>
            <p className="mt-2 text-4xl font-extrabold text-slate-950">
              {aiPlanResult.recommendedLeaveHomeTime}
            </p>
          </div>
          <div className="rounded-[1.75rem] bg-emerald-50 p-5">
            <p className="text-xl font-bold text-slate-500">도착 목표</p>
            <p className="mt-2 text-4xl font-extrabold text-slate-950">
              {aiPlanInput.arrivalTime}
            </p>
          </div>
        </div>
      </InfoCard>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.eveningPreparation)}
        >
          전날 준비 다시 보기
        </PrimaryButton>
        <PrimaryButton onClick={() => goToScreen(SCREEN_IDS.wakeUpScene)}>
          아침이 되었어요
        </PrimaryButton>
      </div>
    </section>
  );
}
