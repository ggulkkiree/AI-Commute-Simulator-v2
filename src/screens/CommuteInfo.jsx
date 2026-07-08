import { useEffect, useMemo } from 'react';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { commuteConfig } from '../data/commute.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const WEATHER_OPTIONS = ['맑음', '비', '더움', '추움'];
const aiRobotGuideImage = '/images/mascot/ai_robot_guide.png';

const weatherMeta = {
  맑음: { icon: '☀️', tone: 'from-amber-100 to-yellow-50' },
  비: { icon: '☂️', tone: 'from-sky-100 to-blue-50' },
  더움: { icon: '🌀', tone: 'from-orange-100 to-amber-50' },
  추움: { icon: '🧥', tone: 'from-cyan-100 to-sky-50' },
};

const requiredItemsByWeather = {
  맑음: ['교통카드', '스마트폰', '물병'],
  비: ['교통카드', '스마트폰', '물병', '우산'],
  더움: ['교통카드', '스마트폰', '물병', '손선풍기'],
  추움: ['교통카드', '스마트폰', '물병', '겉옷'],
};

const itemEmoji = {
  교통카드: '💳',
  스마트폰: '📱',
  물병: '💧',
  우산: '☂️',
  손선풍기: '🌀',
  겉옷: '🧥',
};

function getRandomWeather() {
  return WEATHER_OPTIONS[Math.floor(Math.random() * WEATHER_OPTIONS.length)];
}

function isValidWeather(weather) {
  return WEATHER_OPTIONS.includes(weather);
}

function getRequiredItems(weather) {
  return requiredItemsByWeather[weather] ?? requiredItemsByWeather.맑음;
}

