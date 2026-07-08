import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

const startHeroImage = '/images/start/start_screen_hero.png';

export default function StartScreen() {
  const { goToScreen } = useGame();

  return (
    <section className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-sky-100 p-0">
      <style>
        {`@keyframes startScreenFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}
      </style>

      <div
        className="relative mx-auto aspect-video max-w-none overflow-hidden"
        style={{
          width: 'min(100vw, calc(100vh * 16 / 9))',
          height: 'min(100vh, calc(100vw * 9 / 16))',
          animation: 'startScreenFade 500ms ease-out both',
        }}
      >
        <img
          src={startHeroImage}
          alt="AI 출근 시뮬레이터 시작 화면"
          className="h-full w-full select-none object-contain object-center"
          draggable="false"
        />

        <button
          type="button"
          aria-label="출근 연습 시작하기"
          onClick={() => goToScreen(SCREEN_IDS.studentSelect)}
          className="absolute left-[5.5%] top-[62%] h-[14%] w-[40%] cursor-pointer rounded-full bg-transparent transition-transform duration-200 hover:scale-[1.01] focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/80"
        />
      </div>
    </section>
  );
}
