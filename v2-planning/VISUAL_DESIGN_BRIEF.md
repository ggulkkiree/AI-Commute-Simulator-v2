# Visual Design Brief

## 1. 전체 디자인 방향

AI 출근 시뮬레이터 v2는 v1의 검증된 출근 연습 흐름을 유지하면서, 학생이 화면을 보고 바로 다음 행동을 이해할 수 있는 교육용 게임 UI를 목표로 한다. 전체 톤은 밝고 따뜻하며, 귀엽지만 지나치게 유아적이지 않은 2D 웹툰형 학습 게임 느낌으로 잡는다.

핵심 기준:

- 1920x1080 PC 화면에서 가장 편하게 보이도록 설계한다.
- 큰 글씨, 큰 버튼, 넓은 클릭 영역을 기본값으로 둔다.
- 한 화면에는 핵심 문제 하나만 보여준다.
- 학생이 먼저 봐야 할 정보는 화면 중앙 또는 상단 중앙에 배치한다.
- 선택지는 카드 또는 큰 버튼으로 제공한다.
- 텍스트는 짧고 직접적인 문장으로 쓴다.
- 실패, 지각, 누락 피드백은 비난보다 다시 연습할 수 있는 안내로 표현한다.
- `[core]` 흐름을 우선하고 `[optional]`, `[legacy/exclude]` 화면은 핵심 디자인 범위에서 제외한다.

학생용 특수교육 수업에 적합한 시각 원칙:

- 정보 밀도를 낮추고 화면 요소 간 간격을 충분히 둔다.
- 색상만으로 정답/오답을 구분하지 않고 아이콘, 문구, 위치를 함께 사용한다.
- 버튼 문구는 행동 중심으로 쓴다. 예: `버스 타기`, `바로 일어나기`, `가방 다 챙겼어요`.
- 위험, 실패, 오답 장면은 과장된 공포나 벌칙 이미지 없이 부드럽게 표현한다.
- TTS, 다시 듣기, 도움말 버튼은 화면마다 같은 위치와 스타일을 유지한다.
- 같은 기능은 같은 모양으로 반복해 학생이 익숙해지게 한다.

## 2. 컬러 시스템 제안

Tailwind에서 바로 쓰기 쉬운 색상 기준으로 시작한다. 초기에는 커스텀 토큰을 과하게 늘리지 않고, 이후 `tailwind.config.js` 또는 `src/styles/theme.css`에서 의미 기반 토큰으로 확장한다.

| 용도 | 추천 색상 | Tailwind 기준 | 사용 방향 |
| --- | --- | --- | --- |
| 전체 배경 | 부드러운 하늘색 | `sky-50` | 대부분의 화면 기본 배경 |
| 보조 배경 | 따뜻한 흰색 | `slate-50`, `white` | 카드 내부, 정보 패널 |
| 메인 컬러 | 친근한 파랑 | `sky-500`, `sky-600` | 주 버튼, 현재 진행 단계 |
| 보조 컬러 | 따뜻한 노랑 | `amber-300`, `amber-400` | 강조, 알람, 주의 전 정보 |
| 성공 | 밝은 초록 | `emerald-500` | 완료, 성공, 체크 |
| 주의 | 주황 | `orange-400`, `amber-500` | 지각 위험, 확인 필요 |
| 실패/오류 | 부드러운 빨강 | `rose-500` | 실패, 잘못된 선택 |
| 정보 | 보라보다 절제된 남색 | `indigo-500` | AI 안내, 힌트 |
| 카드 테두리 | 연한 회색 | `slate-200` | 카드 구분 |
| 본문 글자 | 진한 남회색 | `slate-800` | 기본 텍스트 |
| 보조 글자 | 중간 회색 | `slate-500` | 부가 설명 |

카드/버튼/말풍선 색상 방향:

