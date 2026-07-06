import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { commuteConfig } from '../data/commute.js';
import { SCREEN_IDS } from '../data/screenIds.js';

export default function CommuteInfo() {
  const { state, dispatch, goToScreen } = useGame();
  const targetArrivalTime =
    state.targetArrivalTime ?? commuteConfig.defaultTargetArrivalTime;
  const totalEstimatedMinutes =
    commuteConfig.estimatedWalkMinutes + commuteConfig.estimatedBusMinutes;
  const studentName = state.selectedStudent?.name ?? '선택한 학생';

  const handleStartPlan = () => {
    dispatch({
      type: GAME_ACTIONS.UPDATE_GAME_STATE,
      payload: {
        targetArrivalTime,
      },
    });
    goToScreen(SCREEN_IDS.aiPlanInput);
  };

  return (
    <section className="w-full">
      <ScreenHeader
        studentName={studentName}
        title="오늘의 출근 경로를 확인해요"
        description="AI 계획을 세우기 전에 목적지, 시간, 버스 정보를 먼저 살펴봅니다."
        targetArrivalTime={targetArrivalTime}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <InfoCard
          title="오늘의 목적지"
          value={commuteConfig.destinationName}
          highlight
        />
        <InfoCard title="목표 도착 시간" value={targetArrivalTime} highlight />
        <InfoCard
          title="추천 출발 시간"
          value={commuteConfig.recommendedDepartureTime}
          highlight
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <InfoCard title="이용할 버스" value={`${commuteConfig.busNumber}번`} />
        <InfoCard title="출발 정류장" value={commuteConfig.startStop} />
        <InfoCard title="도착 정류장" value={commuteConfig.destinationStop} />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-500">예상 이동 정보</p>
            <p className="mt-3 text-3xl font-bold text-slate-950">
              걷기 {commuteConfig.estimatedWalkMinutes}분 + 버스{' '}
              {commuteConfig.estimatedBusMinutes}분 = 총 {totalEstimatedMinutes}분
            </p>
            <p className="mt-3 text-lg text-slate-600">
              경로: {commuteConfig.stopList.join(' → ')}
            </p>
          </div>
          <PrimaryButton
            className="bg-slate-950 hover:bg-slate-800 focus:ring-slate-300"
            onClick={handleStartPlan}
          >
            AI 출근 계획 세우기
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
