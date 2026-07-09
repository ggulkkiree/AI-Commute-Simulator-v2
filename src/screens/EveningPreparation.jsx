import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

const mascotImage = '/images/mascot/ai_robot_guide.png';

const prepSteps = [
  {
    icon: '🎒',
    title: '가방 확인하기',
    description: '내일 필요한 물건을 미리 보고 기억해요.',
    tone: 'from-amber-100 to-orange-50 border-amber-200',
  },
  {
    icon: '⏰',
    title: '알람 확인하기',
    description: 'AI가 추천한 기상 시간에 알람을 켜요.',
    tone: 'from-sky-100 to-blue-50 border-sky-200',
  },
  {
    icon: '🌙',
    title: '잠자기',
    description: '준비를 마치고 편안하게 잠을 자요.',
    tone: 'from-indigo-100 to-violet-50 border-indigo-200',
  },
];

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

  if (!hasPlanResult(aiPlanResult)) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          eyebrow="전날 준비"
          title="전날 준비를 시작해요"
          description="먼저 AI 추천 계획을 확인해 주세요."
        />

        <div className="mx-auto max-w-3xl rounded-[2rem] border-4 border-amber-200 bg-white/95 p-8 text-center shadow-xl">
          <p className="text-3xl font-extrabold text-slate-950">
            아직 확인할 계획이 없어요
          </p>
          <p className="mt-4 text-2xl font-bold leading-9 text-slate-600">
            AI 추천 계획을 본 뒤 전날 준비를 시작할 수 있어요.
          </p>
          <PrimaryButton
            variant="secondary"
            className="mt-8"
            onClick={() => goToScreen(SCREEN_IDS.aiPlanResult)}
          >
            AI 계획 다시 보기
          </PrimaryButton>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        eyebrow="전날 준비"
        title="내일 출근 준비를 차근차근 해요"
        description="가방을 확인하고, 알람을 켠 뒤 잠을 자는 흐름으로 이어져요."
      />

      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-amber-200 bg-gradient-to-br from-orange-100 via-amber-50 to-indigo-100 p-5 shadow-2xl lg:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.9),transparent_18%),radial-gradient(circle_at_18%_92%,rgba(251,191,36,0.28),transparent_28%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
          <aside className="flex flex-col justify-between rounded-[2rem] border-4 border-sky-300 bg-gradient-to-b from-sky-100 to-blue-200 p-5 shadow-xl">
            <div className="rounded-[1.7rem] bg-white/95 p-5 shadow-inner">
              <p className="text-2xl font-extrabold text-sky-800">
                오늘 출근 연습을 내일처럼 준비해요.
              </p>
              <p className="mt-3 text-xl font-bold leading-8 text-slate-700">
                AI가 옆에서 순서를 알려 줄게요.
              </p>
            </div>
            <div className="mt-6 flex h-56 items-end justify-center">
              <img
                src={mascotImage}
                alt="AI 안내 로봇"
                className="h-full w-full object-contain"
              />
            </div>
          </aside>

          <div className="rounded-[2rem] border-4 border-amber-200 bg-white/90 p-5 shadow-xl lg:p-7">
            <div className="rounded-[2rem] border-4 border-amber-200 bg-gradient-to-r from-amber-100 to-orange-50 px-7 py-6 text-center shadow-inner">
              <p className="text-4xl font-extrabold leading-tight text-slate-950 lg:text-5xl">
                내일 출근을 위해 전날 준비를 해요.
              </p>
            </div>

            <div className="mt-6 grid gap-5 xl:grid-cols-3">
              {prepSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`relative min-h-72 rounded-[2rem] border-4 bg-gradient-to-br ${step.tone} p-6 shadow-lg`}
                >
                  <span className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 text-lg font-extrabold text-slate-500">
                    {index + 1}단계
                  </span>
                  <div className="flex h-24 w-24 items-center justify-center rounded-[1.7rem] bg-white text-6xl shadow-inner">
                    {step.icon}
                  </div>
                  <p className="mt-6 text-3xl font-extrabold text-slate-950">
                    {step.title}
                  </p>
                  <p className="mt-4 text-xl font-bold leading-8 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[2rem] border-4 border-blue-100 bg-blue-50/80 p-5 text-center shadow-inner">
              <p className="text-2xl font-extrabold text-slate-800 lg:text-3xl">
                🎒 가방 확인 → ⏰ 알람 확인 → 🌙 잠자기
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-7 flex flex-col justify-center gap-4 sm:flex-row">
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
      </div>
    </section>
  );
}
