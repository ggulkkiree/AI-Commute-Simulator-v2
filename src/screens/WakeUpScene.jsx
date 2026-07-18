import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

const wakeUpSceneImage = '/images/references/ref_wakeup_scene.png';

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

      <div className="rounded-[2.5rem] border-4 border-amber-200 bg-gradient-to-b from-amber-100 via-orange-100 to-sky-200 p-3 shadow-2xl sm:p-4 lg:p-5">
        <div className="relative">
          <div className="relative min-h-[30rem] overflow-hidden rounded-[2rem] bg-amber-100 shadow-2xl sm:min-h-[38rem] lg:aspect-[1672/941] lg:min-h-0">
            <img
              src={wakeUpSceneImage}
              alt="햇살이 들어오는 침실에서 학생이 알람을 듣고 일어나는 장면"
              className="absolute inset-0 h-full w-full object-cover object-[55%_center] lg:object-contain lg:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950/5 via-transparent to-amber-950/15 lg:hidden" />

            <div className="absolute left-4 right-4 top-4 z-10 rounded-[1.5rem] bg-amber-50/95 px-5 py-4 text-center shadow-xl backdrop-blur-sm sm:left-8 sm:right-8 sm:top-7 lg:left-[17%] lg:right-[10%] lg:top-[4%] lg:flex lg:h-[15%] lg:flex-col lg:justify-center lg:bg-transparent lg:px-8 lg:py-0 lg:shadow-none lg:backdrop-blur-none">
              <p className="text-2xl font-extrabold text-slate-950 sm:text-3xl lg:text-[clamp(1.75rem,2.4vw,2.5rem)]">
                좋은 아침이에요
              </p>
              <p className="mt-2 break-keep text-base font-bold leading-7 text-slate-600 sm:text-xl lg:mt-1 lg:text-[clamp(0.9rem,1.35vw,1.25rem)] lg:leading-7">
                알람 시간 {aiPlanResult.recommendedWakeUpTime} · 지금 선택하고 아침 준비로 가요
              </p>
            </div>
          </div>

          <aside className="relative z-10 mt-4 rounded-[1.75rem] border-2 border-sky-200 bg-white/95 p-5 text-center shadow-xl lg:absolute lg:left-[2.4%] lg:top-[23%] lg:mt-0 lg:flex lg:h-[34%] lg:w-[17.5%] lg:flex-col lg:justify-center lg:border-0 lg:bg-transparent lg:p-3 lg:shadow-none">
            <p className="text-xl font-extrabold text-sky-800 lg:text-[clamp(1rem,1.35vw,1.3rem)]">
              지금 일어나면 계획을 지키기 쉬워요.
            </p>
            <p className="mt-3 text-base font-bold leading-7 text-slate-700 lg:mt-2 lg:text-[clamp(0.8rem,1.05vw,1rem)] lg:leading-6">
              10분 더 자는 선택도 기록해 둘게요.
            </p>
          </aside>

          <div className="relative z-10 mt-4 grid gap-3 sm:grid-cols-2 lg:absolute lg:bottom-[4.5%] lg:left-[34.5%] lg:right-[32.5%] lg:mt-0">
            <PrimaryButton
              className="w-full rounded-[2rem] bg-gradient-to-r from-lime-500 to-emerald-400 py-7 text-3xl shadow-emerald-200/80 hover:from-lime-600 hover:to-emerald-500 lg:!rounded-[1.4rem] lg:!border-0 lg:!px-3 lg:!py-3 lg:!text-base xl:!text-lg"
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
              className="w-full rounded-[2rem] border-4 border-amber-200 bg-amber-50 py-7 text-3xl text-amber-800 shadow-amber-200/80 hover:bg-amber-100 lg:!rounded-[1.4rem] lg:!border-0 lg:!px-3 lg:!py-3 lg:!text-base xl:!text-lg"
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
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
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

        <div className="mt-5 flex justify-center">
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
