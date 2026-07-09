# V1 to V2 Recovery Plan

## 1. 목적

이 문서는 v1 분석 결과와 v2 공식 `STORYBOARD.md`의 0~23단계 흐름을 기준으로, v2에 복구해야 할 핵심 시뮬레이션 기능을 정리한다.

중요한 방향은 **v1로 되돌아가는 것**이 아니다. v2의 React 화면 구조, Tailwind 디자인 톤, 현재 screen flow를 유지하면서 v1에 있던 좋은 판단 로직만 선별적으로 복구한다.

복구 우선순위는 다음 기준으로 정한다.

- 학생이 실제 출근 하루를 경험하고 판단하는 데 필요한가
- 교사가 수업 후 학생의 선택 과정을 설명할 수 있는가
- v2 공식 스토리보드의 자연스러운 원인과 결과 흐름을 강화하는가
- 학생 화면에 level, 가/나/다, 수준명 같은 표현을 노출하지 않는가
- 오답/실패를 채점처럼 보여주지 않고, 다시 연습할 수 있게 안내하는가

확인 상태:

- 확인됨: `v2-planning/STORYBOARD.md`, `src/screens`, `src/context`, `src/data`, `src/components/ScreenRouter.jsx`
- 확인 필요: 요청 문서 `V1_STORYBOARD_ANALYSIS.md`는 현재 공식 작업 폴더 루트와 하위 파일 검색에서 발견되지 않았다. 따라서 아래 v1 강점은 사용자 요청에 명시된 항목을 기준으로 정리한다.

## 2. v1에서 확인된 핵심 강점

### 1. 순차적 버스 도착 시스템

- v1 구현 방식: 버스 여러 대를 한 번에 카드로 나열하기보다, 버스가 한 대씩 도착하고 학생이 탈지 기다릴지 판단하는 구조였던 것으로 정리한다.
- 교육적 중요성: 실제 버스정류장에서는 “목록에서 정답 고르기”보다 “지금 온 버스를 보고 판단하기”가 핵심이다. 버스 번호 확인, 기다림, 다음 버스 확인을 연습할 수 있다.
- v2 반영 화면: `BusStop`
- 이관 방식: 그대로 복잡하게 옮기기보다, `currentArrivingBusIndex`, `arrivingBusNumber`, `busStopDecision` 정도의 최소 상태로 단순화해서 가져온다.

### 2. 하차벨 판정 로직

- v1 구현 방식: 현재 정류장과 목표 정류장을 비교해 하차벨을 눌러야 하는 시점인지 판정하는 구조였던 것으로 정리한다.
- 교육적 중요성: 버스 안에서 가장 중요한 판단은 “지금 내려야 하는가, 더 가야 하는가”이다. 단순히 버스 이동 완료 버튼만 누르는 것보다 훨씬 시뮬레이터답다.
- v2 반영 화면: `BusRide`, 필요하면 같은 화면 안의 하차 판단 패널
- 이관 방식: 별도 새 화면을 만들기보다 `BusRide` 안에 정류장 진행바와 `내릴 준비하기 / 더 가기` 버튼을 추가하는 최소 방식으로 가져온다.

### 3. 교사용 자동 코칭 알고리즘

- v1 구현 방식: 학생의 선택 기록을 바탕으로 강점, 다시 연습할 점, 다음 지도 포인트를 자동 생성하는 구조였던 것으로 정리한다.
- 교육적 중요성: 교사용 리포트는 결과만 보여주는 화면이 아니라, 수업 피드백과 다음 연습 계획을 도와야 한다.
- v2 반영 화면: `TeacherReport`
- 이관 방식: v2의 `resultSummary`, `studentChoices`, `aiPlanInput`, `aiPlanResult`를 바탕으로 타임라인과 코칭 문장을 생성한다. 처음에는 규칙 기반 문장으로 충분하다.

### 4. 시간 인과관계 시뮬레이션