- 기본 카드는 흰색 배경에 연한 테두리와 약한 그림자를 사용한다.
- 주요 행동 버튼은 파랑 계열, 완료 버튼은 초록 계열, 위험 선택은 빨강 계열로 고정한다.
- AI 말풍선은 아주 연한 하늘색 또는 인디고 배경을 사용한다.
- 학생 말풍선은 흰색 또는 연한 노랑 배경으로 구분한다.
- 결과 화면은 판정 색을 과하게 덮지 말고, 배지와 핵심 카드에만 적용한다.

## 3. 타이포그래피 방향

기준 화면은 1920x1080 PC이며, 교실에서 멀리서도 읽을 수 있는 크기를 우선한다.

| 용도 | 권장 크기 | Tailwind 기준 |
| --- | ---: | --- |
| 화면 제목 | 44-56px | `text-5xl`, `text-6xl` |
| 섹션 제목 | 28-36px | `text-3xl`, `text-4xl` |
| 카드 제목 | 24-30px | `text-2xl`, `text-3xl` |
| 본문 | 20-24px | `text-xl`, `text-2xl` |
| 보조 설명 | 18-20px | `text-lg`, `text-xl` |
| 버튼 | 22-28px | `text-2xl`, `text-3xl` |
| 숫자/시간 강조 | 40-64px | `text-5xl`, `text-6xl` |

문장 기준:

- 한 문장은 가능하면 20자 안팎으로 짧게 쓴다.
- 한 버튼에는 하나의 행동만 쓴다.
- 복잡한 설명은 카드 여러 개로 나눈다.
- `~하세요`보다 `~해요`처럼 부드럽고 쉬운 문장을 우선한다.
- 화면 제목은 질문형 또는 행동형을 섞어 사용한다. 예: `몇 시에 일어날까요?`, `버스 번호를 확인해요`.

## 4. 공통 UI 스타일

### 화면 전체 레이아웃

- 기본은 `min-h-screen` 중앙 정렬 레이아웃이다.
- 콘텐츠 최대 폭은 화면 성격에 따라 1200-1500px로 제한한다.
- 핵심 카드 하나와 하단 큰 버튼 구조를 기본 패턴으로 삼는다.
- 통근, 가방, 아침 준비처럼 조작이 많은 화면은 좌측 장면 영역 + 우측 선택 패널 구조를 사용할 수 있다.

### 카드 스타일

- 둥근 정도는 `rounded-2xl` 이하로 통일한다.
- 카드 안에는 제목, 핵심 값, 짧은 설명 순서로 배치한다.
- 카드 간격은 넓게 두고, 한 줄에 너무 많은 카드를 넣지 않는다.
- 카드 내부에 또 다른 카드가 들어가는 구조는 피한다.

### 버튼 스타일

- 최소 높이 64px 이상을 권장한다.
- 텍스트와 아이콘을 함께 사용할 때 아이콘은 왼쪽에 둔다.
- 같은 화면의 주 행동 버튼은 하나만 가장 강하게 보이게 한다.
- 비활성 버튼은 흐리게 표시하되, 왜 비활성인지 짧은 안내를 둔다.

### 모달 스타일

- 배경은 반투명 어두운 오버레이를 사용한다.
- 모달 폭은 700-900px 정도로 크고 읽기 쉽게 한다.
- 닫기, 다시 선택, 시작하기 같은 행동은 하단에 크게 배치한다.
- 교사용 리포트 모달은 학생 화면보다 정보 밀도를 조금 높여도 된다.

### 말풍선 스타일

- AI 마스코트 말풍선은 연한 파랑 배경, 학생 말풍선은 흰색 또는 연한 노랑 배경으로 구분한다.
- 말풍선에는 긴 문단을 넣지 않는다.
- TTS 버튼을 말풍선 오른쪽 위 또는 아래 고정 위치에 둔다.

### 상단 상태바 스타일

- 아침 준비 이후 화면에서만 표시를 권장한다.
- 현재 시간, 목표 시간, 준비물 체크, 남은 시간을 한 줄로 보여준다.
- 시간은 큰 숫자로, 보조 정보는 작은 라벨로 보여준다.
- 색은 배경보다 조금 진한 흰색 카드 형태를 사용한다.

