import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { bagItemEmoji } from '../data/bagItems.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const fallbackItemEmoji = {
  교통카드: '💳',
  스마트폰: '📱',
  물병: '💧',
  우산: '☂️',
  손선풍기: '🌀',
  겉옷: '🧥',
};

function getItemEmoji(item) {
  return bagItemEmoji[item] ?? fallbackItemEmoji[item] ?? '🎒';
}

function displayValue(value) {
  return value || '확인 중';
}

function hasCommutePlan(aiPlanResult) {
  return Boolean(
    aiPlanResult?.recommendedLeaveHomeTime && aiPlanResult?.busNumber,
  );
}

export default function CommuteScreen() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const selectedItems = state.studentChoices?.selectedItems ?? [];
  const canShowCommutePlan = hasCommutePlan(aiPlanResult);

  const handleStartCommute = () => {
    dispatch({
      type: GAME_ACTIONS.SAVE_COMMUTE_START,
      payload: {
        hasStartedCommute: true,
      },
    });
    goToScreen(SCREEN_IDS.busStop);
  };

  if (!canShowCommutePlan) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="출근하러 출발해요"
          description="먼저 AI 출근 계획을 확인해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            출근길 정보가 아직 없어요
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            AI 출근 계획을 확인한 뒤 출발할 수 있어요.
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

  const commuteCards = [
    {
      icon: '⏱️',
      title: '출발 시간',
      value: aiPlanResult.recommendedLeaveHomeTime,
    },
    {
      icon: '🌤️',
      title: '오늘 날씨',
      value: displayValue(aiPlanInput.weather),
    },
    {
      icon: '🚌',
      title: '탈 버스',
      value: `${aiPlanResult.busNumber}번 버스`,
    },
    {
      icon: '🏁',
      title: '예상 도착',
      value: displayValue(aiPlanResult.expectedArrivalTime),
    },
  ];

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        title="출근하러 출발해요"
        description="집에서 버스 정류장으로 이동해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard className="mb-6 text-center">
        <p className="text-3xl font-extrabold text-slate-950 lg:text-4xl">
          🏠 집 → 🚏 정류장
        </p>
        <p className="mt-4 text-2xl font-semibold leading-9 text-slate-600">
          가방을 챙겼다면 정류장으로 출발해요.
        </p>
      </InfoCard>

      <div className="grid gap-5 lg:grid-cols-4">
        {commuteCards.map((card) => (
          <InfoCard key={card.title} className="text-center">
            <p className="text-5xl" aria-hidden="true">
              {card.icon}
            </p>
            <p className="mt-4 text-2xl font-extrabold text-slate-600">
              {card.title}
            </p>
            <p className="mt-3 text-4xl font-extrabold text-slate-950">
              {card.value}
            </p>
          </InfoCard>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <InfoCard>
          <p className="text-3xl font-extrabold text-slate-950">
            지금 어디로 가나요?
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.75rem] bg-amber-50 p-6">
              <p className="text-xl font-bold text-slate-500">현재 위치</p>
              <p className="mt-2 text-4xl font-extrabold text-slate-950">
                집
              </p>
            </div>
            <div className="rounded-[1.75rem] bg-sky-50 p-6">
              <p className="text-xl font-bold text-slate-500">다음 목적지</p>
              <p className="mt-2 text-4xl font-extrabold text-slate-950">
                버스 정류장
              </p>
            </div>
          </div>
          <p className="mt-6 rounded-[1.75rem] bg-sky-50 p-5 text-2xl font-bold leading-9 text-slate-800">
            정류장에 도착하면 버스 번호를 확인해요.
          </p>
        </InfoCard>

        <InfoCard className="flex flex-col">
          <p className="text-3xl font-extrabold text-slate-950">내 가방</p>
          <p className="mt-3 text-xl font-semibold leading-8 text-slate-600">
            챙긴 물건을 다시 확인해요.
          </p>

          <div className="mt-6 flex min-h-48 flex-1 flex-wrap content-start gap-3 rounded-[2rem] border-2 border-dashed border-sky-200 bg-sky-50/70 p-5">
            {selectedItems.length === 0 ? (
              <p className="text-2xl font-bold text-slate-500">
                아직 가방에 넣은 물건이 없어요.
              </p>
            ) : (
              selectedItems.map((item) => (
                <span
                  key={item}
                  className="rounded-2xl border-2 border-sky-100 bg-white px-5 py-3 text-2xl font-extrabold text-slate-900 shadow-sm"
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
          onClick={() => goToScreen(SCREEN_IDS.bagPacking)}
        >
          가방 다시 확인하기
        </PrimaryButton>
        <PrimaryButton onClick={handleStartCommute}>
          집에서 출발했어요
        </PrimaryButton>
      </div>
    </section>
  );
}
