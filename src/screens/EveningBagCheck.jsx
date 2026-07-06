import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

const itemEmoji = {
  교통카드: '🚌',
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
  const weatherText = aiPlanInput?.weather ?? '오늘';

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
        title="내일 가방 확인하기"
        description="내일 필요한 물건을 미리 확인해요."
        targetArrivalTime={aiPlanInput?.arrivalTime}
      />

      <InfoCard
        title="AI가 추천한 준비물"
        value={`${weatherText} 날씨에 맞춰 내일 챙길 물건을 확인해요.`}
        className="mb-6"
      />

      <div className="grid gap-5 lg:grid-cols-4">
        {requiredItems.map((item) => (
          <InfoCard key={item} className="text-center">
            <div
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-amber-50 text-6xl shadow-inner"
              aria-hidden="true"
            >
              {itemEmoji[item] ?? '•'}
            </div>
            <p className="mt-6 text-4xl font-bold text-slate-950">{item}</p>
          </InfoCard>
        ))}
      </div>

      <InfoCard className="mt-6">
        <p className="text-3xl font-bold text-slate-950">기억해요</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-sky-50 p-5 text-2xl font-bold leading-9 text-slate-800">
            내일 아침에 이 물건들을 다시 챙겨요.
          </div>
          <div className="rounded-2xl bg-sky-50 p-5 text-2xl font-bold leading-9 text-slate-800">
            가방에 넣을 물건을 미리 확인했어요.
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
          가방 확인했어요
        </PrimaryButton>
      </div>
    </section>
  );
}