### TTS 버튼 스타일

- 스피커 아이콘 + `읽어주기` 텍스트를 기본으로 한다.
- 항상 같은 위치에 배치한다. 예: 화면 우상단 또는 안내 문구 옆.
- 재생 중에는 `멈추기`로 바뀌고 색도 살짝 달라져야 한다.

### 피드백 오버레이 스타일

- 정답/완료는 초록 체크, 주의는 노랑 느낌표, 다시 시도는 부드러운 빨강 아이콘으로 통일한다.
- 메시지는 `좋아요`, `다시 확인해요`, `다음에는 이렇게 해요` 순서로 짧게 구성한다.
- 오답이 학습 실패처럼 보이지 않도록 밝고 차분한 분위기를 유지한다.

## 5. 캐릭터/이미지 스타일 가이드

기본 이미지 스타일:

`Cute 2D casual webtoon style, warm educational game UI, bright colors, friendly characters, clean composition, soft rounded shapes, simple classroom-friendly illustration, no text inside image.`

캐릭터 스타일:

- 둥근 얼굴, 부드러운 선, 밝은 표정을 기본으로 한다.
- 학생 연령대는 초등 고학년-청소년 사이로 보이게 하되, 너무 아기처럼 표현하지 않는다.
- 성별 표현은 과장하지 않고 머리, 옷, 표정 정도로 자연스럽게 구분한다.
- 모든 캐릭터는 같은 선 굵기와 명도, 채도 기준을 따른다.

AI 마스코트 스타일:

- 작은 로봇 또는 둥근 코치 캐릭터.
- 화면을 지배하지 않고 안내자 역할에 머문다.
- 눈, 손짓, 말풍선으로 친근함을 표현한다.

학생 아바타 스타일:

- 정면 또는 3/4 방향 얼굴 중심.
- 학생 카드, 결과, 리포트에서 재사용 가능해야 한다.
- 배경 없는 투명 PNG를 권장한다.

배경 이미지 스타일:

- 세부 묘사를 과하게 넣지 않는다.
- UI 텍스트가 올라갈 수 있도록 중앙 또는 상단에 여백을 둔다.
- 장면의 위치가 명확해야 한다. 예: 방, 정류장, 버스 안, 지도, 회사 앞.

아이템 이미지 스타일:

- 투명 배경의 단일 오브젝트로 제작한다.
- 크기가 작아도 무엇인지 알아볼 수 있게 단순한 실루엣을 사용한다.
- 필수 물건, 날씨 물건, 방해물의 스타일이 같은 세계관에 속해야 한다.

결과 컷신 스타일:

- 성공은 기쁨, 지각은 살짝 아쉬움, 실패는 다시 도전하는 분위기로 표현한다.
- 비난, 벌, 공포, 울음 표현은 피한다.
- 결과 이미지는 메시지보다 앞서지 않고 피드백을 보조해야 한다.

같은 세계관 규칙:

- 모든 이미지에 동일한 공통 프롬프트 문구를 포함한다.
- 텍스트가 이미지 안에 들어가지 않게 한다.
- 광원은 부드럽고 밝게 유지한다.
- 선 굵기, 그림자, 채도를 비슷하게 맞춘다.
- 실제 UI에서 필요한 여백을 고려해 장면을 너무 꽉 채우지 않는다.

## 6. Core 화면별 디자인 브리프

### StudentSelect

