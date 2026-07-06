import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { SCREEN_IDS } from '../data/screenIds.js';

function displayValue(value) {
  return value || '확인 중';
}

export default function BusRide() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const selectedBusNumber = state.studentChoices?.selectedBusNumber;

  const handlePrepareToGetOff = () => {
    dispatch({
      type: GAME_ACTIONS.SAVE_BUS_RIDE,
      payload: {
        hasCompletedBusRide: true,
      },
    });
    goToScreen(SCREEN_IDS.destinationMap);
  };

  if (!selectedBusNumber) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="버스를 탔어요"
          description="먼저 탈 버스를 선택해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            탄 버스 정보가 아직 없어요
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            먼저 탈 버스를 선택해 주세요.
          </p>
          <PrimaryButton
            variant="secondary"
            className="mt-8"
            onClick={() => goToScreen(SCREEN_IDS.busStop)}
          >
            버스 선택 화면으로 돌아가기
          </PrimaryButton>
        </InfoCard>
      </section>
    );
  }

  const busInfoCards = [
    {
      title: '내가 탄 버스',
      value: `${selectedBusNumber}번 버스`,
    },
    {
      title: 'AI 추천 버스',
      value: aiPlanResult.busNumber
        ? `${aiPlanResult.busNumber}번 버스`
        : '확인 중',
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
        title="버스를 탔어요"
        description="버스 안에서 내릴 정류장을 확인해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard
        title="버스 이동 중"
        value="선택한 버스를 타고 이동하고 있어요."
        description="내릴 곳이 가까워지면 준비해요."
        className="mb-6"
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {busInfoCards.map((card) => (
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
            <span aria-hidden="true">🚌</span>
            <span className="text-5xl font-bold text-slate-400" aria-hidden="true">
              →
            </span>
            <span aria-hidden="true">🏢</span>
          </div>
          <p className="mt-8 text-4xl font-bold text-slate-950">
            버스를 타고 이동해요
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            내릴 정류장이 가까워지면 준비해요.
          </p>
        </InfoCard>

        <InfoCard className="flex flex-col justify-center">
          <p className="text-3xl font-bold text-slate-950">정류장 안내</p>
          <div className="mt-5 grid gap-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-500">현재 위치</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                버스 이동 중
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-500">내릴 곳</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                회사 근처 정류장
              </p>
            </div>
            <p className="text-xl leading-8 text-slate-600">
              다음 화면에서 회사까지 가는 길을 확인해요.
            </p>
          </div>
        </InfoCard>
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.busStop)}
        >
          버스 다시 선택하기
        </PrimaryButton>
        <PrimaryButton onClick={handlePrepareToGetOff}>
          내릴 준비하기
        </PrimaryButton>
      </div>
    </section>
  );
}
