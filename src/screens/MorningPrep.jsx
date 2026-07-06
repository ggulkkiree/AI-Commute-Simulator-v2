import { useMemo, useState } from 'react';
import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { useGame } from '../context/GameContext.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { morningActivities } from '../data/morningActivities.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const taskEmoji = {
  shower: '🚿',
  breakfast: '🍚',
  brushTeeth: '🪥',
  changeClothes: '👕',
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
            먼저 AI 출근 계획을 확인해 주세요.
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
        description="출근 전에 해야 할 일을 하나씩 확인해요."
      />

      <InfoCard
        title="오늘 출근 준비"
        value={`${aiPlanInput.arrivalTime}까지 도착하기 위해 아침 준비를 해요.`}
        description="활동 카드를 눌러 준비한 일을 확인해요."
        className="mb-6"
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          <InfoCard
            title="추천 기상 시간"
            value={aiPlanResult.recommendedWakeUpTime}
            highlight
          />
          <InfoCard
            title="추천 출발 시간"
            value={aiPlanResult.recommendedLeaveHomeTime}
            highlight
          />
        </div>

        <InfoCard>
          <p className="text-3xl font-bold text-slate-950">
            오늘 할 일
          </p>
          <p className="mt-3 text-xl leading-8 text-slate-600">
            네 가지 준비를 모두 확인하면 가방을 챙기러 갈 수 있어요.
          </p>
        </InfoCard>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {morningPrepTasks.map((task) => {
          const isCompleted = completedTaskSet.has(task.id);

          return (
            <button
              key={task.id}
              type="button"
              onClick={() => handleTaskClick(task.id)}
              className={`rounded-2xl border p-7 text-left shadow-sm transition focus:outline-none focus:ring-4 ${
                isCompleted
                  ? 'border-emerald-200 bg-emerald-50 focus:ring-emerald-100'
                  : 'border-slate-200 bg-white hover:bg-sky-50 focus:ring-sky-100'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <span
                    className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-5xl shadow-inner"
                    aria-hidden="true"
                  >
                    {taskEmoji[task.id]}
                  </span>
                  <span className="text-4xl font-bold text-slate-950">
                    {task.label}
                  </span>
                </div>
                {isCompleted ? (
                  <span className="rounded-full bg-emerald-600 px-5 py-2 text-xl font-bold text-white">
                    완료
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-5 py-2 text-xl font-bold text-slate-600">
                    확인하기
                  </span>
                )}
              </div>
            </button>
          );
        })}
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
