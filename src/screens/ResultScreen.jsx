import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import {
  getBonHighleeStopDisplayName,
  isBonHighleeDestinationStop,
} from '../data/scenarios/bonHighlee.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const TEXT = {
  pageTitle: '\uc624\ub298\uc758 \ucd9c\uadfc\uae38 \uacb0\uacfc',
  pageDescription:
    '\uc624\ub298 \uc120\ud0dd\ud55c \ub0b4\uc6a9\uc744 \ucc28\uadfc\ucc28\uadfc \ub3cc\uc544\ubd10\uc694.',
  successTitle: '\ucd9c\uadfc \uc131\uacf5!',
  lateTitle: '\uc870\uae08 \ub2a6\uc5c8\uc5b4\uc694',
  needsPracticeTitle: '\ub2e4\uc2dc \ud655\uc778\ud574\ubcfc \uc810\uc774 \uc788\uc5b4\uc694',
  successMessage:
    '\ubc84\uc2a4, \ub0b4\ub9b4 \uc815\ub958\uc7a5, \ubaa9\uc801\uc9c0\ub97c \uc798 \ud655\uc778\ud588\uc5b4\uc694.',
  lateMessage:
    '\uc911\uc694\ud55c \uc120\ud0dd\uc740 \uc798 \ud588\uace0, \ub2e4\uc74c\uc5d0\ub294 \uc2dc\uac04\uc744 \uc870\uae08 \ub354 \uc0b4\ud3b4\ubd10\uc694.',
  needsPracticeMessage:
    '\uba87 \uac00\uc9c0\ub97c \ub2e4\uc2dc \ud655\uc778\ud558\uba74 \ub2e4\uc74c \uc5f0\uc2b5\uc774 \ub354 \uc88b\uc544\uc838\uc694.',
  summaryTitle: '\uc624\ub298\uc758 \ucd9c\uadfc \uc694\uc57d',
  goodTitle: '\uc798\ud55c \uc810',
  reviewTitle: '\ub2e4\uc2dc \ud655\uc778\ud574\ubcfc \uc810',
  nextTitle: '\ub2e4\uc74c \uc5f0\uc2b5\uc5d0\uc11c',
  wakeUp: '\uc77c\uc5b4\ub098\uae30',
  bus: '\ud0c4 \ubc84\uc2a4',
  stop: '\ub0b4\ub9b0 \uc815\ub958\uc7a5',
  destination: '\uc120\ud0dd\ud55c \ubaa9\uc801\uc9c0',
  weather: '\uc624\ub298 \ub0a0\uc528',
  items: '\ucc59\uae34 \uc900\ube44\ubb3c',
  checking: '\ud655\uc778 \uc911',
  busSuffix: '\ubc88',
  busFullSuffix: '\ubc88 \ubc84\uc2a4',
  targetBus: '200',
  targetDestination: '\ud68c\uc0ac',
  wakeNow: '\uc77c\uc5b4\ub098\uc11c \uc900\ube44\ud588\uc5b4\uc694',
  sleptMore: '10\ubd84 \ub354 \uc790\uae30\ub97c \uc120\ud0dd\ud588\uc5b4\uc694',
  noItems: '\uc544\uc9c1 \ud655\uc778\ub41c \uc900\ube44\ubb3c\uc774 \uc5c6\uc5b4\uc694',
  targetBusGood: '\ubaa9\ud45c \ubc84\uc2a4 \ubc88\ud638\ub97c \uc798 \ud655\uc778\ud588\uc5b4\uc694',
  targetStopGood: '\ub0b4\ub9b4 \uc815\ub958\uc7a5\uc744 \ud655\uc778\ud588\uc5b4\uc694',
  destinationGood: '\ubaa9\uc801\uc9c0\ub97c \uc120\ud0dd\ud588\uc5b4\uc694',
  wakeGood: '\uc54c\ub78c\uc744 \ub4e3\uace0 \uc77c\uc5b4\ub0a0 \uc900\ube44\ub97c \ud588\uc5b4\uc694',
  itemGood: '\ud544\uc694\ud55c \uc900\ube44\ubb3c\uc744 \ud655\uc778\ud588\uc5b4\uc694',
  busReview: '\ubc84\uc2a4 \ubc88\ud638\ub97c \ub2e4\uc2dc \ud655\uc778\ud574\ubcfc\uae4c\uc694?',
  stopReview: '\ub0b4\ub9b4 \uc815\ub958\uc7a5\uc744 \ub2e4\uc2dc \ud655\uc778\ud574\ubcfc\uae4c\uc694?',
  destinationReview: '\ud68c\uc0ac \uc704\uce58\ub97c \ub2e4\uc2dc \ucc3e\uc544\ubcfc\uae4c\uc694?',
  timeReview: '\ub2e4\uc74c\uc5d0\ub294 \uc870\uae08 \ub354 \uc77c\ucc0d \uc77c\uc5b4\ub098\ubcfc\uae4c\uc694?',
  itemReview: '\uc900\ube44\ubb3c\uc744 \ud55c \ubc88 \ub354 \ud655\uc778\ud574\ubcfc\uae4c\uc694?',
  emptyGood: '\uc624\ub298 \ucd9c\uadfc\uae38\uc744 \ub05d\uae4c\uc9c0 \uc5f0\uc2b5\ud588\uc5b4\uc694',
  emptyReview:
    '\ud070 \ud750\ub984\uc744 \uc798 \ud655\uc778\ud588\uc5b4\uc694. \ub2e4\uc74c\uc5d0\ub3c4 \ucc28\uadfc\ucc28\uadfc \ud574\ubd10\uc694.',
  nextPractice:
    '\ubc84\uc2a4 \ubc88\ud638, \ub0b4\ub9b4 \uc815\ub958\uc7a5, \ubaa9\uc801\uc9c0\ub97c \ud55c \ubc88\uc529 \ub354 \ud655\uc778\ud574\uc694.',
  lateNotePrefix: '\uc608\uc0c1\ubcf4\ub2e4 ',
  lateNoteSuffix: '\ubd84 \ub2a6\uc5b4\uc84c\uc5b4\uc694',
  teacherReport: '\uc120\uc0dd\ub2d8 \ub9ac\ud3ec\ud2b8 \ubcf4\uae30',
  cutsceneBack: '\ub3c4\ucc29 \uc7a5\uba74 \ub2e4\uc2dc \ubcf4\uae30',
  targetArrival: '\ubaa9\ud45c \ub3c4\ucc29',
  expectedArrival: '\uc608\uc0c1 \ub3c4\ucc29',
  actualArrival: '\uc624\ub298 \ub3c4\ucc29',
  aiGuide: 'AI \uc548\ub0b4',
};

