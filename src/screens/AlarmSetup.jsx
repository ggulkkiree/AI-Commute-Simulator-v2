import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

const mascotImage = '/images/mascot/ai_robot_guide.png';

function hasAlarmPlan(aiPlanInput, aiPlanResult) {
  return Boolean(
    aiPlanInput?.arrivalTime &&
      aiPlanResult?.recommendedWakeUpTime &&
      aiPlanResult?.recommendedLeaveHomeTime,
  );
}

function AlarmClock({ time }) {
  return (
    <div className="relative mx-auto flex h-80 w-80 items-center justify-center rounded-full border-[1.1rem] border-blue-500 bg-amber-50 shadow-2xl">
      <div className="absolute -top-12 left-12 h-20 w-28 -rotate-12 rounded-full bg-yellow-300 shadow-lg" />
      <div className="absolute -top-12 right-12 h-20 w-28 rotate-12 rounded-full bg-yellow-300 shadow-lg" />
      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="absolute h-3 w-3 rounded-full bg-amber-400"
          style={{
            transform: `rotate(${index * 30}deg) translateY(-120px)`,
          }}
        />
      ))}
      <span className="absolute h-28 w-2 origin-bottom -translate-y-14 rounded-full bg-blue-500" />
      <span className="absolute h-2 w-24 translate-x-10 rounded-full bg-blue-500" />
      <span className="absolute h-8 w-8 rounded-full bg-red-500 ring-4 ring-red-200" />
      <div className="absolute -bottom-20 rounded-[1.5rem] border-4 border-blue-300 bg-white px-8 py-4 shadow-lg">
        <p className="text-6xl font-extrabold leading-none text-slate-950">
          {time}
        </p>
      </div>
    </div>
  );
}

export default function AlarmSetup() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;

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

  if (!hasAlarmPlan(aiPlanInput, aiPlanResult)) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          eyebrow="전날 준비"
          title="알람을 확인해요"
          description="먼저 AI 추천 계획을 확인해 주세요."
        />

        <div className="mx-auto max-w-3xl rounded-[2rem] border-4 border-amber-200 bg-white/95 p-8 text-center shadow-xl">
          <p className="text-3xl font-extrabold text-slate-950">
            알람으로 확인할 시간이 아직 없어요
          </p>
          <p className="mt-4 text-2xl font-bold leading-9 text-slate-600">
            AI 추천 계획을 본 뒤 알람 시간을 확인할 수 있어요.
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
        eyebrow="전날 준비"
        title="알람을 켜요"
        description="추천 기상 시간을 확인하고, 이 시간에 일어나기로 해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-amber-200 bg-gradient-to-br from-indigo-200 via-amber-100 to-orange-100 p-5 shadow-2xl lg:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(255,244,214,0.92),transparent_18%),radial-gradient(circle_at_16%_22%,rgba(96,165,250,0.22),transparent_24%)]" />
        <div className="absolute right-10 top-10 h-24 w-24 rounded-full bg-yellow-100 shadow-[0_0_40px_rgba(254,240,138,0.7)]" />

        <div className="relative grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
          <aside className="flex flex-col justify-between rounded-[2rem] border-4 border-blue-300 bg-gradient-to-b from-blue-100 to-sky-300 p-5 shadow-xl">
            <div className="rounded-[1.7rem] bg-white/95 p-5 shadow-inner">
              <p className="text-2xl font-extrabold text-sky-800">
                이 시간에 일어나기로 해요.
              </p>
              <p className="mt-3 text-xl font-bold leading-8 text-slate-700">
                알람이 켜졌는지 확인하면 잠자기 준비가 끝나요.
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

          <div className="rounded-[2rem] border-4 border-amber-200 bg-white/90 p-5 shadow-xl lg:p-7">
            <div className="rounded-[2rem] border-4 border-amber-200 bg-gradient-to-r from-amber-100 to-orange-50 px-7 py-5 text-center shadow-inner">
              <p className="text-4xl font-extrabold text-slate-950 lg:text-5xl">
                알람 ON
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-600">
                AI 추천 기상 시간
              </p>
            </div>

            <div className="mt-7 grid gap-7 xl:grid-cols-[0.58fr_0.42fr]">
              <div className="min-h-[31rem] rounded-[2rem] border-4 border-blue-300 bg-gradient-to-b from-sky-50 to-blue-100 p-7 text-center shadow-inner">
                <div className="pt-4 pb-24">
                  <AlarmClock time={aiPlanResult.recommendedWakeUpTime} />
                </div>
                <p className="mt-10 text-3xl font-extrabold text-slate-950">
                  일어날 시간
                </p>
              </div>

              <div className="grid gap-5">
                <div className="rounded-[2rem] border-4 border-lime-200 bg-lime-50 p-6 text-center shadow-lg">
                  <p className="text-2xl font-extrabold text-slate-500">
                    알람 상태
                  </p>
                  <p className="mt-4 rounded-full bg-lime-500 px-6 py-4 text-4xl font-extrabold text-white shadow-lg">
                    켜짐
                  </p>
                </div>
                <div className="rounded-[2rem] border-4 border-sky-200 bg-white p-6 shadow-lg">
                  <p className="text-2xl font-extrabold text-slate-500">
                    집에서 출발할 시간
                  </p>
                  <p className="mt-3 text-5xl font-extrabold text-slate-950">
                    {aiPlanResult.recommendedLeaveHomeTime}
                  </p>
                </div>
                <div className="rounded-[2rem] border-4 border-amber-200 bg-white p-6 shadow-lg">
                  <p className="text-2xl font-extrabold text-slate-500">
                    도착 목표 시간
                  </p>
                  <p className="mt-3 text-5xl font-extrabold text-slate-950">
                    {aiPlanInput.arrivalTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-7 flex flex-col justify-center gap-4 sm:flex-row">
          <PrimaryButton
            variant="secondary"
            onClick={() => goToScreen(SCREEN_IDS.eveningBagCheck)}
          >
            가방 확인으로 돌아가기
          </PrimaryButton>
          <PrimaryButton onClick={handleConfirmAlarm}>
            알람 확인했어요
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
