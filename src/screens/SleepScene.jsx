import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

const sleepSceneImage = '/images/references/ref_sleep_scene.png';

function hasSleepPlan(aiPlanInput, aiPlanResult) {
  return Boolean(
    aiPlanInput?.arrivalTime &&
      aiPlanResult?.recommendedWakeUpTime &&
      aiPlanResult?.recommendedLeaveHomeTime,
  );
}

export default function SleepScene() {
  const { state, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult, studentChoices } = state;
  const studentName = state.selectedStudent?.name;
  const alarmTime =
    studentChoices?.plannedWakeUpTime ?? aiPlanResult?.recommendedWakeUpTime;

  if (!hasSleepPlan(aiPlanInput, aiPlanResult)) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          eyebrow="전날 준비"
          title="잠자기 전에 준비를 확인해요"
          description="가방과 알람을 확인하면 잠자기 화면으로 올 수 있어요."
        />

        <div className="mx-auto max-w-3xl rounded-[2rem] border-4 border-amber-200 bg-white/95 p-8 text-center shadow-xl">
          <p className="text-3xl font-extrabold text-slate-950">
            잠자기 전 준비가 아직 남았어요
          </p>
          <p className="mt-4 text-2xl font-bold leading-9 text-slate-600">
            전날 준비를 확인한 뒤 다시 와 주세요.
          </p>
          <PrimaryButton
            variant="secondary"
            className="mt-8"
            onClick={() => goToScreen(SCREEN_IDS.eveningPreparation)}
          >
            전날 준비로 돌아가기
          </PrimaryButton>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        eyebrow="전날 준비"
        title="이제 잠을 자요"
        description="알람을 맞췄어요. 아침에 알람이 울리면 일어나서 준비해요."
      />

      <div className="rounded-[2.5rem] border-4 border-amber-200 bg-gradient-to-b from-indigo-950 via-indigo-900 to-slate-950 p-3 shadow-2xl sm:p-4 lg:p-5">
        <div className="relative">
          <div className="relative min-h-[30rem] overflow-hidden rounded-[2rem] bg-indigo-950 shadow-2xl sm:min-h-[38rem] lg:aspect-[1672/941] lg:min-h-0">
            <img
              src={sleepSceneImage}
              alt="밤이 된 침실에서 학생이 편안하게 잠든 장면"
              className="absolute inset-0 h-full w-full object-cover object-[55%_center] lg:object-contain lg:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-slate-950/20 lg:hidden" />

            <div className="absolute left-4 right-4 top-4 z-10 rounded-[1.5rem] bg-amber-50/95 px-5 py-4 text-center shadow-xl backdrop-blur-sm sm:left-8 sm:right-8 sm:top-7 lg:left-[17%] lg:right-[10%] lg:top-[4%] lg:flex lg:h-[15%] lg:flex-col lg:justify-center lg:bg-transparent lg:px-8 lg:py-0 lg:shadow-none lg:backdrop-blur-none">
              <p className="text-2xl font-extrabold text-slate-950 sm:text-3xl lg:text-[clamp(1.75rem,2.4vw,2.5rem)]">
                전날 준비를 마쳤어요
              </p>
              <p className="mt-2 break-keep text-base font-bold leading-7 text-slate-600 sm:text-xl lg:mt-1 lg:text-[clamp(0.9rem,1.35vw,1.25rem)] lg:leading-7">
                알람을 맞췄어요 → 이제 잠을 자요 → 아침에 알람이 울려요
              </p>
            </div>
          </div>

          <aside className="relative z-10 mt-4 rounded-[1.75rem] border-2 border-sky-200 bg-white/95 p-5 text-center shadow-xl lg:absolute lg:left-[2.4%] lg:top-[23%] lg:mt-0 lg:flex lg:h-[34%] lg:w-[17.5%] lg:flex-col lg:justify-center lg:border-0 lg:bg-transparent lg:p-3 lg:shadow-none">
            <p className="text-xl font-extrabold text-sky-800 lg:text-[clamp(1rem,1.35vw,1.3rem)]">
              편안하게 자고 아침에 만나요.
            </p>
            <p className="mt-3 text-base font-bold leading-7 text-slate-700 lg:mt-2 lg:text-[clamp(0.8rem,1.05vw,1rem)] lg:leading-6">
              알람이 울리면 아침 준비를 시작할 거예요.
            </p>
          </aside>

          <div className="relative z-10 mt-4 grid gap-3 sm:grid-cols-2 lg:absolute lg:bottom-[4.5%] lg:left-[34.5%] lg:right-[32.5%] lg:mt-0">
            <PrimaryButton
              variant="secondary"
              className="w-full lg:!rounded-[1.4rem] lg:!border-0 lg:!bg-white/90 lg:!px-3 lg:!py-3 lg:!text-base xl:!text-lg"
              onClick={() => goToScreen(SCREEN_IDS.eveningPreparation)}
            >
              전날 준비 다시 보기
            </PrimaryButton>
            <PrimaryButton
              className="w-full lg:!rounded-[1.4rem] lg:!border-0 lg:!px-3 lg:!py-3 lg:!text-base xl:!text-lg"
              onClick={() => goToScreen(SCREEN_IDS.wakeUpScene)}
            >
              아침이 되었어요
            </PrimaryButton>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border-2 border-amber-200 bg-amber-50 p-5 text-center shadow-lg">
            <p className="text-xl font-extrabold text-slate-500">
              일어날 시간
            </p>
            <p className="mt-2 text-4xl font-extrabold text-slate-950">
              {alarmTime}
            </p>
          </div>
          <div className="rounded-[1.75rem] border-2 border-sky-200 bg-sky-50 p-5 text-center shadow-lg">
            <p className="text-xl font-extrabold text-slate-500">출발 시간</p>
            <p className="mt-2 text-4xl font-extrabold text-slate-950">
              {aiPlanResult.recommendedLeaveHomeTime}
            </p>
          </div>
          <div className="rounded-[1.75rem] border-2 border-emerald-200 bg-emerald-50 p-5 text-center shadow-lg">
            <p className="text-xl font-extrabold text-slate-500">도착 목표</p>
            <p className="mt-2 text-4xl font-extrabold text-slate-950">
              {aiPlanInput.arrivalTime}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
