import PrimaryButton from '../components/PrimaryButton.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const TEXT = {
  title: '\ub3c4\ucc29\ud560 \uc7a5\uc18c\ub97c \ucc3e\uc544\uc694',
  description:
    '\ubc84\uc2a4\uc5d0\uc11c \ub0b4\ub838\uc5b4\uc694. \uc774\uc81c \uac00\uc57c \ud560 \uc7a5\uc18c\ub97c \uc120\ud0dd\ud574\uc694.',
  targetLabel: '\uc624\ub298\uc758 \ubaa9\uc801\uc9c0',
  targetDestination: '\ud68c\uc0ac',
  chooseGuide: '\uc5b4\ub514\ub85c \uac00\uc57c \ud560\uae4c\uc694?',
  currentLocation: '\ud604\uc7ac \uc704\uce58',
  currentLocationValue: '\ubc84\uc2a4\uc5d0\uc11c \ub0b4\ub9b0 \uc815\ub958\uc7a5',
  aiLabel: 'AI \uc548\ub0b4',
  aiBubble:
    '\uc8fc\ubcc0 \uc7a5\uc18c\ub97c \ubcf4\uace0 \uc624\ub298 \uac00\uc57c \ud560 \uacf3\uc744 \uc120\ud0dd\ud574\uc694.',
  aiAlt: 'AI guide robot',
  routeTitle: '\uae38 \ucc3e\uae30 \ud78c\ud2b8',
  routeHint:
    '\ub0b4\ub9b0 \uc815\ub958\uc7a5\uc5d0\uc11c \ud68c\uc0ac \uac04\ud310\uc774 \ubcf4\uc774\ub294 \uacf3\uc73c\ub85c \uac00\uc694.',
  backToBusRide: '\ubc84\uc2a4 \uc548 \uc7a5\uba74\uc73c\ub85c \ub3cc\uc544\uac00\uae30',
  select: '\uc120\ud0dd\ud558\uae30',
};

const DESTINATIONS = [
  {
    id: 'company',
    name: TEXT.targetDestination,
    icon: '\ud83c\udfe2',
    description:
      '\uc624\ub298 \ucd9c\uadfc\ud560 \ubaa9\uc801\uc9c0\uc608\uc694.',
    isTargetDestination: true,
  },
  {
    id: 'mart',
    name: '\ub9c8\ud2b8',
    icon: '\ud83d\uded2',
    description:
      '\ubb3c\uac74\uc744 \uc0ac\ub294 \uac00\uac8c\uc608\uc694.',
    isTargetDestination: false,
  },
  {
    id: 'school',
    name: '\ud559\uad50',
    icon: '\ud83c\udfeb',
    description:
      '\uacf5\ubd80\ud558\ub294 \uacf3\uc774\uc5d0\uc694.',
    isTargetDestination: false,
  },
  {
    id: 'community-center',
    name: '\uc8fc\ubbfc\uc13c\ud130',
    icon: '\ud83c\udfdb',
    description:
      '\ub3d9\ub124 \uc77c\uc744 \ub3c4\uc640\uc8fc\ub294 \uacf3\uc774\uc5d0\uc694.',
    isTargetDestination: false,
  },
];

const MASCOT_IMAGE = '/images/mascot/ai_robot_guide.png';

