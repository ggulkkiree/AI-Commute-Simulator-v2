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
  '정류장에서 내리기',
  '횡단보도 확인하기',
  '회사 입구로 가기',
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
      title: '내린 곳',
      value: '회사 근처 정류장',
    },
    {
      title: '가는 곳',
      value: '회사',
    },
    {
      title: '도착 예상 시간',
      value: displayValue(aiPlanResult.expectedArrivalTime),
    },
  ];

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        title="회사까지 걸어가요"
        description="정류장에서 내려 회사까지 이동해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard
        title="정류장에 도착했어요"
        value="버스에서 내려 회사까지 걸어가요."
        description={
          hasCompletedBusRide
            ? '길을 확인하고 천천히 이동해요.'
            : '버스 이동 기록이 없어도 이동 확인을 계속할 수 있어요.'
        }
        className="mb-6"
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {arrivalInfoCards.map((card) => (
          <InfoCard
            key={card.title}
            title={card.title}
            value={card.value}
            highlight
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <InfoCard className="text-center">
          <div className="mx-auto flex max-w-2xl items-center justify-center gap-5 rounded-3xl bg-emerald-50 px-8 py-10 text-7xl shadow-inner">
            <span aria-hidden="true">🚏</span>
            <span className="text-5xl font-bold text-slate-400" aria-hidden="true">
              →
            </span>
            <span aria-hidden="true">🚶</span>
            <span className="text-5xl font-bold text-slate-400" aria-hidden="true">
              →
            </span>
            <span aria-hidden="true">🏢</span>
          </div>
          <p className="mt-8 text-4xl font-bold text-slate-950">
            정류장에서 회사까지 걸어가요
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            길을 확인하고 천천히 이동해요.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {walkingSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-emerald-100 bg-white p-5 text-left shadow-sm"
              >
                <p className="text-lg font-bold text-emerald-700">
                  {index + 1}단계
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard className="flex flex-col justify-center">
          <p className="text-3xl font-bold text-slate-950">출근 정보</p>
          <div className="mt-5 grid gap-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-500">
                목표 도착 시간
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {displayValue(aiPlanInput.arrivalTime)}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-500">오늘 날씨</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {displayValue(aiPlanInput.weather)}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-500">내가 탄 버스</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {selectedBusNumber ? `${selectedBusNumber}번 버스` : '확인 중'}
              </p>
            </div>
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