- v1 구현 방식: 기상 지연, 준비 완료 여부, 가방 누락, 버스 선택, 하차 판단이 도착 시간과 결과에 영향을 주는 구조였던 것으로 정리한다.
- 교육적 중요성: 출근은 각 선택이 다음 시간에 영향을 주는 활동이다. “10분 더 자기”가 출발 시간과 결과에 영향을 주어야 학생이 원인과 결과를 이해한다.
- v2 반영 화면: `WakeUpScene`, `MorningPrep`, `BagPacking`, `CommuteScreen`, `ResultScreen`, `TeacherReport`
- 이관 방식: 실제 시계 계산을 처음부터 크게 만들지 말고, `timePenaltyMinutes`, `actualArrivalTime`, `resultType` 같은 최소 파생값부터 도입한다.

### 5. 수준별 UI/UX 분기

- v1 구현 방식: 학생 수준에 따라 선택지 수, 힌트 강도, 판단 난이도가 달라지는 구조였던 것으로 정리한다.
- 교육적 중요성: 특수교육 수업에서는 같은 목표라도 학생별 지원 강도가 달라야 한다.
- v2 반영 화면: 선택 화면 전반, 특히 `BusStop`, `BusRide`, `DestinationMap`, `BagPacking`
- 이관 방식: 학생 화면에는 level을 절대 노출하지 않는다. 내부 `studentLevel`만 사용해 선택지 수, 힌트 문구, 단계 수를 조절한다.

## 3. v2 현재 화면과 복구 위치 매핑

| v1 기능 | v2 적용 화면 | 관련 스토리보드 단계 | 현재 v2 상태 | 필요한 보강 | 우선순위 | 예상 수정 파일 |
| --- | --- | --- | --- | --- | --- | --- |
| 순차적 버스 도착 | `BusStop` | 16 | 여러 버스 카드 중 선택 | 한 대씩 도착, 탈지 기다릴지 판단 | P0 | `src/screens/BusStop.jsx`, `src/context/initialGameState.js`, `src/context/gameActions.js`, `src/context/gameReducer.js`, `src/data/busOptions.js` |
| 하차벨 판정 | `BusRide` | 17~19 | 버스 이동 완료 버튼 중심 | 정류장 진행바, 목표 정류장, 하차벨 판단 | P0 | `src/screens/BusRide.jsx`, `src/context/*`, `src/data/commute.js` |
| 목적지 찾기 | `DestinationMap` | 20~21 | 회사까지 이동 확인 중심 | 회사/마트/학교/주민센터 등 목적지 후보 선택 | P0 | `src/screens/DestinationMap.jsx`, `src/context/*`, `src/data/commute.js` |
| 시간 인과관계 | `WakeUpScene`, `MorningPrep`, `BagPacking`, `CommuteScreen`, `ResultScreen`, `TeacherReport` | 7~23 | 선택 기록은 일부 있으나 결과 시간 반영 약함 | 지연/누락/선택을 분 단위 영향으로 환산 | P1 | `src/context/*`, `src/data/resultRules.js`, 관련 화면 |
| 자동 코칭 리포트 | `TeacherReport` | 23 | 준비물/버스/활동 요약 중심 | 전체 타임라인, 어려웠던 판단, 다음 지도 포인트 | P0 | `src/screens/TeacherReport.jsx`, `src/data/resultRules.js` |
| 수준별 UI/UX | 각 선택 화면 | 전체 | 내부 `studentLevel`은 있으나 선택 난이도 반영 미약 | 선택지 수/힌트/버튼 문구 차등 | P1 | `src/screens/BusStop.jsx`, `BusRide.jsx`, `DestinationMap.jsx`, `BagPacking.jsx` |
| 알람/기상 지연 | `WakeUpScene`, `ResultScreen`, `TeacherReport` | 7, 22~23 | `wakeUpChoice`, `wakeUpDelayMinutes` 기록 가능 | 결과 시간과 리포트에 반영 | P1 | `src/screens/WakeUpScene.jsx`, `ResultScreen.jsx`, `TeacherReport.jsx`, `src/context/*` |
| 준비물 누락 영향 | `BagPacking`, `ResultScreen`, `TeacherReport` | 13, 22~23 | 필수 준비물 완료 조건 있음 | 누락/불필요 물건 선택을 결과 요약에 더 명확히 반영 | P1 | `src/screens/BagPacking.jsx`, `ResultScreen.jsx`, `TeacherReport.jsx` |
| 날씨 기반 준비물 | `CommuteInfo`, `AIPlanResult`, `BagPacking`, `ResultScreen` | 1~3, 13, 22 | 랜덤 날씨와 준비물 생성 흐름 있음 | 날씨-준비물-결과 인과관계 강화 | P1 | `src/data/bagItems.js`, `src/screens/ResultScreen.jsx` |

