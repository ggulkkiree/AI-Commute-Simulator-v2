import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';

const morningTaskLabels = {
  shower: '샤워하기',
  breakfast: '아침 먹기',
  brushTeeth: '양치하기',
  changeClothes: '옷 입기',
};

const movementChecks = [
  {
    key: 'hasStartedCommute',
    label: '집에서 출발',
  },
  {
    key: 'hasCompletedBusRide',
    label: '버스 이동 확인',
  },
  {
    key: 'hasReachedDestinationArea',
    label: '회사 근처 도착',
  },
  {
    key: 'hasSeenResultCutscene',
    label: '결과 장면 확인',
  },
];

function displayValue(value) {
  return value || '확인 중';
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function getMissingItems(requiredItems, selectedItems) {
  return requiredItems.filter((item) => !selectedItems.includes(item));
}

function getExtraItems(requiredItems, selectedItems) {
  return selectedItems.filter((item) => !requiredItems.includes(item));
}

function createGuidancePoints({
  missingItems,
  extraItems,
  busMatched,
  morningTaskCount,
  movementComplete,
}) {
  const points = [];

  if (missingItems.length > 0) {
    points.push('준비물 확인 단계에서 빠진 물건을 다시 지도하면 좋습니다.');
  }

  if (extraItems.length > 0) {
    points.push(
      '필요하지 않은 물건도 함께 선택했습니다. 필요한 물건과 선택 물건을 구분하는 연습이 필요합니다.',
    );
  }

  if (!busMatched) {
    points.push('버스 번호를 확인하고 선택하는 연습이 필요합니다.');
  }

  if (morningTaskCount < 4) {
    points.push('아침 준비 활동 순서를 다시 확인하는 지도가 필요합니다.');
  }

  if (!movementComplete) {
    points.push('출근 이동 순서를 다시 연결해 보는 연습이 필요합니다.');
  }

  if (points.length === 0) {
    points.push('전체 출근 흐름을 안정적으로 따라갔습니다.');
  }

  return points;
}

function ChipList({ items, emptyText, tone = 'slate' }) {
  const displayItems = items.length > 0 ? items : [emptyText];
  const toneClasses = {
    slate: 'border-slate-200 bg-slate-50 text-slate-900',
    sky: 'border-sky-100 bg-sky-50 text-slate-900',
    amber: 'border-amber-100 bg-amber-50 text-slate-900',
    emerald: 'border-emerald-100 bg-emerald-50 text-slate-900',
  };
  const classes = toneClasses[tone] ?? toneClasses.slate;

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {displayItems.map((item) => (
        <span
          key={item}
          className={`rounded-2xl border px-5 py-3 text-xl font-bold ${classes}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ReportList({ items, emptyText }) {
  const displayItems = items.length > 0 ? items : [emptyText];

  return (
    <ul className="mt-4 space-y-3">
      {displayItems.map((item) => (
        <li
          key={item}
          className="rounded-2xl bg-slate-50 px-5 py-4 text-xl font-bold leading-8 text-slate-900"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function TeacherReport() {
  const { state, dispatch, goToScreen } = useGame();
  const { aiPlanInput, aiPlanResult, studentChoices, resultSummary } = state;
  const studentName = state.selectedStudent?.name ?? '학생';
  const requiredItems = asArray(aiPlanResult?.requiredItems);
  const selectedItems = asArray(studentChoices?.selectedItems);
  const completedMorningTasks = asArray(studentChoices?.completedMorningTasks);
  const missingItems = getMissingItems(requiredItems, selectedItems);
  const extraItems = getExtraItems(requiredItems, selectedItems);
  const busMatched = Boolean(
    studentChoices?.selectedBusNumber &&
      aiPlanResult?.busNumber &&
      studentChoices.selectedBusNumber === aiPlanResult.busNumber,
  );
  const morningTaskCount = completedMorningTasks.length;
  const movementComplete = movementChecks.every((item) =>
    Boolean(studentChoices?.[item.key]),
  );
  const guidancePoints = createGuidancePoints({
    missingItems,
    extraItems,
    busMatched,
    morningTaskCount,
    movementComplete,
  });

  const planCards = [
    {
      title: '목표 도착 시간',
      value: displayValue(aiPlanInput?.arrivalTime),
    },
    {
      title: '추천 기상 시간',
      value: displayValue(aiPlanResult?.recommendedWakeUpTime),
    },
    {
      title: '기록된 기상 시간',
      value: displayValue(studentChoices?.selectedAlarmTime),
    },
    {
      title: '추천 출발 시간',
      value: displayValue(aiPlanResult?.recommendedLeaveHomeTime),
    },
    {
      title: '도착 예상 시간',
      value: displayValue(aiPlanResult?.expectedArrivalTime),
    },
    {
      title: '날씨',
      value: displayValue(aiPlanInput?.weather),
    },
    {
      title: '이동 수단',
      value: displayValue(aiPlanInput?.transport ?? 'bus'),
    },
  ];

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        title="교사용 리포트"
        description="학생의 출근 시뮬레이션 선택 흐름을 확인해요."
        targetArrivalTime={aiPlanInput?.arrivalTime}
      />

      <InfoCard className="mb-6">
        <div className="grid gap-5 lg:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-slate-500">학생 이름</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">
              {studentName}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-500">결과 요약</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">
              {resultSummary?.resultTitle ?? '결과 요약 확인 중'}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-500">
              다음 지도 포인트
            </p>
            <p className="mt-2 text-2xl font-bold leading-8 text-slate-950">
              {resultSummary?.nextStep ??
                '출근 흐름을 함께 확인해 주세요.'}
            </p>
          </div>
        </div>
      </InfoCard>

      <div className="grid gap-5 xl:grid-cols-4">
        {planCards.map((card) => (
          <InfoCard
            key={card.title}
            title={card.title}
            value={card.value}
            highlight
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <InfoCard>
          <p className="text-3xl font-bold text-slate-950">준비물 확인</p>
          <div className="mt-5 space-y-5">
            <div>
              <p className="text-xl font-bold text-slate-600">추천 준비물</p>
              <ChipList
                items={requiredItems}
                emptyText="추천 준비물 없음"
                tone="sky"
              />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-600">
                학생이 챙긴 물건
              </p>
              <ChipList
                items={selectedItems}
                emptyText="선택한 물건 없음"
                tone="emerald"
              />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-600">빠진 물건</p>
              <ChipList
                items={missingItems}
                emptyText="빠진 물건 없음"
                tone="amber"
              />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-600">
                추가로 선택한 물건
              </p>
              <ChipList
                items={extraItems}
                emptyText="추가 선택 물건 없음"
              />
            </div>
          </div>
        </InfoCard>

        <InfoCard>
          <p className="text-3xl font-bold text-slate-950">버스 확인</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-sky-50 p-5">
              <p className="text-lg font-semibold text-slate-500">
                AI 추천 버스
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {aiPlanResult?.busNumber
                  ? `${aiPlanResult.busNumber}번`
                  : '확인 중'}
              </p>
            </div>
            <div className="rounded-2xl bg-sky-50 p-5">
              <p className="text-lg font-semibold text-slate-500">
                학생 선택 버스
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {studentChoices?.selectedBusNumber
                  ? `${studentChoices.selectedBusNumber}번`
                  : '확인 중'}
              </p>
            </div>
          </div>
          <p className="mt-5 rounded-2xl bg-slate-50 px-5 py-4 text-2xl font-bold leading-8 text-slate-950">
            {busMatched
              ? '추천 버스와 같은 번호를 선택했습니다.'
              : '버스 번호를 다시 확인하는 연습이 필요합니다.'}
          </p>
        </InfoCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <InfoCard>
          <p className="text-3xl font-bold text-slate-950">아침 준비 확인</p>
          <p className="mt-4 text-4xl font-bold text-slate-950">
            {morningTaskCount} / 4
          </p>
          <ChipList
            items={completedMorningTasks.map(
              (taskId) => morningTaskLabels[taskId] ?? taskId,
            )}
            emptyText="완료 기록 없음"
            tone="emerald"
          />
        </InfoCard>

        <InfoCard>
          <p className="text-3xl font-bold text-slate-950">이동 흐름 확인</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {movementChecks.map((item) => {
              const isChecked = Boolean(studentChoices?.[item.key]);

              return (
                <div
                  key={item.key}
                  className={`rounded-2xl border px-5 py-4 ${
                    isChecked
                      ? 'border-emerald-100 bg-emerald-50'
                      : 'border-amber-100 bg-amber-50'
                  }`}
                >
                  <p className="text-xl font-bold text-slate-950">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-700">
                    {isChecked ? '확인됨' : '확인 필요'}
                  </p>
                </div>
              );
            })}
          </div>
        </InfoCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <InfoCard>
          <p className="text-3xl font-bold text-slate-950">
            학생용 피드백 요약
          </p>
          {resultSummary ? (
            <div className="mt-5 grid gap-5">
              <div>
                <p className="text-xl font-bold text-slate-600">잘한 점</p>
                <ReportList
                  items={asArray(resultSummary.strengths)}
                  emptyText="학생용 잘한 점 기록이 없습니다."
                />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-600">
                  다시 확인할 점
                </p>
                <ReportList
                  items={asArray(resultSummary.reviewPoints)}
                  emptyText="다시 확인할 점이 많지 않습니다."
                />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-600">
                  내일 해볼 점
                </p>
                <p className="mt-4 rounded-2xl bg-sky-50 px-5 py-4 text-xl font-bold leading-8 text-slate-950">
                  {resultSummary.nextStep}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-5 rounded-2xl bg-slate-50 px-5 py-4 text-2xl font-bold leading-8 text-slate-900">
              학생용 결과 요약이 아직 저장되지 않았습니다.
            </p>
          )}
        </InfoCard>

        <InfoCard>
          <p className="text-3xl font-bold text-slate-950">
            교사용 지도 포인트
          </p>
          <ReportList
            items={guidancePoints}
            emptyText="전체 출근 흐름을 안정적으로 따라갔습니다."
          />
        </InfoCard>
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.resultScreen)}
        >
          결과 화면 다시 보기
        </PrimaryButton>
        <PrimaryButton
          onClick={() =>
            dispatch({
              type: GAME_ACTIONS.RESET_GAME_SESSION,
            })
          }
        >
          처음으로 돌아가기
        </PrimaryButton>
      </div>
    </section>
  );
}
