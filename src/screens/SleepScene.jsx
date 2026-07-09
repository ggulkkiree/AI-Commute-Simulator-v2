import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

const mascotImage = '/images/mascot/ai_robot_guide.png';

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

      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-amber-200 bg-gradient-to-br from-indigo-300 via-blue-200 to-amber-100 p-5 shadow-2xl lg:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(254,240,138,0.8),transparent_14%),radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.55),transparent_20%)]" />
        <div className="absolute right-20 top-16 h-28 w-28 rounded-full bg-yellow-100 shadow-[0_0_40px_rgba(254,240,138,0.7)]">
          <div className="absolute -right-5 -top-2 h-28 w-28 rounded-full bg-blue-200" />
        </div>

        <div className="relative mx-auto mb-6 max-w-6xl rounded-[2rem] border-4 border-amber-200 bg-amber-50/95 px-8 py-6 text-center shadow-xl">
          <p className="text-4xl font-extrabold text-slate-950 lg:text-5xl">
            전날 준비를 마쳤어요
          </p>
          <p className="mt-3 text-2xl font-bold leading-9 text-slate-600">
            알람을 맞췄어요 → 이제 잠을 자요 → 아침에 알람이 울려요
          </p>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
          <aside className="flex flex-col justify-between rounded-[2rem] border-4 border-sky-300 bg-gradient-to-b from-sky-100 to-cyan-200 p-5 shadow-xl">
            <div className="rounded-[1.7rem] bg-white/95 p-5 shadow-inner">
              <p className="text-2xl font-extrabold text-sky-800">
                편안하게 자고 아침에 만나요.
              </p>
              <p className="mt-3 text-xl font-bold leading-8 text-slate-700">
                알람이 울리면 아침 준비를 시작할 거예요.
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

          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border-4 border-indigo-200 bg-gradient-to-b from-indigo-200 via-violet-100 to-amber-100 p-7 shadow-xl">
            <div className="absolute right-8 top-8 h-44 w-64 rounded-[2rem] border-4 border-blue-300 bg-gradient-to-b from-blue-700 to-indigo-800 shadow-inner">
              <span className="absolute left-8 top-8 h-3 w-3 rounded-full bg-yellow-100 shadow-[42px_20px_0_0_rgba(254,249,195,0.8),112px_4px_0_0_rgba(254,249,195,0.85)]" />
              <span className="absolute bottom-8 right-10 text-5xl">🌙</span>
            </div>

            <div className="absolute left-12 bottom-10 h-40 w-[34rem] rounded-t-[8rem] bg-amber-800 shadow-2xl" />
            <div className="absolute left-20 bottom-24 h-28 w-96 rounded-t-[4rem] bg-blue-800" />
            <div className="absolute left-36 bottom-32 h-32 w-32 rounded-full bg-amber-200 shadow-lg" />
            <div className="absolute left-24 bottom-16 h-28 w-[38rem] rounded-[4rem] bg-indigo-600 shadow-xl" />
            <div className="absolute left-32 bottom-20 h-16 w-[34rem] rounded-[3rem] bg-indigo-400/70" />
            <div className="absolute left-72 bottom-56 text-5xl font-extrabold text-sky-200">
              z
            </div>
            <div className="absolute left-80 bottom-64 text-4xl font-extrabold text-sky-200">
              z
            </div>
            <div className="absolute left-[31rem] bottom-72 text-3xl font-extrabold text-sky-200">
              z
            </div>
            <div className="absolute right-20 bottom-12 h-40 w-36 rounded-[1.4rem] bg-blue-700 shadow-xl">
              <div className="mx-auto mt-8 h-8 w-20 rounded-full bg-amber-300" />
              <div className="absolute -right-5 top-14 h-20 w-8 rounded-full bg-blue-800" />
            </div>
            <div className="absolute left-[33rem] bottom-32 rounded-[1.5rem] border-4 border-yellow-300 bg-amber-100 px-5 py-4 text-center shadow-lg">
              <p className="text-xl font-extrabold text-slate-600">알람</p>
              <p className="text-4xl font-extrabold text-slate-950">
                {alarmTime}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-6 grid gap-4 lg:grid-cols-3">
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

        <div className="relative mt-7 flex flex-col justify-center gap-4 sm:flex-row">
          <PrimaryButton
            variant="secondary"
            onClick={() => goToScreen(SCREEN_IDS.eveningPreparation)}
          >
            전날 준비 다시 보기
          </PrimaryButton>
          <PrimaryButton onClick={() => goToScreen(SCREEN_IDS.wakeUpScene)}>
            아침이 되었어요
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
