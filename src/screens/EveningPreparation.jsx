import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

function hasPlanResult(aiPlanResult) {
  return Boolean(
    aiPlanResult?.recommendedWakeUpTime &&
      aiPlanResult?.requiredItems?.length,
  );
}

export default function EveningPreparation() {
  const { state, goToScreen } = useGame();
  const { aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const hasRecommendedPlan = hasPlanResult(aiPlanResult);

  if (!hasRecommendedPlan) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="전날 준비를 시작해요"
          description="먼저 AI 출근 계획을 확인해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            준비할 계획이 아직 없어요
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
        title="전날 준비를 시작해요"
        description="내일 출근을 위해 미리 확인해요."
      />

      <InfoCard
        title="내일을 위한 준비"
        value="가방과 알람을 미리 확인해요."
        className="mb-6"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard className="min-h-64">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50 text-5xl shadow-inner"
                aria-hidden="true"
              >
                🎒
              </div>
              <p className="mt-6 text-4xl font-bold text-slate-950">
                가방 확인하기
              </p>
              <p className="mt-4 text-2xl leading-9 text-slate-600">
                내일 필요한 물건을 확인해요.
              </p>
            </div>
          </div>
        </InfoCard>

        <InfoCard className="min-h-64">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl bg-sky-50 text-5xl shadow-inner"
                aria-hidden="true"
              >
                ⏰
              </div>
              <p className="mt-6 text-4xl font-bold text-slate-950">
                알람 확인하기
              </p>
              <p className="mt-4 text-2xl leading-9 text-slate-600">
                AI가 추천한 기상 시간을 확인해요.
              </p>
            </div>
          </div>
        </InfoCard>
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.aiPlanResult)}
        >
          AI 계획 다시 보기
        </PrimaryButton>
        <PrimaryButton onClick={() => goToScreen(SCREEN_IDS.eveningBagCheck)}>
          가방부터 확인하기
        </PrimaryButton>
      </div>
    </section>
  );
}
