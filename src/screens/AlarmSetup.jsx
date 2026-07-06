import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

function hasAlarmPlan(aiPlanInput, aiPlanResult) {
  return Boolean(
    aiPlanInput?.arrivalTime &&
      aiPlanResult?.recommendedWakeUpTime &&
      aiPlanResult?.recommendedLeaveHomeTime,
  );
}

function RoomWindow() {
  return (
    <div className="relative h-36 overflow-hidden rounded-[2rem] border-4 border-amber-200 bg-gradient-to-b from-indigo-800 via-blue-700 to-purple-500 shadow-inner">
      <div className="absolute left-6 top-5 h-3 w-3 rounded-full bg-yellow-100 shadow-[48px_22px_0_0_rgba(254,249,195,0.9),116px_8px_0_0_rgba(254,249,195,0.75),188px_42px_0_0_rgba(254,249,195,0.85)]" />
      <div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-slate-950/35 to-transparent" />
      <div className="absolute bottom-5 left-8 h-8 w-16 rounded-t-full bg-indigo-950/70" />
      <div className="absolute bottom-5 right-10 h-12 w-20 rounded-t-full bg-indigo-950/60" />
    </div>
  );
}

export default function AlarmSetup() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const canShowAlarmPlan = hasAlarmPlan(aiPlanInput, aiPlanResult);

  const handleConfirmAlarm = () => {
    dispatch({
      type: GAME_ACTIONS.SAVE_ALARM_SETUP,
      payload: {
        plannedWakeUpTime: aiPlanResult.recommendedWakeUpTime,
        alarmChecked: true,
        selectedAlarmTime: aiPlanResult.recommendedWakeUpTime,
      },
    });
    goToScreen(SCREEN_IDS.sleepScene);
  };

  if (!canShowAlarmPlan) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="알람을 확인해요"
          description="먼저 AI 출근 계획을 확인해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            알람으로 확인할 시간이 아직 없어요.
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            AI 출근 계획을 확인하면 추천 기상 시간을 볼 수 있어요.
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
        eyebrow="전날 준비"
        title="알람을 켜요"
        description="AI가 추천한 시간에 일어나기로 하고 알람을 확인해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-amber-200 bg-gradient-to-br from-indigo-900 via-slate-900 to-amber-900 p-5 shadow-2xl lg:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,236,179,0.35),transparent_24%),radial-gradient(circle_at_88%_12%,rgba(147,197,253,0.24),transparent_22%)]" />

        <div className="relative grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
          <aside className="rounded-[2rem] border-4 border-blue-300 bg-gradient-to-b from-blue-100 to-sky-300 p-5 shadow-xl">
            <div className="rounded-[1.6rem] bg-white/95 p-5 text-center shadow-inner">
              <p className="text-2xl font-extrabold text-sky-800">
                AI 로봇의 안내
              </p>
              <p className="mt-3 text-xl font-bold leading-8 text-slate-700">
                내일 아침에는 이 시간에 알람이 울리게 해요.
              </p>
            </div>
            <div className="mt-7 flex flex-col items-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-slate-950 text-7xl shadow-lg">
                🤖
              </div>
              <div className="mt-5 rounded-full bg-white px-6 py-3 text-2xl font-extrabold text-blue-700 shadow-md">
                알람 설정 도우미
              </div>
            </div>
          </aside>

          <div className="rounded-[2rem] border-4 border-amber-200 bg-amber-50/95 p-5 shadow-xl lg:p-7">
            <div className="grid gap-6 xl:grid-cols-[0.48fr_0.32fr_0.2fr]">
              <div className="flex min-h-[28rem] flex-col items-center justify-center rounded-[2rem] border-4 border-blue-400 bg-gradient-to-b from-white to-sky-50 p-6 text-center shadow-inner">
                <div className="relative flex h-72 w-72 items-center justify-center rounded-full border-[1.25rem] border-blue-500 bg-amber-50 shadow-2xl">
                  <div className="absolute -top-12 left-10 h-20 w-28 rounded-full bg-yellow-300 shadow-lg" />
                  <div className="absolute -top-12 right-10 h-20 w-28 rounded-full bg-yellow-300 shadow-lg" />
                  <div className="absolute h-32 w-2 origin-bottom -translate-y-16 rounded-full bg-blue-500" />
                  <div className="absolute h-2 w-28 translate-x-12 rounded-full bg-blue-500" />
                  <div className="absolute h-8 w-8 rounded-full bg-red-500 ring-4 ring-red-200" />
                  <span className="absolute bottom-8 text-3xl font-extrabold text-slate-800">
                    ON
                  </span>
                </div>
                <p className="mt-8 text-3xl font-extrabold text-slate-700">
                  일어날 시간
                </p>
                <p className="mt-3 text-8xl font-extrabold leading-none text-slate-950">
                  {aiPlanResult.recommendedWakeUpTime}
                </p>
              </div>

              <div className="grid gap-5">
                <div className="rounded-[2rem] border-4 border-blue-300 bg-white p-6 text-center shadow-inner">
                  <p className="text-2xl font-extrabold text-slate-500">
                    알람 상태
                  </p>
                  <p className="mt-4 rounded-full bg-lime-400 px-6 py-4 text-4xl font-extrabold text-white shadow-lg">
                    켜짐
                  </p>
                </div>
                <div className="rounded-[2rem] border-4 border-amber-200 bg-white p-6">
                  <p className="text-2xl font-extrabold text-slate-500">
                    출발 시간
                  </p>
                  <p className="mt-3 text-5xl font-extrabold text-slate-950">
                    {aiPlanResult.recommendedLeaveHomeTime}
                  </p>
                  <p className="mt-4 text-xl font-bold leading-8 text-slate-600">
                    이 시간에 집에서 나가면 좋아요.
                  </p>
                </div>
                <div className="rounded-[2rem] border-4 border-amber-200 bg-white p-6">
                  <p className="text-2xl font-extrabold text-slate-500">
                    도착 목표
                  </p>
                  <p className="mt-3 text-5xl font-extrabold text-slate-950">
                    {aiPlanInput.arrivalTime}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="rounded-[2rem] border-4 border-purple-200 bg-purple-100 p-4 text-center shadow-inner">
                  <p className="text-6xl" aria-hidden="true">
                    ⏰
                  </p>
                  <p className="mt-3 text-xl font-extrabold text-purple-800">
                    알람 카드
                  </p>
                </div>
                <RoomWindow />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-7 max-w-4xl rounded-full border-4 border-yellow-200 bg-gradient-to-r from-orange-400 to-amber-300 p-3 shadow-[0_0_28px_rgba(251,191,36,0.65)]">
          <PrimaryButton
            className="w-full rounded-full bg-gradient-to-r from-orange-400 to-amber-400 py-5 text-3xl shadow-none hover:from-orange-500 hover:to-amber-500"
            onClick={handleConfirmAlarm}
          >
            이 시간에 일어나기로 했어요
          </PrimaryButton>
        </div>

        <div className="relative mt-5 flex justify-center">
          <PrimaryButton
            variant="secondary"
            className="text-lg lg:text-xl"
            onClick={() => goToScreen(SCREEN_IDS.eveningBagCheck)}
          >
            가방 확인으로 돌아가기
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
