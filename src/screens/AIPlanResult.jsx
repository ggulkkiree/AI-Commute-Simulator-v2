import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

const planByArrivalTime = {
  '09:00': {
    recommendedWakeUpTime: '07:00',
    recommendedLeaveHomeTime: '08:10',
    busNumber: '200',
    expectedArrivalTime: '08:55',
  },
  '10:00': {
    recommendedWakeUpTime: '08:00',
    recommendedLeaveHomeTime: '09:10',
    busNumber: '200',
    expectedArrivalTime: '09:55',
  },
  '13:00': {
    recommendedWakeUpTime: '11:00',
    recommendedLeaveHomeTime: '12:10',
    busNumber: '200',
    expectedArrivalTime: '12:55',
  },
};

const requiredItemsByWeather = {
  맑음: ['교통카드', '스마트폰', '물병'],
  비: ['교통카드', '스마트폰', '물병', '우산'],
  더움: ['교통카드', '스마트폰', '물병', '손선풍기'],
  추움: ['교통카드', '스마트폰', '물병', '겉옷'],
};

const itemEmoji = {
  교통카드: '🚌',
  스마트폰: '📱',
  물병: '💧',
  우산: '☂️',
  손선풍기: '🌀',
  겉옷: '🧥',
};

function createRecommendedPlan(aiPlanInput) {
  const arrivalPlan = planByArrivalTime[aiPlanInput?.arrivalTime];
  const requiredItems = requiredItemsByWeather[aiPlanInput?.weather];

  if (!arrivalPlan || !requiredItems) {
    return null;
  }

  return {
    ...arrivalPlan,
    requiredItems,
  };
}

export default function AIPlanResult() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput } = state;
  const studentName = state.selectedStudent?.name;
  const recommendedPlan = createRecommendedPlan(aiPlanInput);

  const handlePrepareWithPlan = () => {
    if (!recommendedPlan) {
      return;
    }

    dispatch({
      type: GAME_ACTIONS.SAVE_AI_PLAN_RESULT,
      payload: recommendedPlan,
    });
    goToScreen(SCREEN_IDS.eveningPreparation);
  };

  if (!recommendedPlan) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="AI가 추천한 출근 계획"
          description="먼저 출근 시간과 날씨를 선택해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            출근 정보가 아직 없어요
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            먼저 출근 시간과 날씨를 선택해 주세요.
          </p>
          <PrimaryButton
            variant="secondary"
            className="mt-8"
            onClick={() => goToScreen(SCREEN_IDS.aiPlanInput)}
          >
            입력 화면으로 돌아가기
          </PrimaryButton>
        </InfoCard>
      </section>
    );
  }

  const summaryCards = [
    {
      icon: '⏰',
      title: '일어날 시간',
      value: recommendedPlan.recommendedWakeUpTime,
      description: '아침 준비를 시작해요.',
    },
    {
      icon: '🏠',
      title: '집에서 출발',
      value: recommendedPlan.recommendedLeaveHomeTime,
      description: '정류장으로 이동해요.',
    },
    {
      icon: '🚌',
      title: '탈 버스',
      value: `${recommendedPlan.busNumber}번 버스`,
      description: '버스 번호를 확인해요.',
    },
    {
      icon: '🏢',
      title: '예상 도착',
      value: recommendedPlan.expectedArrivalTime,
      description: '회사에 도착해요.',
    },
  ];

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        title="AI가 추천한 출근 계획"
        description="출근 시간에 맞춰 일어날 시간과 출발 시간을 확인해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <div className="mb-6 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <InfoCard className="bg-gradient-to-br from-white/95 to-sky-50/90">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-sky-100 bg-white text-5xl shadow-inner"
            aria-hidden="true"
          >
            🤖
          </div>
          <p className="mt-6 text-4xl font-extrabold leading-tight text-slate-950">
            AI가 추천한 출근 계획이에요
          </p>
          <p className="mt-4 text-2xl font-semibold leading-9 text-slate-600">
            이 계획을 보고 전날 준비를 시작해요.
          </p>
        </InfoCard>

        <InfoCard>
          <p className="text-3xl font-extrabold text-slate-950">
            출근 계획이 만들어졌어요
          </p>
          <p className="mt-4 text-4xl font-extrabold text-sky-700">
            {aiPlanInput.arrivalTime}까지 도착하기 위한 추천 계획이에요.
          </p>
          <p className="mt-4 text-2xl font-semibold leading-9 text-slate-600">
            {aiPlanInput.weather} 날씨에 맞춰 준비할 물건도 함께 확인해요.
          </p>
        </InfoCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <InfoCard key={card.title} className="text-center">
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-amber-100 bg-amber-50 text-5xl shadow-inner"
              aria-hidden="true"
            >
              {card.icon}
            </div>
            <p className="mt-5 text-xl font-extrabold text-slate-600">
              {card.title}
            </p>
            <p className="mt-3 text-4xl font-extrabold text-slate-950 lg:text-5xl">
              {card.value}
            </p>
            <p className="mt-3 text-lg font-semibold leading-7 text-slate-600">
              {card.description}
            </p>
          </InfoCard>
        ))}
      </div>

      <InfoCard className="mt-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-3xl font-extrabold text-slate-950">
              챙기면 좋은 물건
            </p>
            <p className="mt-3 text-xl font-semibold text-slate-600">
              날씨와 이동에 맞춰 준비해요.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {recommendedPlan.requiredItems.map((item) => (
              <span
                key={item}
                className="rounded-full border-2 border-amber-200 bg-amber-50 px-6 py-3 text-2xl font-extrabold text-slate-900 shadow-sm"
              >
                <span aria-hidden="true">{itemEmoji[item] ?? '•'}</span>{' '}
                {item}
              </span>
            ))}
          </div>
        </div>
      </InfoCard>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.aiPlanInput)}
        >
          다시 선택하기
        </PrimaryButton>
        <PrimaryButton onClick={handlePrepareWithPlan}>
          전날 준비 시작하기
        </PrimaryButton>
      </div>
    </section>
  );
}