function DestinationMap() {
  const { state, dispatch, goToScreen } = useGame();
  const selectedBusNumber = state.studentChoices?.selectedBusNumber;
  const gotOffAtStopName = state.studentChoices?.gotOffAtStopName;

  const handleSelectDestination = (destination) => {
    const previousAttempts = state.studentChoices?.destinationAttempts ?? [];

    dispatch({
      type: GAME_ACTIONS.SAVE_DESTINATION_ARRIVAL,
      payload: {
        hasReachedDestinationArea: true,
        selectedDestinationId: destination.id,
        selectedDestinationName: destination.name,
        destinationAttempts: [
          ...previousAttempts,
          {
            destinationId: destination.id,
            destinationName: destination.name,
            isTargetDestination: destination.isTargetDestination,
          },
        ],
      },
    });
    goToScreen(SCREEN_IDS.resultCutscene);
  };

  return (
    <div className="space-y-5">
      <header className="rounded-[2rem] border-4 border-amber-200 bg-white/90 p-6 text-center shadow-xl">
        <h1 className="text-4xl font-black text-slate-900">{TEXT.title}</h1>
        <p className="mt-2 text-xl font-bold text-slate-600">
          {TEXT.description}
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="flex min-h-[520px] flex-col justify-between rounded-[2rem] border-4 border-sky-200 bg-gradient-to-b from-sky-100 via-white to-blue-100 p-5 shadow-xl">
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
              {TEXT.routeHint}
            </p>
          </div>
        </aside>

        <main className="rounded-[2rem] border-4 border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-5 shadow-xl">
          <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
            <div className="rounded-[2rem] border-4 border-white bg-white/90 p-6 shadow-lg">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-emerald-500 px-5 py-2 text-xl font-black text-white shadow">
                  {TEXT.currentLocation}
                </span>
                {selectedBusNumber ? (
                  <span className="rounded-full bg-blue-100 px-5 py-2 text-lg font-black text-blue-700">
                    {selectedBusNumber}
                  </span>
                ) : null}
              </div>

              <p className="mt-5 text-2xl font-black text-slate-700">
                {gotOffAtStopName ?? TEXT.currentLocationValue}
              </p>
              <h2 className="mt-3 break-keep text-5xl font-black text-slate-950">
                {TEXT.chooseGuide}
              </h2>
            </div>

            <div className="rounded-[2rem] border-4 border-amber-200 bg-amber-50 p-6 text-center shadow-lg">
              <p className="text-lg font-black text-amber-700">
                {TEXT.targetLabel}
              </p>
              <p className="mt-4 text-5xl font-black text-slate-950">
                {TEXT.targetDestination}
              </p>
              <p className="mt-5 rounded-full bg-white px-4 py-3 text-lg font-black text-slate-700 shadow-inner">
                {TEXT.routeTitle}
              </p>
            </div>
          </div>

          <div className="relative mt-5 min-h-[420px] overflow-hidden rounded-[2rem] border-4 border-sky-200 bg-gradient-to-br from-sky-100 via-emerald-100 to-lime-100 p-5 shadow-inner">
            <div className="absolute inset-0 opacity-80">
              <div className="absolute left-1/2 top-0 h-full w-16 -translate-x-1/2 bg-white/70" />
              <div className="absolute left-0 top-1/2 h-16 w-full -translate-y-1/2 bg-white/70" />
              <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 border-l-4 border-dashed border-slate-300" />
              <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 border-t-4 border-dashed border-slate-300" />
            </div>
            <div className="absolute left-7 top-7 rounded-full bg-blue-500 px-5 py-2 text-lg font-black text-white shadow-lg">
              {TEXT.currentLocation}
            </div>
            <div className="relative z-10 grid min-h-[380px] gap-4 md:grid-cols-2 xl:grid-cols-4">
              {DESTINATIONS.map((destination) => (
                <button
                  key={destination.id}
                  type="button"
                  onClick={() => handleSelectDestination(destination)}
                  className="group flex min-h-[230px] flex-col justify-between rounded-[1.75rem] border-4 border-white bg-white/95 p-5 text-center shadow-lg transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-300 xl:even:mt-20 xl:odd:mb-20"
                >
                  <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-sky-200 bg-gradient-to-br from-white to-amber-100 text-5xl font-black text-slate-800 shadow-inner">
                    {destination.icon}
                  </span>
                  <span className="mt-4 block text-3xl font-black text-slate-950">
                    {destination.name}
                  </span>
                  <span className="mt-3 block break-keep text-lg font-bold leading-7 text-slate-600">
                    {destination.description}
                  </span>
                  <span className="mt-4 rounded-full bg-sky-100 px-4 py-2 text-base font-black text-sky-700 transition group-hover:bg-amber-200 group-hover:text-amber-900">
                    {TEXT.select}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <PrimaryButton
              variant="secondary"
              onClick={() => goToScreen(SCREEN_IDS.busRide)}
            >
              {TEXT.backToBusRide}
            </PrimaryButton>
          </div>
        </main>
      </section>
    </div>
  );
}

export default DestinationMap;
