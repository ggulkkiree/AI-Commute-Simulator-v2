import { CORE_SCREEN_FLOW, SCREEN_IDS } from '../data/screenIds.js';
import { useGame } from '../context/GameContext.jsx';

function getNextScreenId(currentScreen) {
  const currentIndex = CORE_SCREEN_FLOW.indexOf(currentScreen);

  if (currentIndex < 0 || currentIndex === CORE_SCREEN_FLOW.length - 1) {
    return SCREEN_IDS.studentSelect;
  }

  return CORE_SCREEN_FLOW[currentIndex + 1];
}

export default function ScreenPlaceholder({ title, description }) {
  const { state, goToScreen } = useGame();
  const nextScreenId = getNextScreenId(state.currentScreen);
  const isLastScreen = state.currentScreen === CORE_SCREEN_FLOW.at(-1);

  return (
    <section className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="mb-3 text-sm font-medium text-slate-500">core placeholder</p>
      <h1 className="text-2xl font-semibold text-slate-950">{title}</h1>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
      <button
        type="button"
        className="mt-8 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        onClick={() => goToScreen(nextScreenId)}
      >
        {isLastScreen ? '처음 화면으로 이동' : '다음 화면으로 이동'}
      </button>
    </section>
  );
}
