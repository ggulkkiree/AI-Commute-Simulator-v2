import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { SCREEN_IDS } from '../data/screenIds.js';

function displayValue(value) {
  return value || '확인 중';
}

const walkingSteps = [
  {
    icon: '🚏',
    title: '정류장에서 내리기',
    description: '회사 근처 정류장에 도착했어요.',
  },
  {
    icon: '🚶',
    title: '횡단보도 확인하기',
    description: '주변을 살피고 천천히 걸어요.',
  },
  {
    icon: '🏢',
    title: '회사 입구로 가기',
    description: '마지막으로 회사 입구까지 이동해요.',
  },
];

export default function DestinationMap() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const selectedBusNumber = state.studentChoices?.selectedBusNumber;
  const hasCompletedBusRide = Boolean(
    state.studentChoices?.hasCompletedBusRide,
  );

  const handleWalkToCompany = () => {
    dispatch({
      type: GAME_ACTIONS.SAVE_DESTINATION_ARRIVAL,
      payload: {
        hasReachedDestinationArea: true,
      },
    });
    goToScreen(SCREEN_IDS.resultCutscene);
  };

  const arrivalInfoCards = [
    {
      title: '목표 도착 시간',
      value: displayValue(aiPlanInput.arrivalTime),
    },
    {
      title: '예상 도착 시간',
      value: displayValue(aiPlanResult.expectedArrivalTime),
    },
    {
      title: '오늘 날씨',
      value: displayValue(aiPlanInput.weather),
    },
    {
      title: '내가 탄 버스',
      value: selectedBusNumber
        ? `${selectedBusNumber}번 버스`
        : '확인 중',
    },
  ];

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        title="회사까지 걸어가요"
        description="정류장에서 내려 회사 입구까지 이동해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard className="mb-6 text-center">
        <p className="text-3xl font-extrabold text-slate-950 lg:text-4xl">
          🚏 정류장 → 🚶 걷기 → 🏢 회사
        </p>
        <p className="mt-4 text-2xl font-semibold leading-9 text-slate-600">
          길을 확인하고 안전하게 회사로 이동해요.
        </p>
        {!hasCompletedBusRide ? (
          <p className="mx-auto mt-5 max-w-3xl rounded-[1.75rem] bg-amber-50 p-4 text-xl font-bold leading-8 text-amber-800">
            버스 이동 기록이 없어도 경로 확인은 계속할 수 있어요.
          </p>
        ) : null}
      </InfoCard>

      <div className="grid gap-5 lg:grid-cols-4">
        {arrivalInfoCards.map((card) => (
          <InfoCard
            key={card.title}
            title={card.title}
            value={card.value}
            highlight
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <InfoCard>
          <p className="text-3xl font-extrabold text-slate-950">
            회사까지 가는 길
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {walkingSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.75rem] border-2 border-emerald-100 bg-emerald-50/70 p-5 shadow-sm"
              >
                <p className="text-lg font-extrabold text-emerald-700">
                  {index + 1}단계
                </p>
                <p className="mt-3 text-5xl" aria-hidden="true">
                  {step.icon}
                </p>
                <p className="mt-4 text-2xl font-extrabold text-slate-950">
                  {step.title}
                </p>
                <p className="mt-3 text-lg font-semibold leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard className="flex flex-col justify-center">
          <p className="text-3xl font-extrabold text-slate-950">
            지금 확인할 것
          </p>
          <div className="mt-5 grid gap-4">
            <div className="rounded-[1.75rem] bg-sky-50 p-5">
              <p className="text-lg font-bold text-slate-500">현재 위치</p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">
                회사 근처 정류장
              </p>
            </div>
            <div className="rounded-[1.75rem] bg-emerald-50 p-5">
              <p className="text-lg font-bold text-slate-500">목적지</p>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">
                회사 입구
              </p>
            </div>
            <p className="rounded-[1.75rem] bg-amber-50 p-5 text-xl font-bold leading-8 text-slate-700">
              마지막 이동을 마치면 오늘 출근 결과를 확인해요.
            </p>
          </div>
        </InfoCard>
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.busRide)}
        >
          버스 화면으로 돌아가기
        </PrimaryButton>
        <PrimaryButton onClick={handleWalkToCompany}>
          회사까지 걸어가기
        </PrimaryButton>
      </div>
    </section>
  );
}
