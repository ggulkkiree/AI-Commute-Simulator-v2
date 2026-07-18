import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import {
  getBonHighleeStopDisplayName,
  isBonHighleeDestinationStop,
} from '../data/scenarios/bonHighlee.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const TEXT = {
  title: '\uad50\uc0ac\uc6a9 \ub9ac\ud3ec\ud2b8',
  description:
    '\ud559\uc0dd\uc758 \ucd9c\uadfc \uacfc\uc815 \uae30\ub85d\uc744 \ud0c0\uc784\ub77c\uc778\uacfc \uc9c0\ub3c4 \ubb38\uc7a5\uc73c\ub85c \ud655\uc778\ud574\uc694.',
  studentName: '\ud559\uc0dd \uc774\ub984',
  finalResult: '\ucd5c\uc885 \uacb0\uacfc',
  targetArrival: '\ubaa9\ud45c \ub3c4\ucc29',
  actualArrival: '\uc2e4\uc81c \ub3c4\ucc29',
  weather: '\uc624\ub298 \ub0a0\uc528',
  selectedBus: '\uc120\ud0dd\ud55c \ubc84\uc2a4',
  gotOffStop: '\ub0b4\ub9b0 \uc815\ub958\uc7a5',
  selectedDestination: '\uc120\ud0dd\ud55c \ubaa9\uc801\uc9c0',
  success: '\ucd9c\uadfc \uc131\uacf5',
  late: '\uc870\uae08 \ub2a6\uc74c',
  needsPractice: '\ub2e4\uc2dc \ud655\uc778\ud560 \uc810 \uc788\uc74c',
  checking: '\ud655\uc778 \uc911',
  none: '\uae30\ub85d \uc5c6\uc74c',
  complete: '\uc644\ub8cc',
  review: '\ud655\uc778 \ud544\uc694',
  noRecord: '\uae30\ub85d \uc5c6\uc74c',
  timelineTitle: '\uc804\uccb4 \uacfc\uc815 \ud0c0\uc784\ub77c\uc778',
  busDecisionTitle: '\ubc84\uc2a4\uc815\ub958\uc7a5 \ud310\ub2e8 \uae30\ub85d',
  rideDecisionTitle: '\ud558\ucc28 \ud310\ub2e8 \uae30\ub85d',
  destinationTitle: '\ubaa9\uc801\uc9c0 \uc120\ud0dd \uae30\ub85d',
  coachingTitle: '\uc790\ub3d9 \ucf54\uce6d \ubb38\uc7a5',
  goodTitle: '\uc798\ud55c \uc810',
  reviewTitle: '\ub2e4\uc2dc \uc5f0\uc2b5\ud560 \uc810',
  nextTitle: '\ub2e4\uc74c \uc9c0\ub3c4 \uc81c\uc548',
  targetBus: '200',
  targetDestination: '\ud68c\uc0ac',
  busSuffix: '\ubc88',
  targetMatch: '\ud655\uc778 \uc644\ub8cc',
  targetReview: '\ub2e4\uc2dc \ud655\uc778 \ud544\uc694',
  wait: '\uae30\ub2e4\ub9bc',
  board: '\ud0d1\uc2b9',
  stay: '\ub354 \uac10',
  bell: '\ud558\ucc28\ubca8',
  selectedPlace: '\uc120\ud0dd\ud55c \uc7a5\uc18c',
  targetMatchLabel: '\ubaa9\ud45c \uc7a5\uc18c\uc640\uc758 \uc77c\uce58 \uc5ec\ubd80',
  resultBack: '\uacb0\uacfc \ud654\uba74 \ub2e4\uc2dc \ubcf4\uae30',
  restart: '\ucc98\uc74c\uc73c\ub85c \ub3cc\uc544\uac00\uae30',
};

