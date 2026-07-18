import { useMemo, useState } from 'react';

import PrimaryButton from '../components/PrimaryButton.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { busOptions } from '../data/busOptions.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const MASCOT_IMAGE = '/images/mascot/ai_robot_guide.png';

const TEXT = {
  chapter: '\ucd9c\uadfc\uae38 \ud310\ub2e8',
  title: '\ubc84\uc2a4\uac00 \ub3c4\ucc29\ud588\uc5b4\uc694',
  description:
    '\ubc84\uc2a4 \ubc88\ud638\ub97c \ud655\uc778\ud558\uace0 \ud0c8\uc9c0 \uae30\ub2e4\ub9b4\uc9c0 \uc120\ud0dd\ud574\uc694.',
  noPlanTitle: '\ud655\uc778\ud560 \ubc84\uc2a4 \uc815\ubcf4\uac00 \uc544\uc9c1 \uc5c6\uc5b4\uc694',
  noPlanDescription:
    'AI \ucd9c\uadfc \uacc4\ud68d\uc744 \uba3c\uc800 \ud655\uc778\ud558\uba74 \ubc84\uc2a4 \ubc88\ud638\ub97c \ubcfc \uc218 \uc788\uc5b4\uc694.',
  backPlan: 'AI \uacc4\ud68d \ub2e4\uc2dc \ubcf4\uae30',
  aiBubble:
    '\uc9c0\uae08 \uc628 \ubc84\uc2a4 \ubc88\ud638\uc640 \ud0c0\uc57c \ud560 \ubc84\uc2a4\ub97c \ube44\uad50\ud574\uc694.',
  aiLabel: 'AI \uc548\ub0b4',
  aiAlt: 'AI guide robot',
  currentBus: '\uc9c0\uae08 \uc628 \ubc84\uc2a4',
  targetBus: '\ud0c0\uc57c \ud560 \ubc84\uc2a4',
  route: '\ud68c\uc0ac \ubc29\ud5a5',
  stop: '\uc6b0\ub9ac \ub3d9\ub124 \uc815\ub958\uc7a5',
  waitCount: '\uae30\ub2e4\ub9b0 \ud69f\uc218',
  mission: '\ubc84\uc2a4 \ubc88\ud638\ub97c \ud655\uc778\ud574\uc694',
  ride: '\uc774 \ubc84\uc2a4 \ud0c0\uae30',
  wait: '\ub2e4\uc74c \ubc84\uc2a4 \uae30\ub2e4\ub9ac\uae30',
  backCommute: '\ucd9c\ubc1c \ud654\uba74\uc73c\ub85c \ub3cc\uc544\uac00\uae30',
  busSuffix: '\ubc88',
};

const busDetails = {
  200: {
    direction: TEXT.route,
    destination: '\ud68c\uc0ac \uadfc\ucc98 \uc815\ub958\uc7a5',
    color: 'from-blue-500 to-sky-400',
  },
  999: {
    direction: '\ub2e4\ub978 \ub3d9\ub124 \ubc29\ud5a5',
    destination: '\uc911\uc559\uc2dc\uc7a5 \ubc29\ud5a5',
    color: 'from-violet-500 to-purple-400',
  },
  119: {
    direction: '\ub2e4\ub978 \ubc88\ud638 \ubc84\uc2a4',
    destination: '\ub3c4\uc11c\uad00 \ubc29\ud5a5',
    color: 'from-amber-400 to-orange-400',
  },
};

function hasBusPlan(aiPlanInput, aiPlanResult) {
  return Boolean(aiPlanInput?.arrivalTime && aiPlanResult?.busNumber);
}

function normalizeBusNumber(busNumber) {
  return String(busNumber ?? '200').replace(TEXT.busSuffix, '').trim();
}

function createArrivalSequence(targetBusNumber) {
  const target = normalizeBusNumber(targetBusNumber);
  const options = busOptions.length > 0 ? busOptions : [{ busNumber: target }];
  const uniqueOptions = options.filter(
    (option, index, array) =>
      array.findIndex(
        (candidate) =>
          normalizeBusNumber(candidate.busNumber) ===
          normalizeBusNumber(option.busNumber),
      ) === index,
  );
  const otherBuses = uniqueOptions.filter(
    (option) => normalizeBusNumber(option.busNumber) !== target,
  );
  const targetBus =
    uniqueOptions.find((option) => normalizeBusNumber(option.busNumber) === target) ??
    { busNumber: target, description: TEXT.route };

  return [...otherBuses, targetBus].map((option) => ({
    ...option,
    busNumber: normalizeBusNumber(option.busNumber),
  }));
}