## 4. P0 복구 계획

P0는 “v2가 시뮬레이터답게 보이기 위해 반드시 필요한 기능”이다.

### 1. BusStop 순차 버스 도착

- 목표: 정류장에서 버스가 한 대씩 도착하고, 학생이 `탈까요 / 기다릴까요`를 판단하게 한다.
- 최소 구현 방식:
  - `busOptions`를 순서 배열로 사용한다.
  - 현재 도착한 버스를 화면 중앙에 크게 보여준다.
  - 추천 버스와 현재 버스 번호를 비교할 수 있게 한다.
  - `타기`를 누르면 선택 버스를 저장하고 `BusRide`로 이동한다.
  - `기다리기`를 누르면 다음 버스가 도착한다.
- 수정 대상 파일:
  - `src/screens/BusStop.jsx`
  - `src/context/initialGameState.js`
  - `src/context/gameActions.js`
  - `src/context/gameReducer.js`
  - `src/data/busOptions.js`
- 필요한 state:
  - `studentChoices.arrivingBusIndex`
  - `studentChoices.busStopDecisions`
  - `studentChoices.selectedBusNumber`
- 필요한 action:
  - 기존 `SAVE_BUS_SELECTION` 확장 또는 최소 신규 `SAVE_BUS_STOP_DECISION`
- 성공 기준:
  - 한 화면에서 버스가 순차적으로 바뀐다.
  - 추천 버스가 아닌 버스를 타도 즉시 실패 처리하지 않는다.
  - 선택 기록이 TeacherReport에서 볼 수 있다.
- 하지 말아야 할 것:
  - 학생 화면에 “오답”, “틀렸어요” 같은 표현을 넣지 않는다.
  - v1 코드를 그대로 복붙하지 않는다.

### 2. BusRide 정류장 진행/하차벨 판단

- 목표: 버스 안에서 현재 정류장을 보고 내려야 할지 판단하게 한다.
- 최소 구현 방식:
  - 정류장 배열을 `집 근처 정류장 → 중앙시장 → 회사 근처 정류장 → 다음 정류장`처럼 단순 구성한다.
  - 진행바에 현재 정류장과 목표 정류장을 표시한다.
  - 버튼은 `하차벨 누르기`, `더 가기`로 구성한다.
  - 목표 정류장에서 하차벨을 누르면 DestinationMap으로 이동한다.
  - 너무 일찍/늦게 눌렀다면 기록만 남기고 부드럽게 안내한다.
- 수정 대상 파일:
  - `src/screens/BusRide.jsx`
  - `src/context/initialGameState.js`
  - `src/context/gameActions.js`
  - `src/context/gameReducer.js`
  - `src/data/commute.js`
- 필요한 state:
  - `studentChoices.currentStopIndex`
  - `studentChoices.targetStopId`
  - `studentChoices.busRideDecisions`
  - `studentChoices.gotOffAtStopId`