const TIMELINE_LABELS = {
  studentSelect: '\ud559\uc0dd \uc120\ud0dd',
  commuteInfo: '\ucd9c\uadfc \uc815\ubcf4 \ud655\uc778',
  aiPlan: 'AI \uacc4\ud68d \ud655\uc778',
  eveningPrep: '\uc804\ub0a0 \uc900\ube44',
  alarm: '\uc54c\ub78c \uc124\uc815',
  wakeUp: '\uae30\uc0c1 \uc120\ud0dd',
  morningPrep: '\uc544\uce68 \uc900\ube44',
  bagPacking: '\uac00\ubc29 \ucc59\uae30\uae30',
  commuteStart: '\uc815\ub958\uc7a5 \uc774\ub3d9',
  busStop: '\ubc84\uc2a4 \ub3c4\ucc29 \ud310\ub2e8',
  busRide: '\ubc84\uc2a4 \ud0d1\uc2b9',
  getOff: '\ud558\ucc28 \ud310\ub2e8',
  destination: '\ubaa9\uc801\uc9c0 \uc120\ud0dd',
  result: '\ucd5c\uc885 \uacb0\uacfc',
};

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function displayValue(value) {
  return value || TEXT.checking;
}

function normalizeBus(value) {
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
  const selectedIds = new Set(asArray(selectedItems).map(normalizeItemId));

  return asArray(requiredItems).filter((item) => {
    const id = normalizeItemId(item);
    return id && !selectedIds.has(id);
  });
}

function createFallbackSummary({ aiPlanInput, aiPlanResult, studentChoices }) {
  const busOk = normalizeBus(studentChoices?.selectedBusNumber) === TEXT.targetBus;
  const stopOk = isBonHighleeDestinationStop({
    stopId: studentChoices?.gotOffAtStopId,
    stopName: studentChoices?.gotOffAtStopName,
  });
  const destinationOk =
    studentChoices?.selectedDestinationId === 'company' ||
    studentChoices?.selectedDestinationName === TEXT.targetDestination;
  const timePenaltyMinutes = Number(studentChoices?.wakeUpDelayMinutes ?? 0);
  const missingItems = getMissingItems(
    aiPlanResult?.requiredItems,
    studentChoices?.selectedItems,
  ).map(getItemLabel);
  const reasonTags = [];

  if (!busOk) reasonTags.push('bus');
  if (!stopOk) reasonTags.push('stop');
  if (!destinationOk) reasonTags.push('destination');
  if (timePenaltyMinutes >= 10) reasonTags.push('delay');
  if (missingItems.length > 0) reasonTags.push('missingItems');

  let resultType = 'needsPractice';
  if (busOk && stopOk && destinationOk && timePenaltyMinutes <= 0) {
    resultType = 'success';
  } else if (busOk && stopOk && destinationOk && timePenaltyMinutes > 0) {
    resultType = 'late';
  }

  return {
    resultType,
    displayTitle:
      resultType === 'success'
        ? TEXT.success
        : resultType === 'late'
          ? TEXT.late
          : TEXT.needsPractice,
    actualArrivalTime:
      aiPlanResult?.expectedArrivalTime ?? aiPlanInput?.arrivalTime ?? null,
    timePenaltyMinutes,
    reasonTags,
    busOk,
    stopOk,
    destinationOk,
    missingItems,
    strengths: [],
    reviewPoints: [],
  };
}

function createReportData(state) {
  const { selectedStudent, aiPlanInput, aiPlanResult, studentChoices } = state;
  const fallback = createFallbackSummary({
    aiPlanInput,
    aiPlanResult,
    studentChoices,
  });
  const summary = {
    ...fallback,
    ...(state.resultSummary ?? {}),
  };

  return {
    studentName: selectedStudent?.name ?? TEXT.checking,
    summary,
    busOk: summary.busOk ?? fallback.busOk,
    stopOk: summary.stopOk ?? fallback.stopOk,
    destinationOk: summary.destinationOk ?? fallback.destinationOk,
    delayMinutes:
      summary.timePenaltyMinutes ?? Number(studentChoices?.wakeUpDelayMinutes ?? 0),
    missingItems: summary.missingItems ?? fallback.missingItems,
  };
}

function getStatus(condition, hasRecord = true) {
  if (!hasRecord) return 'none';
  return condition ? 'complete' : 'review';
}

