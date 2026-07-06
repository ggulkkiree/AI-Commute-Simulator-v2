import { useState } from 'react';
import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { busOptions } from '../data/busOptions.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const busDescriptions = {
  200: '회사 방향 버스',
  999: '다른 방향 버스',
  119: '다른 번호 버스',
};

function hasBusPlan(aiPlanInput, aiPlanResult) {
  return Boolean(aiPlanInput?.arrivalTime && aiPlanResult?.busNumber);
}

export default function BusStop() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const savedBusNumber = state.studentChoices?.selectedBusNumber ?? null;
  const hasStartedCommute = Boolean(state.studentChoices?.hasStartedCommute);
  const [selectedBusNumber, setSelectedBusNumber] = useState(savedBusNumber);
  const canShowBusPlan = hasBusPlan(aiPlanInput, aiPlanResult);

  const handleRideBus = () => {
    if (!selectedBusNumber) {
      return;
    }

    dispatch({
      type: GAME_ACTIONS.SAVE_BUS_SELECTION,
      payload: {
        selectedBusNumber,
      },
    });
    goToScreen(SCREEN_IDS.busRide);
  };

  if (!canShowBusPlan) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="버스 정류장"
          description="먼저 AI 출근 계획을 확인해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            버스 정보가 아직 없어요
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            AI 출근 계획을 확인한 뒤 버스를 선택할 수 있어요.
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
        title="버스 정류장"
        description="버스 번호를 보고 탈 버스를 선택해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard className="mb-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-3xl font-extrabold text-slate-950 lg:text-4xl">
              정류장에서 버스 번호를 확인해요.
            </p>
            <p className="mt-3 text-2xl font-semibold leading-9 text-slate-600">
              AI 추천 버스는 {aiPlanResult.busNumber}번이에요.
            </p>
          </div>
          <div className="rounded-[1.75rem] border-2 border-sky-100 bg-sky-50 px-6 py-4 text-2xl font-extrabold text-sky-800">
            현재 위치: 버스 정류장
          </div>
        </div>
      </InfoCard>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <InfoCard
            title="AI 추천 버스"
            value={`${aiPlanResult.busNumber}번 버스`}
            description="출근 계획에서 확인한 버스예요."
            highlight
          />

          <InfoCard>
            <p className="text-3xl font-extrabold text-slate-950">
              선택한 버스
            </p>
            <p className="mt-4 rounded-[1.75rem] bg-amber-50 p-5 text-3xl font-extrabold text-slate-900">
              {selectedBusNumber
                ? `${selectedBusNumber}번 버스`
                : '아직 선택하지 않았어요'}
            </p>
            <p className="mt-4 text-xl font-semibold leading-8 text-slate-600">
              {hasStartedCommute
                ? '번호를 확인하고 버스 카드를 눌러요.'
                : '출발 기록이 없어도 버스 선택 연습은 계속할 수 있어요.'}
            </p>
          </InfoCard>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          {busOptions.map((option) => {
            const isSelected = selectedBusNumber === option.busNumber;
            const isRecommended =
              option.busNumber === aiPlanResult.busNumber;

            return (
              <button
                key={option.busNumber}
                type="button"
                onClick={() => setSelectedBusNumber(option.busNumber)}
                className={`rounded-[2rem] border-2 p-7 text-left shadow-lg transition focus:outline-none focus:ring-4 ${
                  isSelected
                    ? 'border-blue-400 bg-sky-50 ring-4 ring-blue-100 focus:ring-blue-100'
                    : 'border-amber-100 bg-white/90 shadow-amber-100/60 hover:-translate-y-0.5 hover:bg-amber-50 focus:ring-amber-100'
                }`}
              >
                <div className="flex min-h-72 flex-col justify-between gap-8">
                  <div>
                    <p className="text-7xl font-extrabold text-slate-950">
                      {option.busNumber}
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-slate-800">
                      {option.busNumber}번 버스
                    </p>
                    <p className="mt-4 text-xl font-semibold leading-8 text-slate-600">
                      {busDescriptions[option.busNumber] ??
                        option.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`inline-flex rounded-full px-5 py-2 text-xl font-extrabold ${
                        isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isSelected ? '✓ 선택했어요' : '선택하기'}
                    </span>
                    {isRecommended ? (
                      <span className="inline-flex rounded-full bg-amber-100 px-5 py-2 text-xl font-extrabold text-amber-800">
                        추천
                      </span>
                    ) : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.commuteScreen)}
        >
          출발 화면으로 돌아가기
        </PrimaryButton>
        <PrimaryButton
          disabled={!selectedBusNumber}
          onClick={handleRideBus}
        >
          버스에 타기
        </PrimaryButton>
      </div>
    </section>
  );
}
