import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { bagItemEmoji } from '../data/bagItems.js';
import { SCREEN_IDS } from '../data/screenIds.js';

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

  const commuteCards = [
    {
      title: '추천 출발 시간',
      value: aiPlanResult.recommendedLeaveHomeTime,
    },
    {
      title: '오늘 날씨',
      value: aiPlanInput.weather,
    },
    {
      title: '탈 버스',
      value: `${aiPlanResult.busNumber}번 버스`,
    },
    {
      title: '도착 예상 시간',
      value: aiPlanResult.expectedArrivalTime,
    },
  ];

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        title="출근하러 출발해요"
        description="가방을 챙겼다면 버스 정류장으로 가요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard
        title="오늘의 출근길"
        value={`${aiPlanInput.arrivalTime}까지 도착하기 위해 정류장으로 이동해요.`}
        description="정류장에 도착하면 버스 번호를 확인해요."
        className="mb-6"
      />

      <div className="grid gap-5 lg:grid-cols-4">
        {commuteCards.map((card) => (
          <InfoCard
            key={card.title}
            title={card.title}
            value={card.value}
            highlight
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <InfoCard className="text-center">
          <div className="mx-auto flex max-w-xl items-center justify-center gap-5 rounded-3xl bg-sky-50 px-8 py-10 text-7xl shadow-inner">
            <span aria-hidden="true">🏠</span>
            <span className="text-5xl font-bold text-slate-400" aria-hidden="true">
              →
            </span>
            <span aria-hidden="true">🚏</span>
          </div>
          <p className="mt-8 text-4xl font-bold text-slate-950">
            집에서 나와 정류장으로 가요
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            버스를 타기 전에 정류장 이름과 버스 번호를 확인해요.
          </p>
        </InfoCard>

        <InfoCard className="flex flex-col">
          <p className="text-3xl font-bold text-slate-950">내 가방</p>
          <p className="mt-3 text-xl leading-8 text-slate-600">
            챙긴 물건을 다시 확인해요.
          </p>

          <div className="mt-6 flex min-h-48 flex-1 flex-wrap content-start gap-3 rounded-2xl bg-slate-50 p-5">
            {selectedItems.length === 0 ? (
              <p className="text-2xl font-bold text-slate-500">
                가방에 넣은 물건이 없어요.
              </p>
            ) : (
              selectedItems.map((item) => (
                <span
                  key={item}
                  className="rounded-2xl border border-sky-100 bg-white px-5 py-3 text-2xl font-bold text-slate-900 shadow-sm"
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