- 화면 목적: 플레이할 학생을 선택한다.
- 사용자가 가장 먼저 봐야 할 정보: 게임 제목과 학생 카드.
- 권장 레이아웃: 상단 제목, 중앙 5개 학생 카드 그리드, 하단 안내.
- 주요 UI 요소: 학생 아바타, 이름, 설명, 선택 버튼.
- 필요한 이미지: 학생 아바타 5종, AI 마스코트 선택 사항.
- 이미지 권장 파일명: `character_student_01.png`, `character_student_02.png`, `mascot_ai_wave.png`.
- 이미지 권장 비율: 아바타 1:1, 배경 16:9.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, bright colors, friendly school-age student avatar, front-facing portrait, soft rounded shapes, transparent background, no text inside image.`
- 주의할 디자인 문제: 학생 수준은 화면에 직접 표시하지 않는다. 카드가 너무 작아지지 않게 한다.
- v2 구현 우선순위: 높음.

### CommuteInfo

- 화면 목적: 오늘의 목적지, 목표 도착 시간, 버스 정보를 확인한다.
- 사용자가 가장 먼저 봐야 할 정보: 목표 도착 시간과 타야 할 버스 번호.
- 권장 레이아웃: 상단 학생명, 중앙 큰 시간 카드, 하단 경로 요약 카드.
- 주요 UI 요소: 목표 시간, 추천 출발 시간, 버스 번호, 출발/도착 정류장, 다음 버튼.
- 필요한 이미지: 간단한 출근 경로 지도.
- 이미지 권장 파일명: `scene_route_briefing_map.png`.
- 이미지 권장 비율: 16:9 또는 4:3.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, bright colors, simple illustrated commute route map with home, bus stop, bus, workplace destination, clean composition, no text inside image.`
- 주의할 디자인 문제: 지도보다 시간과 버스 정보가 먼저 보여야 한다.
- v2 구현 우선순위: 높음.

### AIPlanInput

- 화면 목적: AI에게 출근 정보를 입력하거나 확인한다.
- 사용자가 가장 먼저 봐야 할 정보: 입력해야 할 항목과 AI 계산 버튼.
- 권장 레이아웃: 왼쪽 입력 카드, 오른쪽 AI 마스코트 안내 패널.
- 주요 UI 요소: 출근 시간, 정류장, 버스 번호, 이동 시간 입력, 다시 보기, 계산 버튼.
- 필요한 이미지: AI 마스코트.
- 이미지 권장 파일명: `mascot_ai_helper.png`.
- 이미지 권장 비율: 마스코트 1:1.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, small friendly AI robot mascot explaining a commute plan, cheerful expression, transparent background, no text inside image.`
- 주의할 디자인 문제: 입력 항목을 한 번에 너무 많이 보이면 부담이 크다. 수준별 단순화 공간을 남긴다.
- v2 구현 우선순위: 높음.

### AIPlanResult

- 화면 목적: AI가 만든 기상-출발-탑승-도착 계획을 확인한다.
- 사용자가 가장 먼저 봐야 할 정보: 시간 순서 타임라인.
- 권장 레이아웃: 중앙 세로 또는 가로 타임라인, 하단 전날 준비 시작 버튼.
- 주요 UI 요소: 기상 시간, 출발 시간, 버스 탑승, 도착 예상, 수정/계속 버튼.
- 필요한 이미지: AI 마스코트 또는 작은 타임라인 아이콘.
- 이미지 권장 파일명: `ui_timeline_commute_plan.png`, `mascot_ai_plan_done.png`.
- 이미지 권장 비율: 아이콘 1:1.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, friendly AI mascot presenting a simple commute timeline, bright colors, clean composition, no text inside image.`
- 주의할 디자인 문제: 숫자 시간이 섞이지 않게 단계별로 크게 구분한다.
- v2 구현 우선순위: 높음.

### EveningPreparation

