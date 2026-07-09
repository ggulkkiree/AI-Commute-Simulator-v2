import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { bagItemEmoji } from '../data/bagItems.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const mascotImage = '/images/mascot/ai_robot_guide.png';

function hasRequiredItems(aiPlanResult) {
  return (
    Array.isArray(aiPlanResult?.requiredItems) &&
    aiPlanResult.requiredItems.length > 0
  );
}

export default function EveningBagCheck() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const requiredItems = aiPlanResult.requiredItems ?? [];
  const weatherText = aiPlanInput?.weather ?? state.weather ?? '오늘 날씨';

  const handleConfirmBag = () => {
    dispatch({
      type: GAME_ACTIONS.SAVE_EVENING_BAG_CHECK,
      payload: {
        eveningBagChecked: true,
        eveningCheckedItems: requiredItems,
      },
    });
    goToScreen(SCREEN_IDS.alarmSetup);
  };

  if (!hasRequiredItems(aiPlanResult)) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          eyebrow="전날 준비"
          title="내일 가방을 확인해요"
          description="먼저 AI 추천 계획을 확인해 주세요."
        />

        <div className="mx-auto max-w-3xl rounded-[2rem] border-4 border-amber-200 bg-white/95 p-8 text-center shadow-xl">
          <p className="text-3xl font-extrabold text-slate-950">
            확인할 준비물이 아직 없어요
          </p>
          <p className="mt-4 text-2xl font-bold leading-9 text-slate-600">
            AI 추천 계획을 본 뒤 내일 필요한 물건을 확인할 수 있어요.
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
        title="내일 필요한 물건을 미리 확인해요"
        description="지금은 기억하는 시간이고, 아침에는 실제로 가방에 넣어요."
        targetArrivalTime={aiPlanInput?.arrivalTime}
      />

      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-amber-200 bg-gradient-to-br from-amber-100 via-orange-50 to-sky-100 p-5 shadow-2xl lg:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_12%,rgba(255,255,255,0.8),transparent_18%),radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.18),transparent_30%)]" />

        <div className="relative grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
          <aside className="flex flex-col justify-between rounded-[2rem] border-4 border-sky-300 bg-gradient-to-b from-sky-100 to-cyan-200 p-5 shadow-xl">
            <div className="rounded-[1.7rem] bg-white/95 p-5 shadow-inner">
              <p className="text-2xl font-extrabold text-sky-800">
                아침에 넣을 물건을 오늘 미리 기억해요.
              </p>
              <p className="mt-3 text-xl font-bold leading-8 text-slate-700">
                필요한 물건만 차분히 확인하면 돼요.
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
            <div className="grid gap-5 xl:grid-cols-[0.42fr_0.58fr]">
              <div className="relative min-h-96 overflow-hidden rounded-[2rem] border-4 border-blue-300 bg-gradient-to-b from-blue-100 to-blue-300 p-6 shadow-inner">
                <div className="absolute bottom-8 left-1/2 h-64 w-72 -translate-x-1/2 rounded-[2rem] bg-blue-700 shadow-2xl">
                  <div className="absolute -top-10 left-1/2 h-16 w-28 -translate-x-1/2 rounded-t-full border-8 border-blue-800" />
                  <div className="absolute left-8 top-10 right-8 h-16 rounded-[1.2rem] bg-blue-500" />
                  <div className="absolute bottom-10 left-8 right-8 grid grid-cols-3 gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <span
                        key={index}
                        className="h-12 rounded-2xl border-2 border-blue-300/80"
                      />
                    ))}
                  </div>
                  <div className="absolute right-5 bottom-5 h-8 w-8 rounded-full bg-amber-300" />
                </div>
                <div className="absolute left-6 top-6 rounded-[1.5rem] bg-white/90 px-5 py-4 shadow-lg">
                  <p className="text-xl font-extrabold text-slate-500">
                    오늘 날씨
                  </p>
                  <p className="mt-1 text-4xl font-extrabold text-slate-950">
                    {weatherText}
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border-4 border-lime-200 bg-lime-50/90 p-5 shadow-inner">
                <p className="text-3xl font-extrabold text-slate-950 lg:text-4xl">
                  AI가 알려준 준비물
                </p>
                <p className="mt-3 text-xl font-bold leading-8 text-slate-600">
                  아침에 가방에 넣을 물건을 기억해요.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {requiredItems.map((item) => (
                    <div
                      key={item}
                      className="flex min-h-36 flex-col items-center justify-center rounded-[1.7rem] border-4 border-lime-200 bg-white px-4 py-5 text-center shadow-lg"
                    >
                      <span className="text-6xl" aria-hidden="true">
                        {bagItemEmoji[item] ?? '🎒'}
                      </span>
                      <span className="mt-3 text-2xl font-extrabold text-slate-950">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border-4 border-amber-200 bg-amber-50 p-5 text-center shadow-inner">
              <p className="text-2xl font-extrabold text-slate-800 lg:text-3xl">
                전날: 확인하고 기억하기 · 아침: 실제로 가방에 넣기
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-7 flex flex-col justify-center gap-4 sm:flex-row">
          <PrimaryButton
            variant="secondary"
            onClick={() => goToScreen(SCREEN_IDS.eveningPreparation)}
          >
            전날 준비 다시 보기
          </PrimaryButton>
          <PrimaryButton onClick={handleConfirmBag}>
            준비물 확인했어요
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