const RESULT_STYLES = {
  success: {
    badge: 'GOOD',
    card: 'border-emerald-200 bg-emerald-50',
    badgeClass: 'bg-emerald-500 text-white',
  },
  late: {
    badge: 'TIME',
    card: 'border-amber-200 bg-amber-50',
    badgeClass: 'bg-amber-400 text-amber-950',
  },
  needsPractice: {
    badge: 'CHECK',
    card: 'border-sky-200 bg-sky-50',
    badgeClass: 'bg-sky-500 text-white',
  },
};

const MASCOT_IMAGE = '/images/mascot/ai_robot_guide.png';

function displayValue(value) {
  return value || TEXT.checking;
}

function normalizeNumber(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(TEXT.busSuffix, '').trim();
}

function normalizeItemId(item) {
  if (typeof item === 'string') return item;
  return item?.id ?? item?.name ?? item?.label ?? '';
}

function getItemLabel(item) {
  if (typeof item === 'string') return item;
  return item?.name ?? item?.label ?? item?.id ?? '';
}

function getMissingItems(requiredItems, selectedItems) {
  const selectedIds = new Set((selectedItems ?? []).map(normalizeItemId));

  return (requiredItems ?? []).filter((item) => {
    const itemId = normalizeItemId(item);
    return itemId && !selectedIds.has(itemId);
  });
}

function addMinutesToTime(timeText, minutesToAdd) {
  if (!timeText || minutesToAdd <= 0) return timeText || null;

  const match = String(timeText).match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

  const totalMinutes = hours * 60 + minutes + minutesToAdd;
  const nextHours = Math.floor(totalMinutes / 60) % 24;
  const nextMinutes = totalMinutes % 60;

  return `${String(nextHours).padStart(2, '0')}:${String(nextMinutes).padStart(2, '0')}`;
}

