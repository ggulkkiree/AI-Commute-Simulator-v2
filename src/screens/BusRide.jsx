import { useMemo, useState } from 'react';

import PrimaryButton from '../components/PrimaryButton.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const TEXT = {
  startStop: '\ucd9c\ubc1c \uc815\ub958\uc7a5',
  marketStop: '\uc911\uc559\uc2dc\uc7a5',
  officeStop: '\ubcf8\uc564\ud558\uc774\ub9ac \uc55e',
  nextStop: '\ub2e4\uc74c \uc815\ub958\uc7a5',
  busSuffix: '\ubc88',
  companyDirection: '\ud68c\uc0ac \ubc29\ud5a5',
  chooseBusTitle: '\ubc84\uc2a4\ub97c \uba3c\uc800 \uc120\ud0dd\ud574\uc694',
  chooseBusDescription:
    '\uc815\ub958\uc7a5\uc5d0\uc11c \ud0c8 \ubc84\uc2a4\ub97c \uc120\ud0dd\ud558\uba74 \ubc84\uc2a4 \uc548 \uc7a5\uba74\uc73c\ub85c \uc774\uc5b4\uc838\uc694.',
  noBusTitle: '\uc544\uc9c1 \ud0c4 \ubc84\uc2a4\uac00 \uc5c6\uc5b4\uc694',
  noBusDescription:
    '\ubc84\uc2a4\uc815\ub958\uc7a5\uc73c\ub85c \ub3cc\uc544\uac00\uc11c \ubc84\uc2a4 \ubc88\ud638\ub97c \ud655\uc778\ud574\uc694.',
  goBusStop: '\ubc84\uc2a4\uc815\ub958\uc7a5\uc73c\ub85c \uac00\uae30',
  title: '\ubc84\uc2a4\ub97c \ud0c0\uace0 \uac00\uc694',
  description:
    '\uc815\ub958\uc7a5 \uc774\ub984\uc744 \ubcf4\uace0 \ub0b4\ub9b4 \ub54c\ub97c \uc120\ud0dd\ud574\uc694.',
  aiBubble: '\uc774\ubc88 \uc815\ub958\uc7a5 \uc774\ub984\uc744 \uc798 \ub4e4\uc5b4\uc694.',
  aiAlt: 'AI guide robot',
  aiLabel: 'AI \uc548\ub0b4',
  aiGuide:
    '\ub0b4\ub9b4 \uc815\ub958\uc7a5\uacfc \uac19\uc740\uc9c0 \ud655\uc778\ud574\uc694.',
  currentStopPrefix: '\uc774\ubc88 \uc815\ub958\uc7a5\uc740',
  askGetOff: '\uc9c0\uae08 \ub0b4\ub824\uc57c \ud560\uae4c\uc694?',
  targetStop: '\ub0b4\ub9b4 \uc815\ub958\uc7a5',
  prepareGetOff: '\uc9c0\uae08 \ub0b4\ub9b4 \uc900\ube44\ub97c \ud574\uc694',
  rememberPassed:
    '\uc9c0\ub098\uac04 \uc815\ub958\uc7a5\uc744 \uae30\uc5b5\ud574\uc694',
  keepChecking: '\uacc4\uc18d \uc815\ub958\uc7a5\uc744 \ud655\uc778\ud574\uc694',
  progressTitle: '\uc815\ub958\uc7a5 \uc9c4\ud589',
  progressDescription:
    '\uc9c0\ub098\uc628 \uc815\ub958\uc7a5, \uc774\ubc88 \uc815\ub958\uc7a5, \ub0a8\uc740 \uc815\ub958\uc7a5\uc744 \uc0b4\ud3b4\ubd10\uc694.',
  targetBadge: '\ub0b4\ub9b4 \uacf3',
  currentStopLabel: '\uc774\ubc88 \uc815\ub958\uc7a5',
  passedStopLabel: '\uc9c0\ub098\uc628 \uc815\ub958\uc7a5',
  futureStopLabel: '\ub0a8\uc740 \uc815\ub958\uc7a5',
  pressBell: '\ud558\ucc28\ubca8 \ub204\ub974\uae30',
  stayOnBus: '\ub354 \uac00\uae30',
  routeBoard: '\ubc84\uc2a4 \ub0b4\ubd80 \uc548\ub0b4\ud310',
  stopRequest: 'STOP REQUEST',
};

const BUS_STOPS = [
  { id: 'start', name: TEXT.startStop },
  { id: 'market', name: TEXT.marketStop },
  { id: 'office', name: TEXT.officeStop },
  { id: 'next', name: TEXT.nextStop },
];