function BusIllustration({ busNumber, color }) {
  return (
    <div className="relative mx-auto h-64 w-full max-w-3xl lg:h-72">
      <div className="absolute inset-x-4 bottom-2 h-12 rounded-[50%] bg-slate-400/30 blur-sm" />
      <div
        className={`absolute inset-x-0 bottom-8 h-52 rounded-[2rem] bg-gradient-to-r ${color} shadow-2xl`}
      >
        <div className="absolute left-8 top-8 grid w-2/5 grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              className="h-12 rounded-xl border-2 border-white/70 bg-sky-100/80 shadow-inner"
            />
          ))}
        </div>
        <div className="absolute right-8 top-6 rounded-[1.4rem] bg-slate-900 px-8 py-4 text-5xl font-black text-yellow-300 shadow-inner">
          {busNumber}
        </div>
        <div className="absolute bottom-8 left-10 h-16 w-16 rounded-full border-[0.7rem] border-slate-800 bg-slate-200" />
        <div className="absolute bottom-8 right-10 h-16 w-16 rounded-full border-[0.7rem] border-slate-800 bg-slate-200" />
        <div className="absolute bottom-24 left-8 h-5 w-10 rounded-full bg-yellow-200" />
        <div className="absolute bottom-24 right-8 h-5 w-10 rounded-full bg-yellow-200" />
      </div>
    </div>
  );
}