function createResultSummary({ aiPlanInput, aiPlanResult, studentChoices }) {
  const selectedBusNumber = normalizeNumber(studentChoices?.selectedBusNumber);
  const busOk = selectedBusNumber === TEXT.targetBus;
  const stopOk = isBonHighleeDestinationStop({
    stopId: studentChoices?.gotOffAtStopId,
    stopName: studentChoices?.gotOffAtStopName,
  });
  const destinationOk =
    studentChoices?.selectedDestinationId === 'company' ||
    studentChoices?.selectedDestinationName === TEXT.targetDestination;
  const delayMinutes = Number(studentChoices?.wakeUpDelayMinutes ?? 0);
  const requiredItems = aiPlanResult?.requiredItems ?? [];
  const selectedItems = studentChoices?.selectedItems ?? [];
  const missingItems = getMissingItems(requiredItems, selectedItems);
  const reasonTags = [];

  if (!busOk) reasonTags.push('bus');
  if (!stopOk) reasonTags.push('stop');
  if (!destinationOk) reasonTags.push('destination');
  if (delayMinutes >= 10) reasonTags.push('delay');
  if (missingItems.length > 0) reasonTags.push('missingItems');

  let resultType = 'needsPractice';
  if (busOk && stopOk && destinationOk && delayMinutes <= 0) {
    resultType = 'success';
  } else if (busOk && stopOk && destinationOk && delayMinutes > 0) {
    resultType = 'late';
  }

  const displayTitle =
    resultType === 'success'
      ? TEXT.successTitle
      : resultType === 'late'
        ? TEXT.lateTitle
        : TEXT.needsPracticeTitle;
  const displayMessage =
    resultType === 'success'
      ? TEXT.successMessage
      : resultType === 'late'
        ? TEXT.lateMessage
        : TEXT.needsPracticeMessage;
  const baseArrivalTime =
    aiPlanResult?.expectedArrivalTime ?? aiPlanInput?.arrivalTime ?? null;
  const actualArrivalTime = addMinutesToTime(baseArrivalTime, delayMinutes);
  const strengths = [];
  const reviewPoints = [];

  if (busOk) strengths.push(TEXT.targetBusGood);
  else reviewPoints.push(TEXT.busReview);

  if (stopOk) strengths.push(TEXT.targetStopGood);
  else reviewPoints.push(TEXT.stopReview);

  if (destinationOk) strengths.push(TEXT.destinationGood);
  else reviewPoints.push(TEXT.destinationReview);

  if (delayMinutes >= 10) reviewPoints.push(TEXT.timeReview);
  else strengths.push(TEXT.wakeGood);

  if (requiredItems.length > 0 && missingItems.length === 0) {
    strengths.push(TEXT.itemGood);
  } else if (missingItems.length > 0) {
    reviewPoints.push(TEXT.itemReview);
  }

  return {
    resultType,
    displayTitle,
    displayMessage,
    actualArrivalTime,
    timePenaltyMinutes: delayMinutes,
    reasonTags,
    busOk,
    stopOk,
    destinationOk,
    missingItems: missingItems.map(getItemLabel).filter(Boolean),
    strengths: strengths.slice(0, 3),
    reviewPoints: reviewPoints.slice(0, 4),
  };
}