const TARGET_STOP_NAME = TEXT.officeStop;
const MASCOT_IMAGE = '/images/mascot/ai_robot_guide.png';

function BusRide() {
  const { state, dispatch, goToScreen } = useGame();
  const selectedBusNumber = state.studentChoices?.selectedBusNumber;
  const savedStopIndex = state.studentChoices?.currentStopIndex ?? 0;
  const safeSavedStopIndex = Math.min(
    Math.max(savedStopIndex, 0),
    BUS_STOPS.length - 1,
  );

  const [currentStopIndex, setCurrentStopIndex] = useState(safeSavedStopIndex);
  const [busRideDecisions, setBusRideDecisions] = useState(
    state.studentChoices?.busRideDecisions ?? [],
  );

  const currentStop = BUS_STOPS[currentStopIndex];
  const targetStopIndex = BUS_STOPS.findIndex(
    (stop) => stop.name === TARGET_STOP_NAME,
  );
  const isTargetStop = currentStop.name === TARGET_STOP_NAME;
  const hasPassedTarget = targetStopIndex >= 0 && currentStopIndex > targetStopIndex;

  const busNumberText = useMemo(() => {
    if (!selectedBusNumber) return null;
    const busNumber = String(selectedBusNumber).replace(TEXT.busSuffix, '');
    return `${busNumber}${TEXT.busSuffix}`;
  }, [selectedBusNumber]);

  const saveBusRideProgress = (payload) => {
    dispatch({
      type: GAME_ACTIONS.SAVE_BUS_RIDE,
      payload,
    });
  };

  const makeDecision = (action) => ({
    stopName: currentStop.name,
    action,
    isTargetStop,
  });

  const handleStayOnBus = () => {
    const nextDecisions = [...busRideDecisions, makeDecision('stay')];
    const nextStopIndex = Math.min(currentStopIndex + 1, BUS_STOPS.length - 1);

    setBusRideDecisions(nextDecisions);
    setCurrentStopIndex(nextStopIndex);
    saveBusRideProgress({
      currentStopIndex: nextStopIndex,
      busRideDecisions: nextDecisions,
    });
  };

  const handlePressBell = () => {
    const nextDecisions = [...busRideDecisions, makeDecision('bell')];

    saveBusRideProgress({
      hasCompletedBusRide: true,
      currentStopIndex,
      busRideDecisions: nextDecisions,
      gotOffAtStopName: currentStop.name,
    });
    goToScreen(SCREEN_IDS.destinationMap);
  };

  if (!selectedBusNumber) {
    return (
      <div className="space-y-6">
        <header className="rounded-[2rem] border-4 border-amber-200 bg-white/90 p-7 text-center shadow-xl">
          <h1 className="text-4xl font-black text-slate-900">
            {TEXT.chooseBusTitle}
          </h1>
          <p className="mt-3 text-xl font-bold text-slate-600">
            {TEXT.chooseBusDescription}
          </p>
        </header>

        <section className="rounded-[2rem] border-4 border-amber-200 bg-amber-50 p-10 text-center shadow-xl">
          <p className="text-7xl" aria-hidden="true">
            BUS
          </p>
          <h2 className="mt-4 text-3xl font-black text-slate-900">
            {TEXT.noBusTitle}
          </h2>
          <p className="mt-3 text-xl font-bold text-slate-600">
            {TEXT.noBusDescription}
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <PrimaryButton onClick={() => goToScreen(SCREEN_IDS.busStop)}>
              {TEXT.goBusStop}
            </PrimaryButton>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header className="rounded-[2rem] border-4 border-amber-200 bg-white/90 p-6 text-center shadow-xl">
        <h1 className="text-4xl font-black text-slate-900">{TEXT.title}</h1>
        <p className="mt-2 text-xl font-bold text-slate-600">
          {TEXT.description}
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="flex min-h-[500px] flex-col justify-between rounded-[2rem] border-4 border-sky-200 bg-gradient-to-b from-sky-100 via-white to-blue-100 p-5 shadow-xl">
          <div className="rounded-[1.5rem] border-2 border-sky-200 bg-white/90 p-5 text-center shadow-inner">
            <p className="text-xl font-black text-slate-800">{TEXT.aiBubble}</p>
          </div>

          <div className="flex flex-1 items-center justify-center py-4">
            <img
              src={MASCOT_IMAGE}
              alt={TEXT.aiAlt}
              className="h-64 w-full object-contain"
            />
          </div>

          <div className="rounded-[1.5rem] bg-white/80 p-4 text-center">
            <p className="text-sm font-bold text-sky-600">{TEXT.aiLabel}</p>
            <p className="mt-1 text-lg font-black text-slate-800">
              {TEXT.aiGuide}
            </p>
          </div>
        </aside>

        <main className="overflow-hidden rounded-[2rem] border-4 border-blue-200 bg-gradient-to-b from-slate-200 via-blue-50 to-sky-100 p-5 shadow-xl">
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-24 rounded-[1.5rem] border-4 border-slate-300 bg-gradient-to-br from-sky-100 to-white shadow-inner"
              />
            ))}
          </div>

          <div className="mt-4 rounded-[2rem] border-4 border-amber-200 bg-white/95 p-5 shadow-xl">
            <p className="text-center text-xl font-black text-amber-700">
              {TEXT.routeBoard}
            </p>
            <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_240px]">
              <div className="rounded-[1.5rem] border-4 border-blue-200 bg-gradient-to-r from-white to-sky-50 p-6 shadow-lg">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-600 px-5 py-2 text-xl font-black text-white shadow">
                    {busNumberText}
                  </span>
                  <span className="rounded-full bg-amber-300 px-5 py-2 text-xl font-black text-amber-900 shadow">
                    {TEXT.companyDirection}
                  </span>
                </div>
                <p className="mt-5 text-2xl font-black text-slate-700">
                  {TEXT.currentStopPrefix}
                </p>
                <h2 className="mt-2 break-keep text-6xl font-black text-slate-950">
                  {currentStop.name}
                </h2>
                <p className="mt-5 text-2xl font-black text-blue-700">
                  {TEXT.askGetOff}
                </p>
              </div>

              <div className="rounded-[1.5rem] border-4 border-emerald-200 bg-emerald-50 p-5 text-center shadow-lg">
                <p className="text-lg font-black text-emerald-700">
                  {TEXT.targetStop}
                </p>
                <p className="mt-4 break-keep text-3xl font-black text-slate-900">
                  {TARGET_STOP_NAME}
                </p>
                <div className="mt-5 rounded-full bg-white px-4 py-3 text-lg font-black text-slate-700 shadow-inner">
                  {isTargetStop
                    ? TEXT.prepareGetOff
                    : hasPassedTarget
                      ? TEXT.rememberPassed
                      : TEXT.keepChecking}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[2rem] border-4 border-amber-200 bg-white/95 p-5 shadow-lg">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xl font-black text-slate-900">
                  {TEXT.progressTitle}
                </p>
                <p className="text-base font-bold text-slate-500">
                  {TEXT.progressDescription}
                </p>
              </div>
              <div className="rounded-full bg-amber-100 px-5 py-2 text-lg font-black text-amber-800">
                {currentStopIndex + 1} / {BUS_STOPS.length}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              {BUS_STOPS.map((stop, index) => {
                const isCurrent = index === currentStopIndex;
                const isPassed = index < currentStopIndex;
                const isTarget = stop.name === TARGET_STOP_NAME;

                return (
                  <div
                    key={stop.id}
                    className={[
                      'relative rounded-[1.5rem] border-4 p-4 text-center shadow-sm',
                      isCurrent
                        ? 'border-amber-400 bg-amber-100'
                        : isPassed
                          ? 'border-sky-300 bg-sky-50'
                          : 'border-slate-200 bg-white',
                    ].join(' ')}
                  >
                    {isTarget && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-black text-white shadow">
                        {TEXT.targetBadge}
                      </span>
                    )}
                    <div
                      className={[
                        'mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-black text-white shadow',
                        isCurrent
                          ? 'bg-amber-500'
                          : isPassed
                            ? 'bg-sky-500'
                            : 'bg-slate-300',
                      ].join(' ')}
                    >
                      {isPassed ? '\u2713' : index + 1}
                    </div>
                    <p className="break-keep text-lg font-black text-slate-800">
                      {stop.name}
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      {isCurrent
                        ? TEXT.currentStopLabel
                        : isPassed
                          ? TEXT.passedStopLabel
                          : TEXT.futureStopLabel}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr]">
            <PrimaryButton
              className="border-4 border-orange-200 bg-gradient-to-r from-orange-400 to-amber-400 py-6 text-2xl text-white hover:from-orange-500 hover:to-amber-500"
              onClick={handlePressBell}
            >
              {TEXT.pressBell}
            </PrimaryButton>
            <PrimaryButton
              variant="secondary"
              className="border-4 border-sky-200 bg-sky-50 py-6 text-2xl text-sky-800 hover:bg-sky-100"
              onClick={handleStayOnBus}
            >
              {TEXT.stayOnBus}
            </PrimaryButton>
          </div>
        </main>
      </section>
    </div>
  );
}

export default BusRide;