- 화면 목적: 전날 버스 확인, 가방, 알람 준비를 진행한다.
- 사용자가 가장 먼저 봐야 할 정보: 오늘 완료해야 할 전날 준비 3단계.
- 권장 레이아웃: 중앙 3단계 진행 카드, 현재 단계 큰 작업 영역.
- 주요 UI 요소: 버스 확인 카드, 가방 준비 카드, 알람 설정 카드, 진행 체크.
- 필요한 이미지: 저녁 방 배경, 가방, 알람시계.
- 이미지 권장 파일명: `scene_evening_room_alarm.png`, `item_backpack_open.png`, `item_alarm_clock.png`.
- 이미지 권장 비율: 배경 16:9, 아이템 1:1.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, cozy bedroom at evening with alarm clock and backpack, soft rounded shapes, clean composition, no text inside image.`
- 주의할 디자인 문제: 한 화면에서 세 작업을 동시에 조작하게 만들지 않는다.
- v2 구현 우선순위: 높음.

### SleepScene

- 화면 목적: 밤에서 아침으로 시간이 흐르는 컷신을 보여준다.
- 사용자가 가장 먼저 봐야 할 정보: 알람 시간이 설정되었고 곧 아침이 된다는 점.
- 권장 레이아웃: 전체 화면 배경 이미지, 중앙 짧은 문장, 자동 진행 표시.
- 주요 UI 요소: 잠자는 장면, 알람 시간, 진행 애니메이션.
- 필요한 이미지: 밤 침실 장면.
- 이미지 권장 파일명: `scene_sleep_night_room.png`.
- 이미지 권장 비율: 16:9.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, cozy bedroom at night, character sleeping peacefully, moonlight through window, calm colors, no text inside image.`
- 주의할 디자인 문제: 너무 어둡게 만들지 않는다. 자동 이동 시간이 길면 지루할 수 있다.
- v2 구현 우선순위: 중간.

### WakeUpScene

- 화면 목적: 바로 일어날지 10분 더 잘지 선택한다.
- 사용자가 가장 먼저 봐야 할 정보: 현재 알람 시간과 두 선택 버튼.
- 권장 레이아웃: 중앙 알람시계, 하단 큰 버튼 2개.
- 주요 UI 요소: 알람 시간, 바로 일어나기, 10분 더 자기, TTS 버튼.
- 필요한 이미지: 아침 알람 방 장면.
- 이미지 권장 파일명: `scene_morning_alarm_room.png`.
- 이미지 권장 비율: 16:9.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, morning bedroom with alarm clock ringing, character waking up, soft sunlight, clean composition, no text inside image.`
- 주의할 디자인 문제: `10분 더 자기`가 너무 매력적인 보상처럼 보이지 않게 한다.
- v2 구현 우선순위: 높음.

### MorningPrep

- 화면 목적: 샤워, 식사, 양치, 옷 입기, 가방 챙기기를 선택해 완료한다.
- 사용자가 가장 먼저 봐야 할 정보: 아직 해야 할 아침 활동.
- 권장 레이아웃: 상단 상태바, 중앙 방 장면, 하단 또는 우측 활동 버튼 그리드.
- 주요 UI 요소: 활동 카드, 완료 체크, 현재 시간, 출근 시작 버튼.
- 필요한 이미지: 밝은 아침 방, 활동 아이콘.
- 이미지 권장 파일명: `scene_morning_room_main.png`, `icon_activity_shower.png`, `icon_activity_breakfast.png`.
- 이미지 권장 비율: 배경 16:9, 아이콘 1:1.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, bright morning bedroom with wardrobe, backpack, desk, tidy room, clean composition, no text inside image.`
- 주의할 디자인 문제: 활동 완료 전후 상태가 명확해야 한다.
- v2 구현 우선순위: 높음.

### BagPacking

