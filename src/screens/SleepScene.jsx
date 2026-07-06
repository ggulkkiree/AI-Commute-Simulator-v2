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
            먼저 전날 준비를 확인해 주세요.
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
        description="내일 출근을 위해 푹 쉬어요."
      />

      <InfoCard className="mx-auto max-w-4xl text-center">
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-indigo-50 text-7xl shadow-inner">
          <span aria-hidden="true">🌙</span>
        </div>
        <p className="mt-8 text-5xl font-bold text-slate-950">
          이제 잠을 잘 시간이에요
        </p>
        <p className="mt-5 text-2xl leading-9 text-slate-600">
          내일 출근을 위해 푹 쉬어요.
        </p>
      </InfoCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <InfoCard
          title="내일 추천 기상 시간"
          value={aiPlanResult.recommendedWakeUpTime}
          description="아침에 준비할 시간을 생각해서 추천한 시간이에요."
          highlight
        />

        <InfoCard className="flex flex-col justify-center">
          <p className="text-3xl font-bold text-slate-950">
            내일 출근 정보
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-sky-50 p-5">
              <p className="text-lg font-semibold text-slate-500">도착 시간</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                내일 {aiPlanInput.arrivalTime}까지 도착해요.
              </p>
            </div>
            <div className="rounded-2xl bg-sky-50 p-5">
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
