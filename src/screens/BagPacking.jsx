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

const fallbackItemEmoji = {
  교통카드: '💳',
  스마트폰: '📱',
  물병: '💧',
  우산: '☂️',
  손선풍기: '🌀',
  겉옷: '🧥',
  게임기: '🎮',
  과자: '🍪',
  장난감: '🧸',
};

function getItemEmoji(item) {
  return bagItemEmoji[item] ?? fallbackItemEmoji[item] ?? '🎒';
}

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
            AI 출근 계획을 확인한 뒤 가방을 챙길 수 있어요.
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
        description="아침에 필요한 물건을 골라 가방에 넣어요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard className="mb-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-3xl font-extrabold text-slate-950 lg:text-4xl">
              아침에 가방을 챙겨요.
            </p>
            <p className="mt-3 text-2xl font-semibold leading-9 text-slate-600">
              필요한 물건을 골라 내 가방에 넣어요.
            </p>
          </div>
          <div className="rounded-[1.75rem] border-2 border-amber-100 bg-amber-50 px-6 py-4 text-2xl font-extrabold text-amber-800">
            필수 물건 {requiredItems.filter((item) => selectedItemSet.has(item)).length} / {requiredItems.length}
          </div>
        </div>
      </InfoCard>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <InfoCard>
            <p className="text-3xl font-extrabold text-slate-950">
              전날 확인한 준비물
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {requiredItems.map((item) => (
                <span
                  key={item}
                  className="rounded-2xl border-2 border-sky-100 bg-sky-50 px-5 py-3 text-2xl font-extrabold text-slate-900"
                >
                  <span aria-hidden="true">{getItemEmoji(item)}</span>{' '}
                  {item}
                </span>
              ))}
            </div>
          </InfoCard>

          <div className="grid gap-5 xl:grid-cols-3">
            {bagItemOptions.map((item) => {
              const isSelected = selectedItemSet.has(item);
              const isRequired = requiredItems.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className={`rounded-[2rem] border-2 p-6 text-left shadow-lg transition focus:outline-none focus:ring-4 ${
                    isSelected
                      ? 'border-blue-400 bg-sky-50 ring-4 ring-blue-100 focus:ring-blue-100'
                      : 'border-amber-100 bg-white/90 shadow-amber-100/60 hover:-translate-y-0.5 hover:bg-amber-50 focus:ring-amber-100'
                  }`}
                >
                  <div className="flex min-h-56 flex-col justify-between gap-5">
                    <div>
                      <span
                        className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-white text-6xl shadow-inner"
                        aria-hidden="true"
                      >
                        {getItemEmoji(item)}
                      </span>
                      <p className="mt-5 text-4xl font-extrabold text-slate-950">
                        {item}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-4 py-2 text-lg font-extrabold ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {isSelected ? '✓ 가방에 넣었어요' : '넣어 보기'}
                      </span>
                      {isRequired ? (
                        <span className="rounded-full bg-amber-100 px-4 py-2 text-lg font-extrabold text-amber-800">
                          필수
                        </span>
                      ) : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <InfoCard className="flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-4xl font-extrabold text-slate-950">
                내 가방
              </p>
              <p className="mt-3 text-xl font-semibold leading-8 text-slate-600">
                선택한 물건이 여기에 모여요.
              </p>
            </div>
            <div
              className="text-7xl"
              aria-hidden="true"
            >
              🎒
            </div>
          </div>

          <div className="mt-6 flex min-h-80 flex-1 flex-wrap content-start gap-3 rounded-[2rem] border-2 border-dashed border-sky-200 bg-sky-50/70 p-5">
            {selectedItems.length === 0 ? (
              <div className="flex min-h-44 w-full items-center justify-center text-center">
                <p className="text-2xl font-extrabold leading-9 text-slate-500">
                  아직 아무것도 넣지 않았어요.
                  <br />
                  물건 카드를 눌러 가방에 넣어요.
                </p>
              </div>
            ) : (
              selectedItems.map((item) => (
                <span
                  key={item}
                  className="rounded-2xl border-2 border-blue-100 bg-white px-5 py-3 text-2xl font-extrabold text-slate-900 shadow-sm"
                >
                  <span aria-hidden="true">{getItemEmoji(item)}</span>{' '}
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