- 화면 목적: 필요한 물건을 가방에 넣고 방해물을 거른다.
- 사용자가 가장 먼저 봐야 할 정보: 가방과 챙겨야 할 물건.
- 권장 레이아웃: 중앙 큰 가방 드롭존, 주변 아이템 카드, 우측 체크 목록.
- 주요 UI 요소: 물건 카드, 가방 영역, 필수 준비물 진행률, 완료 버튼.
- 필요한 이미지: 열린 가방, 교통카드, 스마트폰, 물병, 날씨 물건, 방해물.
- 이미지 권장 파일명: `item_backpack_open.png`, `item_transit_card.png`, `item_smartphone.png`, `item_water_bottle.png`, `item_distractor_game_console.png`.
- 이미지 권장 비율: 아이템 1:1.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, open backpack and simple colorful commute items, transparent background assets, soft rounded shapes, no text inside image.`
- 주의할 디자인 문제: 필수/방해물 구분이 색상만으로 되지 않게 한다.
- v2 구현 우선순위: 높음.

### CommuteScreen

- 화면 목적: 출근 이동 전체 단계를 관리한다.
- 사용자가 가장 먼저 봐야 할 정보: 현재 시간, 목표 시간, 지금 해야 할 행동.
- 권장 레이아웃: 상단 상태바, 중앙 현재 장면, 우측 또는 하단 행동 버튼.
- 주요 UI 요소: 현재 시간, 남은 시간, 경로 진행, 현재 단계 안내, 행동 버튼.
- 필요한 이미지: 정류장/버스/지도 장면을 단계별로 재사용.
- 이미지 권장 파일명: `scene_commute_overview.png`.
- 이미지 권장 비율: 16:9.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, friendly commute route scene with student, bus stop, city bus, clean composition, no text inside image.`
- 주의할 디자인 문제: 화면 안에 너무 많은 통근 정보를 동시에 넣지 않는다.
- v2 구현 우선순위: 높음.

### BusStop

- 화면 목적: 올바른 정류장 방향과 버스 번호를 선택한다.
- 사용자가 가장 먼저 봐야 할 정보: 타야 할 버스 번호 200번.
- 권장 레이아웃: 중앙 정류장 장면, 하단 큰 버스 번호 선택 카드.
- 주요 UI 요소: 정류장 방향 선택, 버스 번호 카드, 기다리기/타기 버튼, 힌트.
- 필요한 이미지: 버스 정류장 장면, 버스 외관.
- 이미지 권장 파일명: `scene_bus_stop_arrival.png`, `vehicle_bus_200.png`.
- 이미지 권장 비율: 장면 16:9, 차량 3:2.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, student standing at a bus stop with backpack, city bus arriving, bright street, no text inside image.`
- 주의할 디자인 문제: 이미지 안에 버스 번호 텍스트를 넣지 않고 UI 텍스트로 표시한다.
- v2 구현 우선순위: 높음.

### BusRide

- 화면 목적: 버스 안에서 정류장을 확인하고 내릴 타이밍을 판단한다.
- 사용자가 가장 먼저 봐야 할 정보: 현재 정류장과 목표 하차 정류장.
- 권장 레이아웃: 버스 내부 장면, 정류장 진행 카드, 하차벨 버튼.
- 주요 UI 요소: 현재 정류장, 다음 정류장, 하차벨, 여기서 내리기/계속 가기.
- 필요한 이미지: 버스 내부 장면, 하차벨 아이콘.
- 이미지 권장 파일명: `scene_bus_interior.png`, `ui_bus_bell.png`.
- 이미지 권장 비율: 장면 16:9, 아이콘 1:1.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, inside a city bus, student sitting safely with backpack, friendly commute scene, no text inside image.`
- 주의할 디자인 문제: 정류장 이름은 이미지가 아니라 UI 텍스트로 관리한다.
- v2 구현 우선순위: 높음.

### DestinationMap

