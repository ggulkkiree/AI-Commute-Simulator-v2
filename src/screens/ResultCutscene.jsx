import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { getBonHighleeStopDisplayName } from '../data/scenarios/bonHighlee.js';
import { SCREEN_IDS } from '../data/screenIds.js';

function displayValue(value) {
  return value || '확인 중';
}

export default function ResultCutscene() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const selectedBusNumber = state.studentChoices?.selectedBusNumber;
  const selectedDestinationId = state.studentChoices?.selectedDestinationId;
  const selectedDestinationName = state.studentChoices?.selectedDestinationName;
  const hasSelectedDestination = Boolean(
    selectedDestinationId ||
      selectedDestinationName ||
      state.studentChoices?.hasReachedDestinationArea,
  );
  const gotOffAtStopName = getBonHighleeStopDisplayName({
    stopId: state.studentChoices?.gotOffAtStopId,
    stopName: state.studentChoices?.gotOffAtStopName,
  });
  const destinationLabel = selectedDestinationName || '선택한 장소';
  const recapMessages = [
    '가방을 챙기고 집에서 출발했어요.',
    selectedBusNumber
      ? `${selectedBusNumber}번 버스를 선택했어요.`
      : '버스를 선택했어요.',
    gotOffAtStopName
      ? `${gotOffAtStopName}에서 내려 ${destinationLabel}을 선택했어요.`
      : `${destinationLabel}을 선택했어요.`,
  ];
  const arrivalDetail =
    hasSelectedDestination && selectedDestinationName
      ? `${selectedDestinationName}에 도착했어요. 도착한 장소를 확인해 봅시다.`
      : '도착한 장소를 확인해 봅시다.';

  const handleGoToResult = () => {
    dispatch({
      type: GAME_ACTIONS.SAVE_RESULT_CUTSCENE,
      payload: {
        hasSeenResultCutscene: true,
      },
    });
    goToScreen(SCREEN_IDS.resultScreen);
  };

  const summaryCards = [
    {
      title: '목표 도착 시간',
      value: displayValue(aiPlanInput.arrivalTime),
    },
    {
      title: '예상 도착 시간',
      value: displayValue(aiPlanResult.expectedArrivalTime),
    },
    {
      title: '내가 탄 버스',
      value: selectedBusNumber ? `${selectedBusNumber}번 버스` : '확인 중',
    },
    {
      title: '오늘 날씨',
      value: displayValue(aiPlanInput.weather),
    },
  ];

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        title="선택한 장소에 도착했어요."
        description="오늘 출근길을 함께 돌아볼 준비를 해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard className="mb-6 text-center">
        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-sky-50 text-8xl shadow-inner">
          <span aria-hidden="true">📍</span>
        </div>
        <p className="mt-8 text-5xl font-extrabold text-slate-950">
          선택한 장소에 도착했어요.
        </p>
        <p className="mx-auto mt-5 max-w-4xl text-2xl font-semibold leading-9 text-slate-600">
          {arrivalDetail}
        </p>
      </InfoCard>

      <div className="grid gap-5 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <InfoCard
            key={card.title}
            title={card.title}
            value={card.value}
            highlight
          />
        ))}
      </div>

      <InfoCard className="mt-6">
        <p className="text-3xl font-extrabold text-slate-950">
          오늘 이동 돌아보기
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {recapMessages.map((message, index) => (
            <div
              key={message}
              className="rounded-[1.75rem] border-2 border-sky-100 bg-sky-50 p-5 shadow-sm"
            >
              <p className="text-lg font-extrabold text-sky-700">
                {index + 1}번째
              </p>
              <p className="mt-2 text-2xl font-extrabold leading-8 text-slate-950">
                {message}
              </p>
            </div>
          ))}
        </div>
      </InfoCard>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.destinationMap)}
        >
          목적지 선택 다시 보기
        </PrimaryButton>
        <PrimaryButton onClick={handleGoToResult}>
          결과 확인하기
        </PrimaryButton>
      </div>
    </section>
  );
}