function BusStop() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const targetBusNumber = normalizeBusNumber(aiPlanResult?.busNumber);
  const arrivalSequence = useMemo(
    () => createArrivalSequence(targetBusNumber),
    [targetBusNumber],
  );
  const savedIndex = state.studentChoices?.currentArrivingBusIndex ?? 0;
  const initialIndex =
    arrivalSequence.length > 0 ? savedIndex % arrivalSequence.length : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [decisions, setDecisions] = useState(
    state.studentChoices?.busStopDecisions ?? [],
  );
  const currentBus = arrivalSequence[currentIndex] ?? arrivalSequence[0];
  const currentBusNumber = normalizeBusNumber(currentBus?.busNumber);
  const currentDetails = busDetails[currentBusNumber] ?? {
    direction: currentBus?.description ?? TEXT.route,
    destination: '\ubaa9\uc801\uc9c0 \ud655\uc778',
    color: 'from-blue-500 to-sky-400',
  };
  const isTargetBusHere = currentBusNumber === targetBusNumber;

  const saveBusStopProgress = (nextDecisions, nextIndex) => {
    dispatch({
      type: GAME_ACTIONS.SAVE_BUS_SELECTION,
      payload: {
        busStopDecisions: nextDecisions,
        currentArrivingBusIndex: nextIndex,
      },
    });
  };

  const createDecision = (action) => ({
    busNumber: currentBusNumber,
    action,
    isTargetBus: currentBusNumber === targetBusNumber,
  });

  const handleWaitForNextBus = () => {
    const nextIndex = (currentIndex + 1) % arrivalSequence.length;
    const nextDecisions = [...decisions, createDecision('wait')];

    setDecisions(nextDecisions);
    setCurrentIndex(nextIndex);
    saveBusStopProgress(nextDecisions, nextIndex);
  };

  const handleRideCurrentBus = () => {
    const nextDecisions = [...decisions, createDecision('ride')];

    dispatch({
      type: GAME_ACTIONS.SAVE_BUS_SELECTION,
      payload: {
        selectedBusNumber: currentBusNumber,
        busStopDecisions: nextDecisions,
        currentArrivingBusIndex: currentIndex,
      },
    });
    goToScreen(SCREEN_IDS.busRide);
  };

  if (!hasBusPlan(aiPlanInput, aiPlanResult)) {
    return (
      <div className="space-y-6">
        <header className="rounded-[2rem] border-4 border-amber-200 bg-white/90 p-7 text-center shadow-xl">
          <p className="text-lg font-black text-amber-700">{TEXT.chapter}</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">
            {TEXT.noPlanTitle}
          </h1>
          <p className="mt-3 text-xl font-bold text-slate-600">
            {TEXT.noPlanDescription}
          </p>
        </header>
        <div className="mx-auto max-w-md">
          <PrimaryButton onClick={() => goToScreen(SCREEN_IDS.aiPlanResult)}>
            {TEXT.backPlan}
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header className="rounded-[2rem] border-4 border-amber-200 bg-white/90 p-6 text-center shadow-xl">
        <p className="text-lg font-black text-amber-700">{TEXT.chapter}</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">{TEXT.title}</h1>
        <p className="mt-2 text-xl font-bold text-slate-600">
          {TEXT.description}
        </p>
      </header>

      <section className="relative overflow-hidden rounded-[2.5rem] border-4 border-sky-200 bg-gradient-to-b from-sky-200 via-sky-50 to-emerald-100 p-5 shadow-2xl">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-slate-300/70" />
        <div className="absolute bottom-16 left-0 right-0 h-3 bg-yellow-300/80" />
        <div className="relative grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="flex min-h-[520px] flex-col justify-between rounded-[2rem] border-4 border-white bg-white/85 p-5 shadow-xl">
            <div className="rounded-[1.5rem] border-2 border-sky-200 bg-sky-50 p-5 text-center shadow-inner">
              <p className="text-xl font-black text-slate-800">{TEXT.aiBubble}</p>
            </div>
            <div className="flex flex-1 items-end justify-center py-4">
              <img
                src={MASCOT_IMAGE}
                alt={TEXT.aiAlt}
                className="h-64 w-full object-contain"
              />
            </div>
            <div className="rounded-[1.5rem] bg-blue-50 p-4 text-center">
              <p className="text-sm font-bold text-blue-600">{TEXT.aiLabel}</p>
              <p className="mt-1 text-lg font-black text-slate-800">
                {TEXT.mission}
              </p>
            </div>
          </aside>

          <section className="rounded-[2rem] border-4 border-white bg-white/90 p-5 shadow-xl">
            <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
              <div
                className={[
                  'rounded-[2rem] border-4 bg-gradient-to-b from-white to-amber-50 p-5 text-center shadow-inner transition-all duration-200 ease-out',
                  isTargetBusHere
                    ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-100'
                    : 'border-amber-200',
                ].join(' ')}
              >
                {isTargetBusHere ? (
                  <div className="mx-auto mb-3 w-fit rounded-full bg-blue-500 px-5 py-2 text-lg font-black text-white shadow">
                    {TEXT.targetBus}
                  </div>
                ) : null}
                <p className="text-2xl font-black text-slate-700">
                  {TEXT.currentBus}
                </p>
                <BusIllustration
                  busNumber={currentBusNumber}
                  color={currentDetails.color}
                />
                <p className="mt-1 text-7xl font-black text-slate-950">
                  {currentBusNumber}
                  {TEXT.busSuffix}
                </p>
                <p className="mt-3 text-3xl font-black text-slate-700">
                  {currentDetails.direction}
                </p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.75rem] border-4 border-blue-200 bg-blue-50 p-5 text-center shadow-lg ring-4 ring-blue-100">
                  <p className="mx-auto w-fit rounded-full bg-blue-600 px-4 py-2 text-base font-black text-white">
                    {TEXT.targetBus}
                  </p>
                  <p className="mt-3 text-5xl font-black text-slate-950">
                    {targetBusNumber}
                    {TEXT.busSuffix}
                  </p>
                </div>
                <div className="rounded-[1.75rem] border-4 border-emerald-200 bg-emerald-50 p-5 shadow-lg">
                  <p className="w-fit rounded-full bg-emerald-500 px-4 py-2 text-base font-black text-white">
                    {TEXT.stop}
                  </p>
                  <p className="mt-2 break-keep text-xl font-bold text-slate-700">
                    {currentDetails.destination}
                  </p>
                </div>
                <div className="rounded-[1.75rem] border-4 border-amber-200 bg-amber-50 p-5 text-center shadow-lg">
                  <p className="mx-auto w-fit rounded-full bg-amber-300 px-4 py-2 text-base font-black text-amber-900">
                    {TEXT.waitCount}
                  </p>
                  <p className="mt-2 text-5xl font-black text-slate-950">
                    {decisions.filter((decision) => decision.action === 'wait').length}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="relative mt-5 grid gap-4 md:grid-cols-2">
          <PrimaryButton
            className="cursor-pointer py-6 text-2xl transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-blue-200"
            onClick={handleRideCurrentBus}
          >
            {TEXT.ride}
          </PrimaryButton>
          <PrimaryButton
            variant="secondary"
            className="cursor-pointer border-4 border-amber-200 bg-amber-50 py-6 text-2xl text-amber-800 transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-amber-100 hover:shadow-xl active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-blue-200"
            onClick={handleWaitForNextBus}
          >
            {TEXT.wait}
          </PrimaryButton>
        </div>

        <div className="relative mt-4 flex justify-center">
          <PrimaryButton
            variant="secondary"
            className="cursor-pointer text-base transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-blue-200 lg:text-lg"
            onClick={() => goToScreen(SCREEN_IDS.commuteScreen)}
          >
            {TEXT.backCommute}
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
}

export default BusStop;