- 화면 목적: 하차 후 목적지 본하이리를 찾는다.
- 사용자가 가장 먼저 봐야 할 정보: 선택해야 할 목적지 후보.
- 권장 레이아웃: 중앙 큰 미니맵, 목적지 hotspot 3개, 하단 안내.
- 주요 UI 요소: 본하이리, 공원, 편의점 선택 영역, 힌트 버튼.
- 필요한 이미지: 목적지 미니맵.
- 이미지 권장 파일명: `scene_destination_map.png`.
- 이미지 권장 비율: 16:9 또는 4:3.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, simple mini map after getting off a bus, workplace, park, convenience store as clear visual landmarks, no text inside image.`
- 주의할 디자인 문제: 지도 안 텍스트를 이미지로 넣지 않는다. hotspot 라벨은 React 텍스트로 표시한다.
- v2 구현 우선순위: 중간.

### ResultCutscene

- 화면 목적: 최종 결과 전 핵심 피드백 장면을 보여준다.
- 사용자가 가장 먼저 봐야 할 정보: 오늘의 대표 결과 또는 대표 피드백.
- 권장 레이아웃: 큰 컷신 이미지, 짧은 피드백 문장, 결과 확인 버튼.
- 주요 UI 요소: 결과 이미지, 결과 제목, 다음 버튼.
- 필요한 이미지: 성공, 지각, 실패, 준비물 누락 등 결과 컷신.
- 이미지 권장 파일명: `result_success.png`, `result_late.png`, `result_fail.png`, `result_unprepared.png`.
- 이미지 권장 비율: 16:9.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, student arriving at a friendly workplace, supportive result scene, bright colors, clean composition, no text inside image.`
- 주의할 디자인 문제: 실패 이미지가 벌칙처럼 보이지 않게 한다.
- v2 구현 우선순위: 중간.

### ResultScreen