function createTimeline({ state, report }) {
  const { aiPlanInput, aiPlanResult, studentChoices } = state;
  const selectedItems = asArray(studentChoices?.selectedItems);
  const requiredItems = asArray(aiPlanResult?.requiredItems);
  const missingItems = report.missingItems ?? [];
  const busDecisions = asArray(studentChoices?.busStopDecisions);
  const rideDecisions = asArray(studentChoices?.busRideDecisions);
  const destinationAttempts = asArray(studentChoices?.destinationAttempts);

  return [
    {
      label: TIMELINE_LABELS.studentSelect,
      status: getStatus(Boolean(state.selectedStudent)),
      detail: report.studentName,
    },
    {
      label: TIMELINE_LABELS.commuteInfo,
      status: getStatus(Boolean(aiPlanInput?.arrivalTime || aiPlanInput?.weather)),
      detail: displayValue(aiPlanInput?.arrivalTime ?? aiPlanInput?.weather),
    },
    {
      label: TIMELINE_LABELS.aiPlan,
      status: getStatus(Boolean(aiPlanResult?.busNumber)),
      detail: aiPlanResult?.busNumber
        ? `${aiPlanResult.busNumber}${TEXT.busSuffix}`
        : TEXT.noRecord,
    },
    {
      label: TIMELINE_LABELS.eveningPrep,
      status: getStatus(Boolean(studentChoices?.eveningBagChecked)),
      detail: studentChoices?.eveningBagChecked ? TEXT.complete : TEXT.noRecord,
    },
    {
      label: TIMELINE_LABELS.alarm,
      status: getStatus(Boolean(studentChoices?.alarmChecked)),
      detail: displayValue(studentChoices?.selectedAlarmTime),
    },
    {
      label: TIMELINE_LABELS.wakeUp,
      status: getStatus(report.delayMinutes < 10, Boolean(studentChoices?.wakeUpChoice)),
      detail:
        report.delayMinutes >= 10
          ? `+${report.delayMinutes}m`
          : displayValue(studentChoices?.wakeUpChoice),
    },
    {
      label: TIMELINE_LABELS.morningPrep,
      status: getStatus(asArray(studentChoices?.completedMorningTasks).length >= 4),
      detail: `${asArray(studentChoices?.completedMorningTasks).length} / 4`,
    },
    {
      label: TIMELINE_LABELS.bagPacking,
      status: getStatus(missingItems.length === 0, requiredItems.length > 0 || selectedItems.length > 0),
      detail:
        missingItems.length > 0 ? missingItems.join(', ') : `${selectedItems.length}`,
    },
    {
      label: TIMELINE_LABELS.commuteStart,
      status: getStatus(Boolean(studentChoices?.hasStartedCommute)),
      detail: studentChoices?.hasStartedCommute ? TEXT.complete : TEXT.noRecord,
    },
    {
      label: TIMELINE_LABELS.busStop,
      status: getStatus(report.busOk, busDecisions.length > 0),
      detail: displayValue(studentChoices?.selectedBusNumber),
    },
    {
      label: TIMELINE_LABELS.busRide,
      status: getStatus(Boolean(studentChoices?.hasCompletedBusRide)),
      detail: studentChoices?.hasCompletedBusRide ? TEXT.complete : TEXT.noRecord,
    },
    {
      label: TIMELINE_LABELS.getOff,
      status: getStatus(report.stopOk, rideDecisions.length > 0),
      detail: displayValue(
        getBonHighleeStopDisplayName({
          stopId: studentChoices?.gotOffAtStopId,
          stopName: studentChoices?.gotOffAtStopName,
        }),
      ),
    },
    {
      label: TIMELINE_LABELS.destination,
      status: getStatus(report.destinationOk, destinationAttempts.length > 0),
      detail: displayValue(studentChoices?.selectedDestinationName),
    },
    {
      label: TIMELINE_LABELS.result,
      status: report.summary.resultType === 'success' ? 'complete' : 'review',
      detail: report.summary.displayTitle ?? TEXT.needsPractice,
    },
  ];
}