function InfoPanel({ icon, title, value, accent = 'from-white to-sky-50' }) {
  return (
    <div
      className={`rounded-[2rem] border-4 border-white/80 bg-gradient-to-br ${accent} p-5 shadow-lg`}
    >
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-inner">
          {icon}
        </span>
        <div>
          <p className="text-lg font-extrabold text-slate-500">{title}</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-950">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CommuteInfo() {
  const { state, dispatch, goToScreen } = useGame();
  const targetArrivalTime =
    state.targetArrivalTime ?? commuteConfig.defaultTargetArrivalTime;
  const weather = isValidWeather(state.weather) ? state.weather : null;
  const shownWeather = weather ?? '맑음';
  const weatherInfo = weatherMeta[shownWeather];
  const requiredItems = useMemo(
    () => getRequiredItems(shownWeather),
    [shownWeather],
  );

  useEffect(() => {
    if (isValidWeather(state.weather)) {
      return;
    }

    dispatch({
      type: GAME_ACTIONS.UPDATE_GAME_STATE,
      payload: {
        weather: getRandomWeather(),
      },
    });
  }, [dispatch, state.weather]);

  const handleStartPlan = () => {
    dispatch({
      type: GAME_ACTIONS.UPDATE_GAME_STATE,
      payload: {
        targetArrivalTime,
        weather: shownWeather,
      },
    });
    goToScreen(SCREEN_IDS.aiPlanInput);
  };

  return (
    <section className="relative left-1/2 flex min-h-[calc(100vh-3rem)] w-[calc(100vw-3rem)] -translate-x-1/2 items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-b from-sky-200 via-sky-100 to-amber-100 px-4 py-4 lg:min-h-[calc(100vh-4rem)] lg:w-[calc(100vw-5rem)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.9),transparent_18%),radial-gradient(circle_at_75%_12%,rgba(255,255,255,0.85),transparent_14%)]" />
      <div className="absolute right-0 top-20 h-[34rem] w-72 rounded-l-[5rem] bg-white/30" />
      <div className="absolute -right-12 bottom-20 h-48 w-80 rounded-[3rem] bg-yellow-400 shadow-xl">
        <div className="absolute left-8 top-8 h-14 w-24 rounded-xl bg-sky-200" />
        <div className="absolute right-8 top-8 h-14 w-24 rounded-xl bg-sky-200" />
        <div className="absolute bottom-5 left-12 h-10 w-10 rounded-full bg-slate-700" />
        <div className="absolute bottom-5 right-12 h-10 w-10 rounded-full bg-slate-700" />
      </div>
      <div className="absolute right-24 top-28 rounded-2xl border-4 border-blue-600 bg-white px-5 py-3 text-center text-2xl font-extrabold text-blue-800 shadow-lg">
        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-3xl text-white">
          🚌
        </div>
        버스
        <br />
        정류장
      </div>
      <div className="absolute left-0 top-0 h-32 w-96 rounded-br-full bg-green-600/40 blur-sm" />
      <div className="absolute right-0 top-0 h-36 w-96 rounded-bl-full bg-green-600/40 blur-sm" />

      <div className="relative grid w-full max-w-[1660px] gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="flex min-h-[680px] flex-col justify-between rounded-[2.25rem] border-4 border-blue-300 bg-gradient-to-b from-blue-100/95 to-sky-300/95 p-5 shadow-2xl">
          <div className="rounded-[1.75rem] border-2 border-dashed border-amber-200 bg-white/95 p-5 shadow-inner">
            <p className="text-2xl font-extrabold leading-9 text-slate-900">
              오늘의 출근 정보를 먼저 확인해요.
            </p>
          </div>

          <div className="mt-6 flex flex-1 items-center justify-center">
            <img
              src={aiRobotGuideImage}
              alt="AI 안내 로봇"
              className="h-64 w-full object-contain"
              draggable="false"
            />
          </div>

          <div className="rounded-full bg-white px-6 py-3 text-center text-lg font-extrabold text-blue-700 shadow-md">
            AI 출근 안내
          </div>
        </aside>

        <div className="rounded-[2.75rem] border-4 border-slate-600 bg-white/95 p-5 shadow-2xl lg:p-6">
          <div className="rounded-[2rem] border-4 border-amber-200 bg-amber-50 px-6 py-5 text-center shadow-inner">
            <h1 className="text-4xl font-extrabold leading-tight text-slate-950 lg:text-5xl">
              오늘의 출근 미션을 확인해요
            </h1>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <InfoPanel
              icon="🏢"
              title="목표 도착 시간"
              value={targetArrivalTime}
              accent="from-orange-100 to-amber-50"
            />
            <InfoPanel
              icon={weatherInfo.icon}
              title="오늘의 날씨"
              value={shownWeather}
              accent={weatherInfo.tone}
            />
            <InfoPanel
              icon="🚌"
              title="버스 정보"
              value={`${commuteConfig.busNumber}번 출근행`}
              accent="from-violet-100 to-purple-50"
            />
          </div>

          <div className="mt-5 rounded-[2rem] border-2 border-sky-200 bg-sky-50/80 p-5 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xl font-extrabold text-slate-500">
                  출근 경로 요약
                </p>
                <p className="mt-3 text-3xl font-extrabold leading-snug text-slate-950">
                  🏠 우리 집 → 🚏 정류장 → 🚌 200번 → 🏢 회사
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-white px-5 py-4 text-right shadow-sm">
                <p className="text-lg font-bold text-slate-500">
                  타는 정류장
                </p>
                <p className="text-2xl font-extrabold text-slate-900">
                  {commuteConfig.startStop}
                </p>
                <p className="mt-2 text-lg font-bold text-slate-500">
                  내리는 정류장
                </p>
                <p className="text-2xl font-extrabold text-slate-900">
                  {commuteConfig.destinationStop}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[2rem] border-2 border-amber-200 bg-amber-50 p-5 shadow-inner">
            <p className="text-xl font-extrabold text-amber-800">
              오늘 필요한 준비물
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {requiredItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border-2 border-white bg-white/90 px-4 py-4 text-center shadow-sm"
                >
                  <p className="text-4xl" aria-hidden="true">
                    {itemEmoji[item]}
                  </p>
                  <p className="mt-2 text-lg font-extrabold text-slate-950">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <PrimaryButton
              className="w-full max-w-[34rem] rounded-full py-5 text-3xl"
              onClick={handleStartPlan}
            >
              AI 출근 계획 만들기
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