- 필요한 action:
  - 기존 `SAVE_BUS_RIDE` 확장 또는 `SAVE_BUS_STOP_PROGRESS`
- 성공 기준:
  - 학생이 현재 정류장과 목표 정류장을 비교할 수 있다.
  - 하차 판단 기록이 결과/리포트로 이어진다.
- 하지 말아야 할 것:
  - 하차 실수를 즉시 게임오버로 만들지 않는다.

### 3. DestinationMap 목적지 선택 후보

- 목표: 버스에서 내린 뒤 최종 목적지를 찾는 판단을 추가한다.
- 최소 구현 방식:
  - 후보 카드 3~4개: `회사`, `마트`, `학교`, `주민센터`
  - 회사 선택 시 도착 완료 저장 후 `ResultCutscene`으로 이동
  - 다른 장소 선택 시 기록하고 다시 선택 가능하게 하거나, 결과에서 부드럽게 회고한다.
- 수정 대상 파일:
  - `src/screens/DestinationMap.jsx`
  - `src/context/initialGameState.js`
  - `src/context/gameActions.js`
  - `src/context/gameReducer.js`
  - 필요 시 `src/data/commute.js`
- 필요한 state:
  - `studentChoices.selectedDestinationId`
  - `studentChoices.destinationAttempts`
- 필요한 action:
  - 기존 `SAVE_DESTINATION_ARRIVAL` 확장 또는 `SAVE_DESTINATION_SELECTION`
- 성공 기준:
  - 학생이 최종 목적지를 직접 고른다.
  - TeacherReport에서 목적지 선택 결과를 확인할 수 있다.
- 하지 말아야 할 것:
  - 단순 지도 장식만 추가하고 선택 기록을 남기지 않는 것

### 4. ResultScreen 성공/지각/실패 결과 분기

- 목표: 도착 시간과 주요 판단 기록을 바탕으로 성공/지각/출근 실패 계열의 결과를 만든다.
- 최소 구현 방식:
  - `targetArrivalTime`, `expectedArrivalTime`, 지연 분(`wakeUpDelayMinutes`, 준비 지연, 버스/하차/목적지 판단)을 합산한다.
  - `actualArrivalTime`을 계산한다.
  - 결과 타입은 내부적으로 `success`, `late`, `needsPractice` 정도로 시작한다.
  - 학생 화면 문구는 부드럽게 표현한다.
- 수정 대상 파일:
  - `src/screens/ResultScreen.jsx`
  - `src/data/resultRules.js`
  - `src/context/initialGameState.js`
  - `src/context/gameReducer.js`
- 필요한 state:
  - `resultSummary.resultType`
  - `resultSummary.actualArrivalTime`
  - `resultSummary.timePenaltyMinutes`
  - `resultSummary.reasonTags`
- 필요한 action:
  - 기존 `SAVE_RESULT_SUMMARY` 활용 가능
- 성공 기준:
  - 같은 선택을 반복하면 같은 결과가 나온다.
  - 기상 지연/버스/하차/목적지 판단이 결과 이유에 반영된다.
- 하지 말아야 할 것:
  - 학생에게 부담되는 “실패”, “오답”, “점수” 중심 UI를 만들지 않는다.

### 5. TeacherReport 최소 타임라인 반영

- 목표: 교사가 학생의 전체 출근 과정을 순서대로 확인할 수 있게 한다.
- 최소 구현 방식:
  - 전날 준비, 알람, 기상 선택, 아침 준비, 가방, 출발, 버스정류장, 버스 탑승, 하차, 목적지, 결과를 타임라인으로 표시한다.
  - 각 단계는 `완료 / 확인 필요 / 기록 없음` 정도의 교사용 상태로 표시한다.
  - 자동 코칭은 3개 영역으로 나눈다: 잘한 점, 다시 볼 점, 다음 연습 제안.
- 수정 대상 파일:
  - `src/screens/TeacherReport.jsx`
  - `src/data/resultRules.js`