- 화면 목적: 최종 판정, 잘한 점, 다음 연습 포인트를 확인한다.
- 사용자가 가장 먼저 봐야 할 정보: 성공/지각/실패 결과와 도착 시간.
- 권장 레이아웃: 상단 결과 배지, 중앙 시간 비교, 하단 피드백 카드.
- 주요 UI 요소: 결과 배지, 별점, 목표/실제 도착 시간, 잘한 점, 아쉬운 점, 리포트 버튼.
- 필요한 이미지: 결과 상태별 작은 캐릭터 또는 배지.
- 이미지 권장 파일명: `result_badge_success.png`, `result_badge_late.png`, `result_badge_fail.png`.
- 이미지 권장 비율: 배지 1:1, 컷신 16:9.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, cheerful student with supportive result badge, clean composition, bright colors, no text inside image.`
- 주의할 디자인 문제: 리포트 정보와 학생 피드백을 한 화면에 과하게 섞지 않는다.
- v2 구현 우선순위: 높음.

### TeacherReport

- 화면 목적: 교사가 학생의 수행 결과와 지도 포인트를 확인한다.
- 사용자가 가장 먼저 봐야 할 정보: 핵심 어려움과 다음 지도 포인트.
- 권장 레이아웃: 상단 학생/결과 요약, 중앙 리포트 카드, 탭 또는 섹션 구분.
- 주요 UI 요소: 학생 정보, 결과 요약, 활동 완료표, 오류 횟수, 지도 문장, 인쇄 버튼.
- 필요한 이미지: 학생 아바타만 사용하고 새 배경은 필요하지 않다.
- 이미지 권장 파일명: `character_student_01.png`.
- 이미지 권장 비율: 아바타 1:1.
- 이미지 생성용 영어 프롬프트 초안: `Cute 2D casual webtoon style, warm educational game UI, friendly student avatar portrait, transparent background, clean composition, no text inside image.`
- 주의할 디자인 문제: 교사용 화면이지만 수업 중 즉시 읽을 수 있게 복잡한 표를 과하게 만들지 않는다.
- v2 구현 우선순위: 높음.

## 7. 이미지 우선순위 분류

### [priority-1]

초기 구현과 전체 분위기 확정에 반드시 필요한 이미지:

- `mascot_ai_wave.png`
- `character_student_01.png`
- `character_student_02.png`
- `character_student_03.png`
- `character_student_04.png`
- `character_student_05.png`
- `scene_route_briefing_map.png`
- `scene_evening_room_alarm.png`
- `scene_morning_alarm_room.png`
- `scene_morning_room_main.png`
- `item_backpack_open.png`
- `item_transit_card.png`
- `item_smartphone.png`
- `item_water_bottle.png`
- `scene_bus_stop_arrival.png`
- `scene_bus_interior.png`
- `result_success.png`
- `result_late.png`
- `result_fail.png`

### [priority-2]

화면 완성도를 높이는 데 필요한 이미지:

- `scene_sleep_night_room.png`
- `scene_destination_map.png`
- `scene_commute_overview.png`
- `item_umbrella.png`
- `item_hand_fan.png`
- `item_gloves.png`
- `item_outerwear.png`
- `item_mask.png`
- `item_distractor_game_console.png`
- `item_distractor_snack.png`
- `item_distractor_toy.png`
- `result_unprepared.png`
- `result_wet.png`
- `result_hungry.png`
- `result_smelly.png`

### [priority-3]

나중에 추가해도 되는 이미지:

- 활동별 이동 컷신 이미지
- 샤워, 식사, 양치, 옷 입기 세부 컷신
- 날씨별 배경 변형
- 정류장 방향별 배경 변형
- 버스 외관 변형
- 교사용 리포트 장식용 이미지
- `[optional]` 직무 수행 관련 이미지

## 8. 파일 저장 구조 제안

이미지는 `public/images/` 아래에 두면 데이터 파일에서 경로 문자열로 관리하기 쉽다. 시나리오 확장 시 `scenarioId`별 하위 폴더를 추가할 수 있다.

```text
public/images/
├── scenes/
│   ├── bonHighlee/
│   └── common/
├── characters/
├── items/
├── results/
└── ui/
```

권장 규칙:

- 시나리오 고유 배경은 `public/images/scenes/bonHighlee/`에 둔다.
- 학생 아바타, AI 마스코트처럼 여러 시나리오에서 쓰는 이미지는 `characters/`에 둔다.
- 준비물과 방해물은 `items/`에 둔다.
- 결과 컷신은 `results/`에 둔다.
- 버튼 아이콘, 하차벨, 진행 아이콘은 `ui/`에 둔다.
- React 코드에는 직접 경로를 흩뿌리지 않고, 이후 `src/data/scenarios/bonHighlee.js`나 이미지 매핑 데이터에서 관리한다.

## 9. 이미지 생성 작업 순서

1. AI 마스코트와 학생 아바타 5종을 먼저 만든다.
2. `CommuteInfo`용 경로 지도와 전체 색감 기준을 확정한다.
3. 전날 준비, 아침 알람, 아침 준비의 방 배경 3종을 만든다.
4. 가방과 기본 준비물 3종을 만든다.
5. 정류장, 버스 내부, 목적지 지도 등 통근 장면을 만든다.
6. 성공, 지각, 실패 결과 컷신을 만든다.
7. 날씨 물건과 방해물 이미지를 추가한다.
8. 세부 활동 컷신과 결과 피드백 변형 이미지를 보강한다.
9. 모든 이미지를 실제 1920x1080 화면에 넣어 텍스트 가독성을 점검한다.

## 10. 자체 검토

- core 화면 누락 여부: StudentSelect, CommuteInfo, AIPlanInput, AIPlanResult, EveningPreparation, SleepScene, WakeUpScene, MorningPrep, BagPacking, CommuteScreen, BusStop, BusRide, DestinationMap, ResultCutscene, ResultScreen, TeacherReport를 모두 포함했다.
- 이미지 과잉 여부: 초기 구현에 필요한 이미지는 priority-1로 제한했고, 활동 컷신과 변형 이미지는 priority-3로 미뤘다.
- 기능보다 그림이 앞서가지 않는지: 모든 화면 브리프는 먼저 목적, 핵심 정보, UI 요소를 정하고 이미지는 보조 요소로 배치했다.
- 확장 가능한 시나리오 구조와 충돌 여부: `public/images/scenes/bonHighlee/`처럼 시나리오별 폴더를 제안했고, 공통 캐릭터/아이템은 별도 분리했다.
- 학생용 수업 화면 복잡도: 한 화면 한 문제, 큰 버튼, 짧은 문장, 반복되는 위치 규칙을 유지하도록 정리했다.
