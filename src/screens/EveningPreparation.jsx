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

const preparationCards = [
  {
    icon: '🎒',
    title: '가방 확인하기',
    description: '내일 필요한 물건을 미리 살펴봐요.',
    accent: 'bg-amber-50',
  },
  {
    icon: '⏰',
    title: '알람 확인하기',
    description: 'AI가 추천한 기상 시간을 확인해요.',
    accent: 'bg-sky-50',
  },
];

const flowSteps = ['🎒 가방 확인', '⏰ 알람 확인', '🌙 잠자기'];

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
            AI 출근 계획을 확인한 뒤 전날 준비를 시작할 수 있어요.
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
        description="내일 출근을 위해 가방과 알람을 차근차근 확인해요."
      />

      <InfoCard className="mb-6 text-center">
        <p className="text-3xl font-extrabold text-slate-950 lg:text-4xl">
          내일 출근을 위해 전날 준비를 해요.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {flowSteps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <span className="rounded-full border-2 border-amber-100 bg-amber-50 px-5 py-3 text-xl font-extrabold text-slate-800 lg:text-2xl">
                {step}
              </span>
              {index < flowSteps.length - 1 ? (
                <span className="text-3xl font-extrabold text-amber-300">
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </InfoCard>

      <div className="grid gap-6 lg:grid-cols-2">
        {preparationCards.map((card) => (
          <InfoCard key={card.title} className="min-h-64">
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-[1.75rem] ${card.accent} text-6xl shadow-inner`}
                  aria-hidden="true"
                >
                  {card.icon}
                </div>
                <p className="mt-6 text-4xl font-extrabold text-slate-950">
                  {card.title}
                </p>
                <p className="mt-4 text-2xl font-semibold leading-9 text-slate-600">
                  {card.description}
                </p>
              </div>
            </div>
          </InfoCard>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.aiPlanResult)}
        >
          AI 계획 다시 보기
        </PrimaryButton>
        <PrimaryButton onClick={() => goToScreen(SCREEN_IDS.eveningBagCheck)}>
          가방 확인하러 가기
        </PrimaryButton>
      </div>
    </section>
  );
}
