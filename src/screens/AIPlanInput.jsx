import { useState } from 'react';
import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { commuteConfig } from '../data/commute.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const weatherOptions = ['맑음', '비', '더움', '추움'];

const weatherEmoji = {
  맑음: '☀️',
  비: '☂️',
  더움: '🌀',
  추움: '🧥',
};

function ChoiceButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      className={`min-h-28 rounded-[2rem] border-2 px-6 py-5 text-3xl font-extrabold shadow-md transition focus:outline-none focus:ring-4 lg:min-h-32 ${
        selected
          ? 'border-blue-400 bg-sky-50 text-blue-700 ring-4 ring-blue-100 focus:ring-blue-100'
          : 'border-amber-100 bg-white/90 text-slate-800 hover:-translate-y-1 hover:border-sky-200 hover:bg-sky-50 focus:ring-sky-100'
      }`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default function AIPlanInput() {
  const { state, dispatch, goToScreen } = useGame();
  const [arrivalTime, setArrivalTime] = useState(
    state.aiPlanInput?.arrivalTime ?? null,
  );
  const [weather, setWeather] = useState(state.aiPlanInput?.weather ?? null);
  const studentName = state.selectedStudent?.name;
  const canViewPlan = Boolean(arrivalTime && weather);

  const handleViewPlan = () => {
    if (!canViewPlan) {
      return;
    }

    dispatch({
      type: GAME_ACTIONS.SAVE_AI_PLAN_INPUT,
      payload: {
        arrivalTime,
        weather,
        transport: 'bus',
      },
    });
    goToScreen(SCREEN_IDS.aiPlanResult);
  };

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        title="AI에게 출근 계획 물어보기"
        description="출근 시간과 날씨를 선택하면 AI가 출근 계획을 알려줘요."
      />

      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <InfoCard className="flex min-h-full flex-col justify-between bg-gradient-to-br from-white/95 to-sky-50/90">
          <div>
            <div
              className="flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-sky-100 bg-white text-5xl shadow-inner"
              aria-hidden="true"
            >
              🤖
            </div>
            <p className="mt-6 text-4xl font-extrabold leading-tight text-slate-950">
              AI가 출근 계획을 도와줄게요
            </p>
            <p className="mt-4 text-2xl font-semibold leading-9 text-slate-600">
              도착 시간과 날씨를 고르면 추천 계획을 만들어요.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border-2 border-amber-100 bg-amber-50 p-5">
            <p className="text-xl font-extrabold text-amber-800">
              선택할 정보
            </p>
            <p className="mt-2 text-2xl font-extrabold text-slate-900">
              도착 시간 + 오늘 날씨
            </p>
          </div>
        </InfoCard>

        <div className="grid gap-6">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <InfoCard className="min-h-80">
              <div>
                <p className="text-3xl font-extrabold text-slate-950">
                  출근 도착 시간
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-600">
                  회사에 몇 시까지 도착해야 할까요?
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {commuteConfig.targetArrivalTimes.map((time) => (
                  <ChoiceButton
                    key={time}
                    label={time}
                    selected={arrivalTime === time}
                    onClick={() => setArrivalTime(time)}
                  />
                ))}
              </div>
            </InfoCard>

            <InfoCard className="min-h-80">
              <div>
                <p className="text-3xl font-extrabold text-slate-950">
                  오늘 날씨
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-600">
                  날씨에 맞게 준비할 수 있어요.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {weatherOptions.map((option) => (
                  <ChoiceButton
                    key={option}
                    label={`${weatherEmoji[option]} ${option}`}
                    selected={weather === option}
                    onClick={() => setWeather(option)}
                  />
                ))}
              </div>
            </InfoCard>
          </div>

          <InfoCard>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-3xl font-extrabold text-slate-950">
                  이동 수단 확인
                </p>
                <p className="mt-2 text-4xl font-extrabold text-sky-700">
                  버스를 타고 출근해요
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-600">
                  이번 연습에서는 버스 이용으로 고정해요.
                </p>
              </div>
              <div
                className="flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-amber-100 bg-amber-50 text-5xl shadow-inner"
                aria-hidden="true"
              >
                🚌
              </div>
            </div>
          </InfoCard>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.commuteInfo)}
        >
          이전으로
        </PrimaryButton>
        <PrimaryButton disabled={!canViewPlan} onClick={handleViewPlan}>
          AI 계획 보기
        </PrimaryButton>
      </div>
    </section>
  );
}