function createCoaching({ report, studentChoices }) {
  const good = [...asArray(report.summary.strengths)];
  const review = [...asArray(report.summary.reviewPoints)];
  const next = [];

  if (report.busOk) {
    good.push('\ubc84\uc2a4 \ubc88\ud638\ub97c \ud655\uc778\ud558\uba70 \uc774\ub3d9\ud560 \uc218 \uc788\uc5c8\uc2b5\ub2c8\ub2e4.');
  } else {
    review.push('\ubc84\uc2a4 \ubc88\ud638 \ud655\uc778\uc744 \ud55c \ubc88 \ub354 \uc5f0\uc2b5\ud558\uba74 \uc88b\uaca0\uc2b5\ub2c8\ub2e4.');
    next.push('\ub2e4\uc74c \uc218\uc5c5\uc5d0\uc11c\ub294 \ubc84\uc2a4 \ubc88\ud638\ub97c \uc18c\ub9ac \ub0b4\uc5b4 \ud655\uc778\ud55c \ub4a4 \uc120\ud0dd\ud558\ub3c4\ub85d \uc9c0\ub3c4\ud574 \uc8fc\uc138\uc694.');
  }

  if (report.stopOk) {
    good.push('\uc815\ub958\uc7a5 \uc774\ub984\uc744 \ubcf4\uace0 \ud558\ucc28 \uc2dc\uc810\uc744 \ud310\ub2e8\ud588\uc2b5\ub2c8\ub2e4.');
  } else {
    review.push('\ub0b4\ub9b4 \uc815\ub958\uc7a5\uacfc \ud604\uc7ac \uc815\ub958\uc7a5\uc744 \ube44\uad50\ud558\ub294 \uc5f0\uc2b5\uc774 \ud544\uc694\ud569\ub2c8\ub2e4.');
    next.push('\uc815\ub958\uc7a5 \uc774\ub984\uc744 \ub4e3\uace0 \ubaa9\ud45c \uc815\ub958\uc7a5\uacfc \uac19\uc740\uc9c0 \ube44\uad50\ud558\ub294 \uc5f0\uc2b5\uc744 \ud574 \uc8fc\uc138\uc694.');
  }

  if (report.destinationOk) {
    good.push('\ucd5c\uc885 \ubaa9\uc801\uc9c0\ub97c \uc120\ud0dd\ud558\ub294 \ud65c\ub3d9\uc5d0 \ucc38\uc5ec\ud588\uc2b5\ub2c8\ub2e4.');
  } else {
    review.push('\ubaa9\uc801\uc9c0 \uc8fc\ubcc0 \uc7a5\uc18c\ub97c \uad6c\ubd84\ud558\ub294 \uc5f0\uc2b5\uc774 \ud544\uc694\ud569\ub2c8\ub2e4.');
    next.push('\ud68c\uc0ac, \ub9c8\ud2b8, \ud559\uad50, \uc8fc\ubbfc\uc13c\ud130 \uc0ac\uc9c4 \uce74\ub4dc\ub97c \ud65c\uc6a9\ud574 \ubaa9\uc801\uc9c0 \uad6c\ubd84 \ud65c\ub3d9\uc744 \uc774\uc5b4\uac00\uba74 \uc88b\uc2b5\ub2c8\ub2e4.');
  }

  if (Number(studentChoices?.wakeUpDelayMinutes ?? 0) >= 10) {
    review.push('\uc544\uce68 \uae30\uc0c1 \ud6c4 \ubc14\ub85c \uc900\ube44\ub97c \uc2dc\uc791\ud558\ub294 \uc5f0\uc2b5\uc774 \ud544\uc694\ud569\ub2c8\ub2e4.');
    next.push('\uc54c\ub78c \ud6c4 \ubc14\ub85c \uc77c\uc5b4\ub098\ub294 \uc120\ud0dd\uacfc \ucd9c\uadfc \uc2dc\uac04\uc758 \uad00\uacc4\ub97c \ud568\uaed8 \uc774\uc57c\uae30\ud574 \uc8fc\uc138\uc694.');
  } else {
    good.push('\uc54c\ub78c \ud6c4 \uc544\uce68 \uc900\ube44 \ub2e8\uacc4\uae4c\uc9c0 \uc774\uc5b4\uc11c \uc218\ud589\ud588\uc2b5\ub2c8\ub2e4.');
  }

  if (asArray(report.missingItems).length > 0) {
    review.push('\ub0a0\uc528\uc5d0 \ub9de\ub294 \uc900\ube44\ubb3c \ud655\uc778\uc744 \ubc18\ubcf5\ud558\uba74 \uc88b\uaca0\uc2b5\ub2c8\ub2e4.');
    next.push('\uc900\ube44\ubb3c \uce74\ub4dc\ub97c \uc624\ub298 \ub0a0\uc528\uc640 \uc5f0\uacb0\ud574 \uc120\ud0dd\ud558\ub294 \ud65c\ub3d9\uc744 \uc9c0\ub3c4\ud574 \uc8fc\uc138\uc694.');
  }

  if (next.length === 0) {
    next.push('\ub2e4\uc74c \uc218\uc5c5\uc5d0\uc11c\ub294 \uac19\uc740 \ud750\ub984\uc744 \ub354 \uc790\uc5f0\uc2a4\ub7fd\uac8c \ub9d0\ub85c \uc124\uba85\ud558\uba70 \uc5f0\uc2b5\ud574 \uc8fc\uc138\uc694.');
  }

  return {
    good: [...new Set(good)].slice(0, 5),
    review: [...new Set(review)].slice(0, 5),
    next: [...new Set(next)].slice(0, 5),
  };
}