- 필요한 state:
  - 기존 `studentChoices`, `aiPlanInput`, `aiPlanResult`, `resultSummary` 우선 활용
  - 필요 시 `studentChoices.timelineEvents`
- 필요한 action:
  - 가능하면 기존 action들의 payload에 기록을 누적한다.
- 성공 기준:
  - 교사가 학생의 선택 흐름을 한눈에 볼 수 있다.
  - 다음 지도 포인트가 자동으로 제안된다.
- 하지 말아야 할 것:
  - 학생 level을 강조하거나 학생 화면용 표현처럼 보여주지 않는다.

## 5. P1 복구 계획

### 1. 알람 시간과 기상 선택이 출발 시간에 영향

- 목표: `10분 더 자기` 선택이 출발과 도착 결과에 영향을 주게 한다.
- 최소 구현 방식:
  - `wakeUpDelayMinutes`를 `timePenaltyMinutes`에 더한다.
  - ResultScreen과 TeacherReport에서 “기상 선택으로 준비 시간이 줄어듦”을 표시한다.
- 수정 대상 파일:
  - `src/screens/WakeUpScene.jsx`
  - `src/screens/ResultScreen.jsx`
  - `src/screens/TeacherReport.jsx`
  - `src/data/resultRules.js`
- 성공 기준:
  - 바로 일어나기와 10분 더 자기의 결과 요약이 다르게 나온다.

### 2. 아침 준비 활동 완료/지연 반영

- 목표: MorningPrep 활동 완료 여부가 시간/리포트에 반영되게 한다.
- 최소 구현 방식:
  - 활동별 기본 소요 시간을 둔다.
  - 누락 활동은 결과에서 “다시 확인할 활동”으로 기록한다.
- 수정 대상 파일:
  - `src/screens/MorningPrep.jsx`
  - `src/data/morningActivities.js`
  - `src/data/resultRules.js`
- 성공 기준:
  - TeacherReport에서 어떤 아침 활동을 완료했는지와 다음 지도 포인트가 보인다.

### 3. 가방 준비물 누락 반영

- 목표: 필요한 물건을 챙겼는지가 결과와 리포트에 더 명확히 반영되게 한다.
- 최소 구현 방식:
  - 기존 `selectedItems`, `requiredItems` 비교를 유지한다.
  - 누락/추가 선택을 `reasonTags`로 저장한다.
- 수정 대상 파일:
  - `src/screens/BagPacking.jsx`
  - `src/screens/ResultScreen.jsx`
  - `src/screens/TeacherReport.jsx`
- 성공 기준:
  - 누락된 준비물이 ResultScreen과 TeacherReport에 일관되게 표시된다.

### 4. 날씨 기반 준비물 영향

- 목표: 랜덤 날씨가 준비물과 결과 회고까지 이어지게 한다.
- 최소 구현 방식:
  - `맑음/비/더움/추움`에 따른 준비물 추천은 유지한다.
  - 날씨 관련 준비물 누락 시 리포트 문장을 다르게 만든다.
- 수정 대상 파일:
  - `src/data/bagItems.js`
  - `src/data/resultRules.js`
  - `src/screens/ResultScreen.jsx`
- 성공 기준:
  - 비 오는 날 우산, 더운 날 손선풍기, 추운 날 겉옷이 의미 있는 피드백으로 이어진다.

### 5. 학생 수준별 선택지 수 조절

- 목표: 내부 수준에 따라 선택지 수와 힌트 강도를 조절하되 학생 화면에는 수준명을 숨긴다.
- 최소 구현 방식:
  - 쉬운 수준: 선택지 2개, 추천 힌트 강함
  - 중간 수준: 선택지 3개, 힌트 보통
  - 높은 수준: 선택지 4개 이상, 힌트 적음
