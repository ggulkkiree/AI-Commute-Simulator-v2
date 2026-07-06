import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const toneStyles = {
  good: {
    icon: '🌟',
    card: 'border-emerald-200 bg-emerald-50',
    iconBg: 'bg-white',
  },
  caution: {
    icon: '🔎',
    card: 'border-amber-200 bg-amber-50',
    iconBg: 'bg-white',
  },
  practice: {
    icon: '🌱',
    card: 'border-sky-200 bg-sky-50',
    iconBg: 'bg-white',
  },
};

function displayValue(value) {
  return value || '확인 중';
}

function getMissingItems(requiredItems, selectedItems) {
  return requiredItems.filter((item) => !selectedItems.includes(item));
}

function createResultSummary({ aiPlanResult, studentChoices }) {
  const requiredItems = aiPlanResult?.requiredItems ?? [];
  const selectedItems = studentChoices?.selectedItems ?? [];
  const completedMorningTasks = studentChoices?.completedMorningTasks ?? [];
  const selectedBusNumber = studentChoices?.selectedBusNumber ?? null;
  const recommendedBusNumber = aiPlanResult?.busNumber ?? null;
  const strengths = [];
  const reviewPoints = [];
  const missingItems = getMissingItems(requiredItems, selectedItems);

  if (requiredItems.length > 0 && missingItems.length === 0) {
    strengths.push('필요한 물건을 잘 챙겼어요.');
  } else if (missingItems.length > 0) {
    reviewPoints.push(`빠진 물건이 있어요: ${missingItems.join(', ')}`);
  }

  if (selectedBusNumber && recommendedBusNumber) {
    if (selectedBusNumber === recommendedBusNumber) {
      strengths.push('AI가 추천한 버스를 잘 확인했어요.');
    } else {
      reviewPoints.push(
        `버스 번호를 다시 확인해 보면 좋아요. 선택한 버스: ${selectedBusNumber}번 / 추천 버스: ${recommendedBusNumber}번`,
      );
    }
  } else {
    reviewPoints.push('버스 번호를 다시 확인해 보면 좋아요.');
  }

  if (completedMorningTasks.length >= 4) {
    strengths.push('아침 준비를 모두 확인했어요.');
  } else {
    reviewPoints.push('아침 준비 활동을 더 확인해 보면 좋아요.');
  }

  if (
    studentChoices?.hasStartedCommute &&
    studentChoices?.hasCompletedBusRide &&
    studentChoices?.hasReachedDestinationArea
  ) {
    strengths.push('집에서 회사까지 이동 흐름을 끝까지 확인했어요.');
  } else {
    reviewPoints.push('출근 이동 흐름을 다시 연습해 보면 좋아요.');
  }

  let resultTitle = '출근 준비를 잘 마쳤어요';
  let resultTone = 'good';
  let resultMessage = '오늘 출근길을 차근차근 잘 확인했어요.';

  if (reviewPoints.length >= 3) {
    resultTitle = '다시 연습해 보면 좋아요';
    resultTone = 'practice';
    resultMessage = '다음에는 한 단계씩 다시 확인해 봐요.';
  } else if (reviewPoints.length >= 1) {
    resultTitle = '조금 더 확인하면 좋아요';
    resultTone = 'caution';
    resultMessage = '출근길에서 다시 확인할 부분이 있어요.';
  }

  return {
    resultTitle,
    resultTone,
    resultMessage,
    strengths,
    reviewPoints,
    nextStep: '출근 전에는 시간, 준비물, 버스 번호를 한 번 더 확인해요.',
  };
}

function FeedbackList({ items, emptyText }) {
  const displayItems = items.length > 0 ? items : [emptyText];

  return (
    <ul className="mt-5 space-y-3">
      {displayItems.map((item) => (
        <li
          key={item}
          className="rounded-2xl bg-slate-50 px-5 py-4 text-2xl font-bold leading-8 text-slate-900"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ResultScreen() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult, studentChoices } = state;
  const studentName = state.selectedStudent?.name;
  const resultSummary = createResultSummary({
    aiPlanResult,
    studentChoices,
  });
  const toneStyle = toneStyles[resultSummary.resultTone] ?? toneStyles.good;

  const handleGoToTeacherReport = () => {
    dispatch({
      type: GAME_ACTIONS.SAVE_RESULT_SUMMARY,
      payload: resultSummary,
    });
    goToScreen(SCREEN_IDS.teacherReport);
  };

  const summaryCards = [
    {
      title: '목표 도착 시간',
      value: displayValue(aiPlanInput?.arrivalTime),
    },
    {
      title: '도착 예상 시간',
      value: displayValue(aiPlanResult?.expectedArrivalTime),
    },
    {
      title: '오늘 날씨',
      value: displayValue(aiPlanInput?.weather),
    },
    {
      title: '내가 탄 버스',
      value: studentChoices?.selectedBusNumber
        ? `${studentChoices.selectedBusNumber}번 버스`
        : '확인 중',
    },
    {
      title: 'AI 추천 버스',
      value: aiPlanResult?.busNumber
        ? `${aiPlanResult.busNumber}번 버스`
        : '확인 중',
    },
  ];

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        title="오늘의 출근길 결과"
        description="오늘 선택을 함께 돌아봐요."
        targetArrivalTime={aiPlanInput?.arrivalTime}
      />

      <article
        className={`rounded-2xl border p-8 text-center shadow-sm ${toneStyle.card}`}
      >
        <div
          className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full text-6xl shadow-inner ${toneStyle.iconBg}`}
        >
          <span aria-hidden="true">{toneStyle.icon}</span>
        </div>
        <h2 className="mt-6 text-5xl font-bold text-slate-950">
          {resultSummary.resultTitle}
        </h2>
        <p className="mx-auto mt-5 max-w-4xl text-2xl leading-9 text-slate-700">
          {resultSummary.resultMessage}
        </p>
      </article>

      <div className="mt-6 grid gap-5 xl:grid-cols-5">
        {summaryCards.map((card) => (
          <InfoCard
            key={card.title}
            title={card.title}
            value={card.value}
            highlight
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <InfoCard>
          <p className="text-3xl font-bold text-slate-950">잘한 점</p>
          <FeedbackList
            items={resultSummary.strengths}
            emptyText="오늘 출근길을 끝까지 연습했어요."
          />
        </InfoCard>

        <InfoCard>
          <p className="text-3xl font-bold text-slate-950">다시 확인할 점</p>
          <FeedbackList
            items={resultSummary.reviewPoints}
            emptyText="다시 확인할 점이 많지 않아요. 잘했어요."
          />
        </InfoCard>

        <InfoCard>
          <p className="text-3xl font-bold text-slate-950">내일 해볼 점</p>
          <p className="mt-5 rounded-2xl bg-sky-50 px-5 py-4 text-2xl font-bold leading-8 text-slate-950">
            {resultSummary.nextStep}
          </p>
        </InfoCard>
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.resultCutscene)}
        >
          도착 장면 다시 보기
        </PrimaryButton>
        <PrimaryButton onClick={handleGoToTeacherReport}>
          교사용 리포트 보기
        </PrimaryButton>
      </div>
    </section>
  );
}
