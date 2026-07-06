import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

const itemEmoji = {
  교통카드: '💳',
  스마트폰: '📱',
  물병: '💧',
  우산: '☂️',
  손선풍기: '🌀',
  겉옷: '🧥',
};

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
  const canShowItems = hasRequiredItems(aiPlanResult);
  const weatherText = aiPlanInput?.weather ?? '내일 날씨';

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

  if (!canShowItems) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="내일 가방 확인하기"
          description="먼저 AI 출근 계획을 확인해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            챙길 물건 정보가 아직 없어요
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            AI 출근 계획을 확인한 뒤 필요한 물건을 볼 수 있어요.
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
        title="내일 가방 확인하기"
        description="내일 필요한 물건을 미리 확인해요."
        targetArrivalTime={aiPlanInput?.arrivalTime}
      />

      <InfoCard className="mb-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-3xl font-extrabold text-slate-950 lg:text-4xl">
              AI가 알려준 준비물이에요
            </p>
            <p className="mt-3 text-2xl font-semibold leading-9 text-slate-600">
              {weatherText}에 맞춰 내일 필요한 물건을 미리 확인해요.
            </p>
          </div>
          <div className="rounded-[1.75rem] border-2 border-amber-100 bg-amber-50 px-6 py-4 text-2xl font-extrabold text-amber-800">
            오늘 밤 확인 · 내일 아침 챙기기
          </div>
        </div>
      </InfoCard>

      <InfoCard>
        <div className="flex flex-wrap gap-4">
          {requiredItems.map((item) => (
            <div
              key={item}
              className="flex min-w-56 flex-1 items-center gap-4 rounded-[1.75rem] border-2 border-sky-100 bg-sky-50/80 px-5 py-5 shadow-sm"
            >
              <span
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-inner"
                aria-hidden="true"
              >
                {itemEmoji[item] ?? '🎒'}
              </span>
              <span className="text-3xl font-extrabold text-slate-950">
                {item}
              </span>
            </div>
          ))}
        </div>
      </InfoCard>

      <InfoCard className="mt-6">
        <p className="text-3xl font-bold text-slate-950">기억해요</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-amber-50 p-5 text-2xl font-bold leading-9 text-slate-800">
            지금은 필요한 물건을 미리 확인하는 시간이에요.
          </div>
          <div className="rounded-2xl bg-sky-50 p-5 text-2xl font-bold leading-9 text-slate-800">
            아침에 가방에 넣을 물건을 기억해요.
          </div>
        </div>
      </InfoCard>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.eveningPreparation)}
        >
          전날 준비로 돌아가기
        </PrimaryButton>
        <PrimaryButton onClick={handleConfirmBag}>
          준비물 확인했어요
        </PrimaryButton>
      </div>
    </section>
  );
}
