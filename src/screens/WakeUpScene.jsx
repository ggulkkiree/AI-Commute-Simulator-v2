import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { SCREEN_IDS } from '../data/screenIds.js';

function hasWakeUpPlan(aiPlanInput, aiPlanResult) {
  return Boolean(
    aiPlanInput?.arrivalTime &&
      aiPlanResult?.recommendedWakeUpTime &&
      aiPlanResult?.recommendedLeaveHomeTime,
  );
}

function SunWindow() {
  return (
    <div className="absolute right-8 top-8 h-48 w-72 overflow-hidden rounded-[2rem] border-4 border-sky-200 bg-gradient-to-b from-sky-300 to-sky-100 shadow-inner">
      <div className="absolute right-10 top-8 h-20 w-20 rounded-full bg-yellow-200 shadow-[0_0_35px_rgba(250,204,21,0.85)]" />
      <div className="absolute bottom-8 left-8 h-16 w-24 rounded-t-full bg-green-300" />
      <div className="absolute bottom-6 right-12 h-20 w-28 rounded-t-full bg-green-200" />
      <div className="absolute left-10 top-10 h-8 w-20 rounded-full bg-white/80" />
    </div>
  );
}

export default function WakeUpScene() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const canShowWakeUpPlan = hasWakeUpPlan(aiPlanInput, aiPlanResult);

  const saveWakeUpChoice = ({ choice, delayMinutes }) => {
    dispatch({
      type: GAME_ACTIONS.SAVE_WAKE_UP_CHOICE,
      payload: {
        selectedAlarmTime: aiPlanResult.recommendedWakeUpTime,
        wakeUpChoice: choice,
        wakeUpDelayMinutes: delayMinutes,
      },
    });
    goToScreen(SCREEN_IDS.morningPrep);
  };

  if (!canShowWakeUpPlan) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="아침이 되었어요"
          description="먼저 AI 출근 계획을 확인해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            아침 준비 정보가 아직 없어요.
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            AI 출근 계획을 확인하면 아침 준비를 시작할 수 있어요.
          </p>
          <PrimaryButton
            variant="secondary"
            className="mt-8"
            onClick={() => goToScreen(SCREEN_IDS.aiPlanResult)}
          >
            AI 계획 화면으로 돌아가기
          </PrimaryButton>
        </InfoCard>
      </section>
    );
  }

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        eyebrow="아침 시작"
        title="알람이 울렸어요"
        description="이제 일어날까요, 아니면 10분만 더 잘까요?"
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-amber-200 bg-gradient-to-br from-orange-100 via-amber-50 to-sky-200 p-5 shadow-2xl lg:p-7">
        <div className="relative mx-auto mb-6 max-w-6xl rounded-[2rem] border-4 border-amber-200 bg-amber-50/95 px-8 py-7 shadow-[0_0_28px_rgba(251,191,36,0.35)]">
          <p className="text-center text-4xl font-extrabold text-slate-950 lg:text-5xl">
            좋은 아침이에요. 알람이 울리고 있어요!
          </p>
          <p className="mt-3 text-center text-2xl font-bold leading-9 text-slate-600">
            지금 선택은 나중에 결과와 리포트에서 돌아볼 수 있어요.
          </p>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
          <aside className="rounded-[2rem] border-4 border-sky-300 bg-gradient-to-b from-cyan-100 to-sky-300 p-5 shadow-xl">
            <div className="min-h-48 rounded-[1.6rem] bg-white/95 p-5 shadow-inner">
              <p className="text-2xl font-extrabold text-sky-800">
                AI 로봇의 말
              </p>
              <p className="mt-4 text-xl font-bold leading-8 text-slate-700">
                알람 시간이에요. 준비를 시작하면 출근 계획을 지키기 쉬워요.
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-[2rem] border-4 border-white bg-slate-950 text-8xl shadow-lg">
                🤖
              </div>
            </div>
          </aside>

          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border-4 border-amber-200 bg-gradient-to-b from-yellow-100 via-orange-100 to-amber-200 p-7 shadow-xl">
            <SunWindow />
            <div className="absolute right-20 bottom-10 h-40 w-36 rounded-[1.4rem] bg-blue-700 shadow-xl">
              <div className="mx-auto mt-8 h-8 w-20 rounded-full bg-amber-300" />
              <div className="absolute -right-5 top-14 h-20 w-8 rounded-full bg-blue-800" />
            </div>
            <div className="absolute left-16 bottom-10 h-40 w-[34rem] rounded-t-[8rem] bg-amber-900 shadow-2xl" />
            <div className="absolute left-24 bottom-24 h-28 w-96 rounded-t-[4rem] bg-blue-800" />
            <div className="absolute left-40 bottom-40 h-32 w-32 rounded-full bg-amber-200 shadow-lg" />
            <div className="absolute bottom-[4.5rem] left-28 h-28 w-[38rem] rounded-[4rem] bg-indigo-500 shadow-xl" />
            <div className="absolute left-52 bottom-64 rotate-12 text-5xl font-extrabold text-yellow-500">
              ♪
            </div>
            <div className="absolute left-[31rem] bottom-60 -rotate-12 text-5xl font-extrabold text-blue-500">
              ♪
            </div>
            <div className="absolute bottom-[8.5rem] left-[34rem] rounded-[1.5rem] border-4 border-yellow-300 bg-amber-100 px-5 py-4 text-center shadow-lg">
              <p className="text-xl font-extrabold text-slate-600">알람</p>
              <p className="text-4xl font-extrabold text-slate-950">
                {aiPlanResult.recommendedWakeUpTime}
              </p>
            </div>
            <div className="absolute left-[34rem] bottom-60 h-20 w-20 animate-pulse rounded-full border-4 border-yellow-300 bg-yellow-200/60" />
            <div className="absolute left-[36rem] bottom-[17rem] text-5xl">
              ⏰
            </div>
          </div>
        </div>

        <div className="relative mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border-2 border-amber-200 bg-white/90 p-5 text-center shadow-lg">
            <p className="text-xl font-extrabold text-slate-500">
              알람 시간
            </p>
            <p className="mt-2 text-4xl font-extrabold text-slate-950">
              {aiPlanResult.recommendedWakeUpTime}
            </p>
          </div>
          <div className="rounded-[1.75rem] border-2 border-sky-200 bg-white/90 p-5 text-center shadow-lg">
            <p className="text-xl font-extrabold text-slate-500">출발 시간</p>
            <p className="mt-2 text-4xl font-extrabold text-slate-950">
              {aiPlanResult.recommendedLeaveHomeTime}
            </p>
          </div>
          <div className="rounded-[1.75rem] border-2 border-emerald-200 bg-white/90 p-5 text-center shadow-lg">
            <p className="text-xl font-extrabold text-slate-500">도착 목표</p>
            <p className="mt-2 text-4xl font-extrabold text-slate-950">
              {aiPlanInput.arrivalTime}
            </p>
          </div>
        </div>

        <div className="relative mt-7 grid gap-5 lg:grid-cols-2">
          <PrimaryButton
            className="rounded-[2rem] bg-gradient-to-r from-lime-500 to-emerald-400 py-7 text-3xl shadow-emerald-200/80 hover:from-lime-600 hover:to-emerald-500"
            onClick={() =>
              saveWakeUpChoice({
                choice: 'wake_up_now',
                delayMinutes: 0,
              })
            }
          >
            일어나서 준비하기
          </PrimaryButton>
          <PrimaryButton
            variant="secondary"
            className="rounded-[2rem] border-4 border-amber-200 bg-amber-50 py-7 text-3xl text-amber-800 shadow-amber-200/80 hover:bg-amber-100"
            onClick={() =>
              saveWakeUpChoice({
                choice: 'sleep_10_more',
                delayMinutes: 10,
              })
            }
          >
            10분 더 자기
          </PrimaryButton>
        </div>

        <div className="relative mt-5 flex justify-center">
          <PrimaryButton
            variant="secondary"
            className="text-lg lg:text-xl"
            onClick={() => goToScreen(SCREEN_IDS.sleepScene)}
          >
            잠자기 화면으로 돌아가기
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