- 수정 대상 파일:
  - `src/screens/BusStop.jsx`
  - `src/screens/BusRide.jsx`
  - `src/screens/DestinationMap.jsx`
  - `src/screens/BagPacking.jsx`
- 성공 기준:
  - 학생 화면에 level 텍스트 없이 난이도만 달라진다.

## 6. P2 복구 계획

### 1. 교사용 자동 코칭 문장 고도화

- `reasonTags` 조합에 따라 더 자연스러운 교사용 코칭 문장을 생성한다.
- 예: “버스 번호 확인은 잘했지만, 내릴 정류장 판단은 추가 연습이 필요합니다.”

### 2. 어려웠던 점 자동 분석

- 반복 실수 유형을 `busNumber`, `getOffStop`, `destination`, `bagItems`, `timeDelay` 등으로 분류한다.
- TeacherReport에서 “어려웠던 판단” 섹션으로 보여준다.

### 3. 다음 연습 제안

- 학생별 다음 연습 목표를 자동 추천한다.
- 예: “다음에는 버스가 한 대씩 올 때 번호를 말로 확인해 보는 연습을 해 보세요.”

### 4. 학생별 반복 기록

- localStorage 또는 별도 저장 구조에 세션별 결과를 누적한다.
- 단, 대규모 저장 구조 변경은 별도 작업으로 분리한다.

### 5. 더 자연스러운 애니메이션/장면 전환

- 버스 도착, 정류장 진행, 하차벨, 목적지 도착 장면에 가벼운 애니메이션을 추가한다.
- 기능 로직이 안정된 뒤 디자인 패스로 다룬다.

## 7. 다음 Codex 작업 순서 제안

1. `BusStop` 순차 버스 도착 복구
   - 화면 1개와 최소 state/action만 수정한다.
   - 버스가 한 대씩 도착하고 `타기 / 기다리기` 판단을 기록한다.

2. `BusRide` 하차벨/정류장 진행 복구
   - 정류장 진행바와 하차벨 판단을 한 화면 안에서 구현한다.
   - 목표 정류장 도착 여부를 기록한다.

3. `DestinationMap` 목적지 선택 강화
   - 목적지 후보 카드 3~4개를 추가한다.
   - 회사 선택 여부와 시도 기록을 저장한다.

4. `ResultScreen` 도착 시간 기반 결과 분기
   - `actualArrivalTime`, `resultType`, `reasonTags`를 계산한다.
   - 학생 화면 문구는 부드럽게 유지한다.

5. `TeacherReport` 타임라인/코칭 강화
   - 전체 흐름 타임라인과 자동 코칭 문장을 정리한다.
   - P0 기록들이 교사용 화면에 연결되는지 확인한다.

6. `MorningPrep`/`BagPacking` 시간 인과관계 반영
   - 활동 완료, 준비물 누락, 날씨 준비물 영향을 결과에 연결한다.

7. 수준별 선택지 분기 정리
   - 내부 `studentLevel`로 선택지 수와 힌트만 조절한다.
   - 학생 화면에 level 표현이 노출되지 않는지 QA한다.

각 작업은 한 번에 너무 많이 수정하지 않고, 화면 1~2개 단위로 진행한다.

## 8. 주의사항

- v1 코드를 그대로 복붙하지 않는다.
- v2 React state/context 구조에 맞게 최소 이식한다.
- 기존 디자인 톤을 깨지 않는다.
- 학생 level은 노출하지 않는다.
- 오답/실패 표현은 부드럽게 처리한다.
- `screenIds`, `ScreenRouter`, 기존 flow는 필요한 경우가 아니면 바꾸지 않는다.
- localStorage 구조는 대규모로 바꾸지 않는다.
- 기능 복구 후 `npm.cmd run build` 성공을 확인한다.
- 기능 복구 후 반드시 브라우저에서 직접 흐름을 확인한다.
- 변경 후 GitHub Desktop에서 수정 파일을 확인하고 수동 commit/push한다.
