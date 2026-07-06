# AI Commute Simulator v2

React, Vite, Tailwind CSS 기반으로 `AI 출근 시뮬레이터` v2를 구축하기 위한 초기 프로젝트입니다.

## 방향

- v1의 검증된 `[core]` 출근 시뮬레이션 흐름을 유지합니다.
- 이번 단계에서는 전체 게임 기능을 구현하지 않고 초기 세팅과 확장 가능한 폴더 구조만 준비합니다.
- `[optional]`, `[legacy/exclude]` 범위는 MVP 구현에서 제외합니다.
- 시나리오 확장을 위해 데이터는 `src/data/`와 `src/data/scenarios/` 아래로 분리합니다.

## 실행

```bash
npm.cmd run dev
```

현재 작업 환경에 전역 npm이 없을 경우, 이 폴더의 `npm.cmd` 래퍼가 사용 가능한 패키지 실행 도구로 개발 서버를 실행합니다.

## 기본 구조

```text
src/
  assets/
  components/
  context/
  data/
    scenarios/
  hooks/
  screens/
  styles/
  utils/
```
