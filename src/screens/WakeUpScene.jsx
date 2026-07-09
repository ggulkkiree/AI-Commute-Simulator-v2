import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

const mascotImage = '/images/mascot/ai_robot_guide.png';

function hasWakeUpPlan(aiPlanInput, aiPlanResult) {
  return Boolean(
    aiPlanInput?.arrivalTime &&
      aiPlanResult?.recommendedWakeUpTime &&
      aiPlanResult?.recommendedLeaveHomeTime,
  );
}

export default function WakeUpScene() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;

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

  if (!hasWakeUpPlan(aiPlanInput, aiPlanResult)) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          eyebrow="아침 시작"
          title="아침 준비 정보를 확인해요"
          description="먼저 AI 추천 계획을 확인해 주세요."
        />

        <div className="mx-auto max-w-3xl rounded-[2rem] border-4 border-amber-200 bg-white/95 p-8 text-center shadow-xl">
          <p className="text-3xl font-extrabold text-slate-950">
            아침 준비 정보가 아직 없어요
          </p>
          <p className="mt-4 text-2xl font-bold leading-9 text-slate-600">
            AI 추천 계획을 본 뒤 아침 준비를 시작할 수 있어요.
          </p>
          <PrimaryButton
            variant="secondary"
            className="mt-8"
            onClick={() => goToScreen(SCREEN_IDS.aiPlanResult)}
          >
            AI 계획 다시 보기
          </PrimaryButton>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        eyebrow="아침 시작"
        title="알람이 울렸어요"
        description="이제 일어나서 준비할까요? 아니면 10분만 더 잘까요?"
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-amber-200 bg-gradient-to-br from-yellow-100 via-orange-50 to-sky-200 p-5 shadow-2xl lg:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(250,204,21,0.7),transparent_14%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.65),transparent_20%)]" />
        <div className="absolute right-16 top-16 h-28 w-28 rounded-full bg-yellow-200 shadow-[0_0_45px_rgba(250,204,21,0.85)]" />

        <div className="relative mx-auto mb-6 max-w-6xl rounded-[2rem] border-4 border-amber-200 bg-amber-50/95 px-8 py-6 text-center shadow-xl">
          <p className="text-4xl font-extrabold text-slate-950 lg:text-5xl">
            좋은 아침이에요
          </p>
          <p className="mt-3 text-2xl font-bold leading-9 text-slate-600">
            알람 시간 {aiPlanResult.recommendedWakeUpTime} · 지금 선택하고 아침 준비로 가요
          </p>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
          <aside className="flex flex-col justify-between rounded-[2rem] border-4 border-sky-300 bg-gradient-to-b from-cyan-100 to-sky-300 p-5 shadow-xl">
            <div className="rounded-[1.7rem] bg-white/95 p-5 shadow-inner">
              <p className="text-2xl font-extrabold text-sky-800">
                지금 일어나면 계획을 지키기 쉬워요.
              </p>
              <p className="mt-3 text-xl font-bold leading-8 text-slate-700">
                10분 더 자는 선택도 기록해 둘게요.
              </p>
            </div>
            <div className="mt-6 flex h-56 items-end justify-center">
              <img
                src={mascotImage}
                alt="AI 안내 로봇"
                className="h-full w-full object-contain"
              />
            </div>
          </aside>

          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border-4 border-amber-200 bg-gradient-to-b from-yellow-100 via-orange-100 to-sky-100 p-7 shadow-xl">
            <div className="absolute right-8 top-8 h-48 w-72 overflow-hidden rounded-[2rem] border-4 border-sky-200 bg-gradient-to-b from-sky-300 to-sky-100 shadow-inner">
              <div className="absolute right-10 top-8 h-20 w-20 rounded-full bg-yellow-200 shadow-[0_0_35px_rgba(250,204,21,0.85)]" />
              <div className="absolute bottom-8 left-8 h-16 w-24 rounded-t-full bg-green-300" />
              <div className="absolute bottom-6 right-12 h-20 w-28 rounded-t-full bg-green-200" />
              <div className="absolute left-10 top-10 h-8 w-20 rounded-full bg-white/80" />
            </div>

            <div className="absolute left-12 bottom-10 h-40 w-[34rem] rounded-t-[8rem] bg-amber-800 shadow-2xl" />
            <div className="absolute left-20 bottom-24 h-28 w-96 rounded-t-[4rem] bg-blue-800" />
            <div className="absolute left-40 bottom-40 h-32 w-32 rounded-full bg-amber-200 shadow-lg" />
            <div className="absolute left-24 bottom-16 h-28 w-[38rem] rounded-[4rem] bg-indigo-500 shadow-xl" />
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
                choice: 'wake-up-now',
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
                choice: 'sleep-10-more',
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
