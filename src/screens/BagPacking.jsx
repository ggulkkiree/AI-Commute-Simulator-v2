import { useMemo, useState } from 'react';
import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import {
  bagItemEmoji,
  createBagItemOptions,
} from '../data/bagItems.js';
import { SCREEN_IDS } from '../data/screenIds.js';

function hasBagPlan(aiPlanResult) {
  return (
    Array.isArray(aiPlanResult?.requiredItems) &&
    aiPlanResult.requiredItems.length > 0
  );
}

export default function BagPacking() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const requiredItems = aiPlanResult.requiredItems ?? [];
  const savedItems = state.studentChoices?.selectedItems ?? [];
  const [selectedItems, setSelectedItems] = useState(savedItems);
  const canShowBagPlan = hasBagPlan(aiPlanResult);

  const selectedItemSet = useMemo(
    () => new Set(selectedItems),
    [selectedItems],
  );
  const bagItemOptions = useMemo(
    () => createBagItemOptions(requiredItems),
    [requiredItems],
  );
  const hasAllRequiredItems = requiredItems.every((item) =>
    selectedItemSet.has(item),
  );

  const saveSelectedItems = (nextItems) => {
    dispatch({
      type: GAME_ACTIONS.SAVE_BAG_ITEMS,
      payload: {
        selectedItems: nextItems,
      },
    });
  };

  const handleItemClick = (item) => {
    const nextItems = selectedItemSet.has(item)
      ? selectedItems.filter((selectedItem) => selectedItem !== item)
      : [...selectedItems, item];

    setSelectedItems(nextItems);
    saveSelectedItems(nextItems);
  };

  const handleGoToCommute = () => {
    if (!hasAllRequiredItems) {
      return;
    }

    saveSelectedItems(selectedItems);
    goToScreen(SCREEN_IDS.commuteScreen);
  };

  if (!canShowBagPlan) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="가방 챙기기"
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
        title="가방 챙기기"
        description="출근할 때 필요한 물건을 가방에 넣어요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard
        title="오늘 챙기면 좋은 물건"
        value={`${aiPlanInput.weather} 날씨에 맞춰 필요한 물건을 확인해요.`}
        description="물건 카드를 눌러 내 가방에 넣어요."
        className="mb-6"
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <InfoCard>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-950">
                  AI가 추천한 준비물
                </p>
                <p className="mt-3 text-xl leading-8 text-slate-600">
                  오늘 출근에 도움이 되는 기준 정보예요.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {requiredItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-2xl border border-sky-100 bg-sky-50 px-5 py-3 text-2xl font-bold text-slate-900"
                  >
                    <span aria-hidden="true">
                      {bagItemEmoji[item] ?? '•'}
                    </span>{' '}
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </InfoCard>

          <div className="grid gap-5 xl:grid-cols-3">
            {bagItemOptions.map((item) => {
              const isSelected = selectedItemSet.has(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className={`rounded-2xl border p-7 text-left shadow-sm transition focus:outline-none focus:ring-4 ${
                    isSelected
                      ? 'border-emerald-200 bg-emerald-50 focus:ring-emerald-100'
                      : 'border-slate-200 bg-white hover:bg-sky-50 focus:ring-sky-100'
                  }`}
                >
                  <div className="flex flex-col gap-5">
                    <span
                      className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-5xl shadow-inner"
                      aria-hidden="true"
                    >
                      {bagItemEmoji[item] ?? '•'}
                    </span>
                    <div>
                      <p className="text-4xl font-bold text-slate-950">
                        {item}
                      </p>
                      <p
                        className={`mt-4 inline-flex rounded-full px-5 py-2 text-xl font-bold ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {isSelected ? '가방에 넣었어요' : '넣어 보기'}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <InfoCard className="flex flex-col">
          <p className="text-3xl font-bold text-slate-950">내 가방</p>
          <p className="mt-3 text-xl leading-8 text-slate-600">
            내가 고른 물건을 확인해요.
          </p>

          <div className="mt-6 flex min-h-56 flex-1 flex-wrap content-start gap-3 rounded-2xl bg-slate-50 p-5">
            {selectedItems.length === 0 ? (
              <p className="text-2xl font-bold text-slate-500">
                아직 가방이 비어 있어요.
              </p>
            ) : (
              selectedItems.map((item) => (
                <span
                  key={item}
                  className="rounded-2xl border border-emerald-100 bg-white px-5 py-3 text-2xl font-bold text-slate-900 shadow-sm"
                >
                  <span aria-hidden="true">{bagItemEmoji[item] ?? '•'}</span>{' '}
                  {item}
                </span>
              ))
            )}
          </div>
        </InfoCard>
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.morningPrep)}
        >
          아침 준비로 돌아가기
        </PrimaryButton>
        <PrimaryButton
          disabled={!hasAllRequiredItems}
          onClick={handleGoToCommute}
        >
          출근하러 가기
        </PrimaryButton>
      </div>
    </section>
  );
}
