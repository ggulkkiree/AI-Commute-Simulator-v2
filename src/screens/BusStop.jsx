import { useState } from 'react';
import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { busOptions } from '../data/busOptions.js';
import { SCREEN_IDS } from '../data/screenIds.js';

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
        title="버스 정류장"
        description="버스 번호를 보고 탈 버스를 선택해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard
        title="정류장에 도착했어요"
        value={`${aiPlanInput.arrivalTime}까지 도착하기 위해 버스를 확인해요.`}
        description={
          hasStartedCommute
            ? '정류장에서 버스 번호를 살펴봐요.'
            : '출발 기록이 없어도 버스 선택 연습을 계속할 수 있어요.'
        }
        className="mb-6"
      />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <InfoCard
            title="AI 추천 버스"
            value={`${aiPlanResult.busNumber}번 버스`}
            description="출근 계획에서 확인한 버스예요."
            highlight
          />

          <InfoCard>
            <p className="text-3xl font-bold text-slate-950">선택 안내</p>
            <p className="mt-4 text-2xl font-bold text-slate-700">
              {selectedBusNumber
                ? `선택한 버스: ${selectedBusNumber}번`
                : '탈 버스를 선택해 주세요.'}
            </p>
          </InfoCard>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          {busOptions.map((option) => {
            const isSelected = selectedBusNumber === option.busNumber;

            return (
              <button
                key={option.busNumber}
                type="button"
                onClick={() => setSelectedBusNumber(option.busNumber)}
                className={`rounded-2xl border p-7 text-left shadow-sm transition focus:outline-none focus:ring-4 ${
                  isSelected
                    ? 'border-emerald-200 bg-emerald-50 focus:ring-emerald-100'
                    : 'border-slate-200 bg-white hover:bg-sky-50 focus:ring-sky-100'
                }`}
              >
                <div className="flex h-full flex-col justify-between gap-8">
                  <div>
                    <p className="text-6xl font-bold text-slate-950">
                      {option.busNumber}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-slate-800">
                      {option.busNumber}번 버스
                    </p>
                    <p className="mt-4 text-xl leading-8 text-slate-600">
                      {option.description}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit rounded-full px-5 py-2 text-xl font-bold ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isSelected ? '선택했어요' : '선택하기'}
                  </span>
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
          버스 타기
        </PrimaryButton>
      </div>
    </section>
  );
}
