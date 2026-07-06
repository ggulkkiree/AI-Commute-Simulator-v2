import { useMemo, useState } from 'react';
import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { morningActivities } from '../data/morningActivities.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const taskMeta = {
  shower: {
    emoji: '🚿',
    label: '샤워하기',
    description: '상쾌하게 하루를 시작해요.',
  },
  breakfast: {
    emoji: '🍚',
    label: '아침 먹기',
    description: '든든하게 힘을 채워요.',
  },
  brushTeeth: {
    emoji: '🪥',
    label: '양치하기',
    description: '깨끗하게 준비해요.',
  },
  changeClothes: {
    emoji: '👕',
    label: '옷 입기',
    description: '출근할 옷으로 갈아입어요.',
  },
};

const morningPrepTasks = morningActivities.filter(
  (activity) => activity.id !== 'packBag',
);

function hasMorningPrepPlan(aiPlanInput, aiPlanResult) {
  return Boolean(
    aiPlanInput?.arrivalTime &&
      aiPlanResult?.recommendedWakeUpTime &&
      aiPlanResult?.recommendedLeaveHomeTime,
  );
}

export default function MorningPrep() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult } = state;
  const studentName = state.selectedStudent?.name;
  const canShowMorningPrep = hasMorningPrepPlan(aiPlanInput, aiPlanResult);
  const savedCompletedTasks =
    state.studentChoices?.completedMorningTasks ?? [];
  const [completedTasks, setCompletedTasks] = useState(savedCompletedTasks);

  const completedTaskSet = useMemo(
    () => new Set(completedTasks),
    [completedTasks],
  );
  const allTasksCompleted = morningPrepTasks.every((task) =>
    completedTaskSet.has(task.id),
  );

  const saveCompletedTasks = (nextTasks) => {
    dispatch({
      type: GAME_ACTIONS.SAVE_MORNING_PREP,
      payload: {
        completedMorningTasks: nextTasks,
      },
    });
  };

  const handleTaskClick = (taskId) => {
    if (completedTaskSet.has(taskId)) {
      return;
    }

    const nextTasks = [...completedTasks, taskId];
    setCompletedTasks(nextTasks);
    saveCompletedTasks(nextTasks);
  };

  const handleGoToBagPacking = () => {
    if (!allTasksCompleted) {
      return;
    }

    saveCompletedTasks(completedTasks);
    goToScreen(SCREEN_IDS.bagPacking);
  };

  if (!canShowMorningPrep) {
    return (
      <section className="w-full">
        <ScreenHeader
          studentName={studentName}
          title="아침 준비하기"
          description="먼저 AI 출근 계획을 확인해 주세요."
        />

        <InfoCard className="mx-auto max-w-3xl text-center">
          <p className="text-3xl font-bold text-slate-950">
            아침 준비 정보가 아직 없어요
          </p>
          <p className="mt-4 text-2xl leading-9 text-slate-600">
            AI 출근 계획을 확인한 뒤 아침 활동을 볼 수 있어요.
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
        title="아침 준비하기"
        description="출근 전에 해야 할 일을 하나씩 완료해요."
        targetArrivalTime={aiPlanInput.arrivalTime}
      />

      <InfoCard className="mb-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-3xl font-extrabold text-slate-950 lg:text-4xl">
              출근 전 아침 준비를 해요.
            </p>
            <p className="mt-3 text-2xl font-semibold leading-9 text-slate-600">
              준비를 하나씩 눌러 완료해요.
            </p>
          </div>
          <div className="rounded-[1.75rem] border-2 border-sky-100 bg-sky-50 px-6 py-4 text-2xl font-extrabold text-sky-800">
            {completedTasks.length} / {morningPrepTasks.length} 완료
          </div>
        </div>
      </InfoCard>

      <div className="grid gap-5 lg:grid-cols-2">
        {morningPrepTasks.map((task) => {
          const isCompleted = completedTaskSet.has(task.id);
          const meta = taskMeta[task.id] ?? {
            emoji: '☀️',
            label: task.label,
            description: '준비를 완료해요.',
          };

          return (
            <button
              key={task.id}
              type="button"
              onClick={() => handleTaskClick(task.id)}
              className={`rounded-[2rem] border-2 p-7 text-left shadow-lg transition focus:outline-none focus:ring-4 ${
                isCompleted
                  ? 'border-blue-400 bg-sky-50 ring-4 ring-blue-100 focus:ring-blue-100'
                  : 'border-amber-100 bg-white/90 shadow-amber-100/60 hover:-translate-y-0.5 hover:bg-amber-50 focus:ring-amber-100'
              }`}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-5">
                  <span
                    className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.75rem] bg-white text-6xl shadow-inner"
                    aria-hidden="true"
                  >
                    {meta.emoji}
                  </span>
                  <span>
                    <span className="block text-4xl font-extrabold text-slate-950">
                      {meta.label}
                    </span>
                    <span className="mt-3 block text-xl font-semibold leading-8 text-slate-600">
                      {meta.description}
                    </span>
                  </span>
                </div>
                <span
                  className={`shrink-0 rounded-full px-5 py-2 text-xl font-extrabold ${
                    isCompleted
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isCompleted ? '✓ 완료' : '누르기'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <InfoCard
          title="추천 기상 시간"
          value={aiPlanResult.recommendedWakeUpTime}
          description="이 시간에 일어나 준비를 시작해요."
          highlight
        />
        <InfoCard
          title="추천 출발 시간"
          value={aiPlanResult.recommendedLeaveHomeTime}
          description="준비가 끝나면 가방을 챙기고 출발해요."
          highlight
        />
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.wakeUpScene)}
        >
          기상 화면으로 돌아가기
        </PrimaryButton>
        <PrimaryButton
          disabled={!allTasksCompleted}
          onClick={handleGoToBagPacking}
        >
          가방 챙기러 가기
        </PrimaryButton>
      </div>
    </section>
  );
}