function statusClasses(status) {
  if (status === 'complete') return 'border-emerald-200 bg-emerald-50 text-emerald-800';
  if (status === 'review') return 'border-amber-200 bg-amber-50 text-amber-800';
  return 'border-slate-200 bg-slate-50 text-slate-600';
}

function statusLabel(status) {
  if (status === 'complete') return TEXT.complete;
  if (status === 'review') return TEXT.review;
  return TEXT.noRecord;
}

function SimpleList({ items, emptyText }) {
  const displayItems = items.length > 0 ? items : [emptyText];

  return (
    <ul className="mt-4 space-y-3">
      {displayItems.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="rounded-[1.25rem] bg-white px-5 py-4 text-lg font-bold leading-7 text-slate-800 shadow-sm"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function TeacherReport() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult, studentChoices } = state;
  const report = createReportData(state);
  const timeline = createTimeline({ state, report });
  const coaching = createCoaching({ report, studentChoices });
  const busStopDecisions = asArray(studentChoices?.busStopDecisions);
  const busRideDecisions = asArray(studentChoices?.busRideDecisions);
  const destinationAttempts = asArray(studentChoices?.destinationAttempts);
  const gotOffAtStopDisplayName = getBonHighleeStopDisplayName({
    stopId: studentChoices?.gotOffAtStopId,
    stopName: studentChoices?.gotOffAtStopName,
  });
  const resultTitle =
    report.summary.resultType === 'success'
      ? TEXT.success
      : report.summary.resultType === 'late'
        ? TEXT.late
        : TEXT.needsPractice;

  const summaryCards = [
    { title: TEXT.studentName, value: report.studentName },
    { title: TEXT.finalResult, value: resultTitle },
    { title: TEXT.targetArrival, value: displayValue(aiPlanInput?.arrivalTime) },
    {
      title: TEXT.actualArrival,
      value:
        report.summary.actualArrivalTime ??
        (report.delayMinutes > 0 ? `+${report.delayMinutes}m` : displayValue(aiPlanResult?.expectedArrivalTime)),
    },
    { title: TEXT.weather, value: displayValue(aiPlanInput?.weather ?? state.weather) },
    {
      title: TEXT.selectedBus,
      value: studentChoices?.selectedBusNumber
        ? `${normalizeBus(studentChoices.selectedBusNumber)}${TEXT.busSuffix}`
        : TEXT.checking,
    },
    { title: TEXT.gotOffStop, value: displayValue(gotOffAtStopDisplayName) },
    {
      title: TEXT.selectedDestination,
      value: displayValue(studentChoices?.selectedDestinationName),
    },
  ];

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border-4 border-amber-200 bg-white/90 p-6 text-center shadow-xl">
        <h1 className="text-4xl font-black text-slate-900">{TEXT.title}</h1>
        <p className="mt-2 text-xl font-bold text-slate-600">
          {TEXT.description}
        </p>
      </header>

      <section className="grid gap-4 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <InfoCard
            key={card.title}
            title={card.title}
            value={card.value}
            highlight
          />
        ))}
      </section>

      <section className="rounded-[2rem] border-4 border-sky-100 bg-white/90 p-6 shadow-xl">
        <h2 className="text-3xl font-black text-slate-950">
          {TEXT.timelineTitle}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {timeline.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className={`rounded-[1.5rem] border-4 p-4 shadow-sm ${statusClasses(item.status)}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-black">
                  {index + 1}
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-black">
                  {statusLabel(item.status)}
                </span>
              </div>
              <p className="mt-4 text-xl font-black text-slate-950">
                {item.label}
              </p>
              <p className="mt-2 break-keep text-base font-bold text-slate-700">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-[2rem] border-4 border-blue-100 bg-blue-50 p-6 shadow-xl">
          <h2 className="text-2xl font-black text-slate-950">
            {TEXT.busDecisionTitle}
          </h2>
          <SimpleList
            items={busStopDecisions.map(
              (decision) =>
                `${decision.busNumber}${TEXT.busSuffix}: ${
                  decision.action === 'ride' || decision.action === 'board'
                    ? TEXT.board
                    : TEXT.wait
                }`,
            )}
            emptyText={TEXT.noRecord}
          />
        </div>

        <div className="rounded-[2rem] border-4 border-emerald-100 bg-emerald-50 p-6 shadow-xl">
          <h2 className="text-2xl font-black text-slate-950">
            {TEXT.rideDecisionTitle}
          </h2>
          <SimpleList
            items={busRideDecisions.map(
              (decision) =>
                `${getBonHighleeStopDisplayName({
                  stopId: decision.stopId,
                  stopName: decision.stopName,
                })}: ${
                  decision.action === 'bell' ? TEXT.bell : TEXT.stay
                }`,
            )}
            emptyText={TEXT.noRecord}
          />
        </div>

        <div className="rounded-[2rem] border-4 border-amber-100 bg-amber-50 p-6 shadow-xl">
          <h2 className="text-2xl font-black text-slate-950">
            {TEXT.destinationTitle}
          </h2>
          <SimpleList
            items={destinationAttempts.map(
              (attempt) =>
                `${TEXT.selectedPlace}: ${attempt.destinationName} / ${
                  attempt.isTargetDestination ? TEXT.targetMatch : TEXT.targetReview
                }`,
            )}
            emptyText={TEXT.noRecord}
          />
        </div>
      </section>

      <section className="rounded-[2rem] border-4 border-purple-100 bg-white/90 p-6 shadow-xl">
        <h2 className="text-3xl font-black text-slate-950">
          {TEXT.coachingTitle}
        </h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <div className="rounded-[1.5rem] bg-emerald-50 p-5">
            <h3 className="text-2xl font-black text-slate-950">
              {TEXT.goodTitle}
            </h3>
            <SimpleList items={coaching.good} emptyText={TEXT.noRecord} />
          </div>
          <div className="rounded-[1.5rem] bg-amber-50 p-5">
            <h3 className="text-2xl font-black text-slate-950">
              {TEXT.reviewTitle}
            </h3>
            <SimpleList items={coaching.review} emptyText={TEXT.noRecord} />
          </div>
          <div className="rounded-[1.5rem] bg-sky-50 p-5">
            <h3 className="text-2xl font-black text-slate-950">
              {TEXT.nextTitle}
            </h3>
            <SimpleList items={coaching.next} emptyText={TEXT.noRecord} />
          </div>
        </div>
      </section>

      <div className="flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.resultScreen)}
        >
          {TEXT.resultBack}
        </PrimaryButton>
        <PrimaryButton
          onClick={() =>
            dispatch({
              type: GAME_ACTIONS.RESET_GAME_SESSION,
            })
          }
        >
          {TEXT.restart}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default TeacherReport;
