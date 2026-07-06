import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

function hasSleepPlan(aiPlanInput, aiPlanResult) {
  return Boolean(
    aiPlanInput?.arrivalTime &&
      aiPlanResult?.recommendedWakeUpTime &&
      aiPlanResult?.recommendedLeaveHomeTime,
  );
}

function StarString() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <span className="absolute left-[12%] top-[18%] text-3xl text-yellow-200">
        ✦
      </span>
      <span className="absolute left-[44%] top-[12%] text-xl text-yellow-100">
        ✧
      </span>
      <span className="absolute right-[18%] top-[22%] text-3xl text-yellow-200">
        ✦
      </span>
      <span className="absolute right-[32%] top-[44%] text-xl text-yellow-100">
        ✧
      </span>
    </div>
  );
}

export default function SleepScene() {
  const { state, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult, studentChoices } = state;
  const studentName = state.selectedStudent?.name;
  const canShowSleepPlan = hasSleepPlan(aiPlanInput, aiPlanResult);
  const alarmTime =
    studentChoices?.plannedWakeUpTime ?? aiPlanResult?.recommendedWakeUpTime;

  if (!canShowSleepPlan) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="잠자기"
          description="먼저 전날 준비를 확인해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            잠자기 전에 준비를 확인해요.
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            가방과 알람을 확인하면 잠자기 화면으로 올 수 있어요.
          </p>
          <PrimaryButton
            variant="secondary"
            className="mt-8"
            onClick={() => goToScreen(SCREEN_IDS.eveningPreparation)}
          >
            전날 준비로 돌아가기
          </PrimaryButton>
        </InfoCard>
      </section>
    );
  }

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        eyebrow="전날 준비"
        title="이제 잠을 자요"
        description="가방과 알람을 확인했어요. 내일 아침 알람이 울릴 거예요."
      />

      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-amber-200 bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 p-5 shadow-2xl lg:p-7">
        <StarString />
        <div className="absolute right-16 top-16 h-28 w-28 rounded-full bg-yellow-100 shadow-[0_0_40px_rgba(254,240,138,0.7)]">
          <div className="absolute -right-5 -top-2 h-28 w-28 rounded-full bg-indigo-950" />
        </div>

        <div className="relative mx-auto mb-6 max-w-6xl rounded-[2rem] border-4 border-amber-200 bg-amber-50/95 px-8 py-7 shadow-[0_0_28px_rgba(251,191,36,0.35)]">
          <p className="text-center text-4xl font-extrabold text-slate-950 lg:text-5xl">
            잘 준비했어요. 이제 편안하게 자요.
          </p>
          <p className="mt-3 text-center text-2xl font-bold leading-9 text-slate-600">
            알람을 맞췄어요 → 이제 잠을 자요 → 아침에 알람이 울려요
          </p>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
          <aside className="rounded-[2rem] border-4 border-sky-300 bg-gradient-to-b from-sky-100 to-cyan-300 p-5 shadow-xl">
            <div className="min-h-48 rounded-[1.6rem] bg-white/95 p-5 shadow-inner">
              <p className="text-2xl font-extrabold text-sky-800">
                AI 로봇의 말
              </p>
              <p className="mt-4 text-xl font-bold leading-8 text-slate-700">
                내일 아침 알람이 울리면 일어나서 준비를 시작해요.
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-[2rem] border-4 border-white bg-slate-950 text-8xl shadow-lg">
                🤖
              </div>
            </div>
          </aside>

          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border-4 border-indigo-300 bg-gradient-to-b from-indigo-900 via-slate-900 to-amber-900 p-7 shadow-xl">
            <div className="absolute right-8 top-8 h-44 w-64 rounded-[2rem] border-4 border-blue-300 bg-gradient-to-b from-blue-950 to-indigo-900 shadow-inner">
              <div className="absolute left-8 top-8 h-3 w-3 rounded-full bg-yellow-100 shadow-[42px_20px_0_0_rgba(254,249,195,0.8),112px_4px_0_0_rgba(254,249,195,0.85)]" />
              <div className="absolute bottom-0 h-16 w-full rounded-b-[1.7rem] bg-slate-950/40" />
            </div>
            <div className="absolute right-16 bottom-10 h-40 w-36 rounded-[1.4rem] bg-blue-700 shadow-xl">
              <div className="mx-auto mt-8 h-8 w-20 rounded-full bg-amber-300" />
              <div className="absolute -right-5 top-14 h-20 w-8 rounded-full bg-blue-800" />
            </div>
            <div className="absolute left-16 bottom-10 h-40 w-[34rem] rounded-t-[8rem] bg-amber-900 shadow-2xl" />
            <div className="absolute left-24 bottom-24 h-28 w-96 rounded-t-[4rem] bg-blue-900" />
            <div className="absolute left-36 bottom-32 h-32 w-32 rounded-full bg-amber-200" />
            <div className="absolute left-24 bottom-16 h-28 w-[38rem] rounded-[4rem] bg-indigo-700 shadow-xl" />
            <div className="absolute left-32 bottom-20 h-16 w-[34rem] rounded-[3rem] bg-indigo-500/60" />
            <div className="absolute left-72 bottom-56 text-5xl font-extrabold text-sky-200">
              z
            </div>
            <div className="absolute left-80 bottom-64 text-4xl font-extrabold text-sky-200">
              z
            </div>
            <div className="absolute left-[31rem] bottom-72 text-3xl font-extrabold text-sky-200">
              z
            </div>
            <div className="absolute left-[34rem] bottom-32 rounded-[1.5rem] border-4 border-yellow-300 bg-amber-100 px-5 py-4 text-center shadow-lg">
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

        <div className="relative mx-auto mt-7 max-w-4xl rounded-full border-4 border-yellow-200 bg-gradient-to-r from-orange-400 to-amber-300 p-3 shadow-[0_0_28px_rgba(251,191,36,0.65)]">
          <PrimaryButton
            className="w-full rounded-full bg-gradient-to-r from-orange-400 to-amber-400 py-5 text-3xl shadow-none hover:from-orange-500 hover:to-amber-500"
            onClick={() => goToScreen(SCREEN_IDS.wakeUpScene)}
          >
            아침이 되었어요
          </PrimaryButton>
        </div>

        <div className="relative mt-5 flex justify-center">
          <PrimaryButton
            variant="secondary"
            className="text-lg lg:text-xl"
            onClick={() => goToScreen(SCREEN_IDS.eveningPreparation)}
          >
            전날 준비 다시 보기
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