function FeedbackList({ items, emptyText, tone }) {
  const displayItems = items.length > 0 ? items : [emptyText];
  const toneClasses = {
    good: 'bg-emerald-50 text-slate-900 border-emerald-100',
    review: 'bg-amber-50 text-slate-900 border-amber-100',
  };

  return (
    <ul className="mt-4 space-y-3">
      {displayItems.map((item) => (
        <li
          key={item}
          className={`rounded-[1.25rem] border-2 px-5 py-4 text-xl font-bold leading-8 ${
            toneClasses[tone] ?? toneClasses.good
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ResultScreen() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult, studentChoices } = state;
  const resultSummary = createResultSummary({
    aiPlanInput,
    aiPlanResult,
    studentChoices,
  });
  const resultStyle =
    RESULT_STYLES[resultSummary.resultType] ?? RESULT_STYLES.needsPractice;
  const selectedItems = studentChoices?.selectedItems ?? [];
  const selectedItemsText =
    selectedItems.length > 0
      ? selectedItems.map(getItemLabel).filter(Boolean).join(', ')
      : TEXT.noItems;
  const delayLabel =
    resultSummary.timePenaltyMinutes >= 10
      ? TEXT.sleptMore
      : TEXT.wakeNow;
  const actualArrivalLabel =
    resultSummary.actualArrivalTime ??
    (resultSummary.timePenaltyMinutes > 0
      ? `${TEXT.lateNotePrefix}${resultSummary.timePenaltyMinutes}${TEXT.lateNoteSuffix}`
      : displayValue(aiPlanResult?.expectedArrivalTime));

  const handleGoToTeacherReport = () => {
    dispatch({
      type: GAME_ACTIONS.SAVE_RESULT_SUMMARY,
      payload: {
        ...state.resultSummary,
        ...resultSummary,
      },
    });
    goToScreen(SCREEN_IDS.teacherReport);
  };

  const summaryCards = [
    {
      title: TEXT.wakeUp,
      value: delayLabel,
    },
    {
      title: TEXT.bus,
      value: studentChoices?.selectedBusNumber
        ? `${normalizeNumber(studentChoices.selectedBusNumber)}${TEXT.busFullSuffix}`
        : TEXT.checking,
    },
    {
      title: TEXT.stop,
      value: displayValue(
        getBonHighleeStopDisplayName({
          stopId: studentChoices?.gotOffAtStopId,
          stopName: studentChoices?.gotOffAtStopName,
        }),
      ),
    },
    {
      title: TEXT.destination,
      value: displayValue(studentChoices?.selectedDestinationName),
    },
    {
      title: TEXT.weather,
      value: displayValue(aiPlanInput?.weather ?? state.weather),
    },
    {
      title: TEXT.items,
      value: selectedItemsText,
    },
  ];

  const timeCards = [
    {
      title: TEXT.targetArrival,
      value: displayValue(aiPlanInput?.arrivalTime),
    },
    {
      title: TEXT.expectedArrival,
      value: displayValue(aiPlanResult?.expectedArrivalTime),
    },
    {
      title: TEXT.actualArrival,
      value: actualArrivalLabel,
    },
  ];

  return (
    <div className="space-y-5">
      <header className="rounded-[2rem] border-4 border-amber-200 bg-white/90 p-6 text-center shadow-xl">
        <h1 className="text-4xl font-black text-slate-900">
          {TEXT.pageTitle}
        </h1>
        <p className="mt-2 text-xl font-bold text-slate-600">
          {TEXT.pageDescription}
        </p>
      </header>

      <article
        className={`grid gap-5 rounded-[2rem] border-4 p-6 shadow-xl lg:grid-cols-[220px_minmax(0,1fr)] ${resultStyle.card}`}
      >
        <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-white/85 p-5 text-center shadow-inner">
          <div
            className={`flex h-28 w-28 items-center justify-center rounded-full text-2xl font-black shadow-lg ${resultStyle.badgeClass}`}
          >
            {resultStyle.badge}
          </div>
          <img
            src={MASCOT_IMAGE}
            alt={TEXT.aiGuide}
            className="mt-4 h-28 w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="break-keep text-5xl font-black text-slate-950">
            {resultSummary.displayTitle}
          </h2>
          <p className="mt-4 max-w-5xl break-keep text-2xl font-bold leading-9 text-slate-700">
            {resultSummary.displayMessage}
          </p>
        </div>
      </article>

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border-4 border-sky-100 bg-white/90 p-6 shadow-xl">
          <h2 className="text-3xl font-black text-slate-950">
            {TEXT.summaryTitle}
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {summaryCards.map((card) => (
              <InfoCard
                key={card.title}
                title={card.title}
                value={card.value}
                highlight
              />
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border-4 border-amber-100 bg-white/90 p-6 shadow-xl">
          <h2 className="text-3xl font-black text-slate-950">
            {TEXT.actualArrival}
          </h2>
          <div className="mt-5 grid gap-4">
            {timeCards.map((card) => (
              <InfoCard
                key={card.title}
                title={card.title}
                value={card.value}
                highlight
              />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-[2rem] border-4 border-emerald-100 bg-white/90 p-6 shadow-xl">
          <h2 className="text-3xl font-black text-slate-950">
            {TEXT.goodTitle}
          </h2>
          <FeedbackList
            items={resultSummary.strengths}
            emptyText={TEXT.emptyGood}
            tone="good"
          />
        </div>

        <div className="rounded-[2rem] border-4 border-amber-100 bg-white/90 p-6 shadow-xl">
          <h2 className="text-3xl font-black text-slate-950">
            {TEXT.reviewTitle}
          </h2>
          <FeedbackList
            items={resultSummary.reviewPoints}
            emptyText={TEXT.emptyReview}
            tone="review"
          />
        </div>

        <div className="rounded-[2rem] border-4 border-sky-100 bg-sky-50 p-6 shadow-xl">
          <h2 className="text-3xl font-black text-slate-950">
            {TEXT.nextTitle}
          </h2>
          <p className="mt-4 rounded-[1.25rem] bg-white px-5 py-4 text-xl font-bold leading-8 text-slate-800 shadow-inner">
            {TEXT.nextPractice}
          </p>
        </div>
      </section>

      <div className="flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.resultCutscene)}
        >
          {TEXT.cutsceneBack}
        </PrimaryButton>
        <PrimaryButton onClick={handleGoToTeacherReport}>
          {TEXT.teacherReport}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default ResultScreen;
