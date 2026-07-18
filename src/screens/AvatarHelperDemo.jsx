import { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { useGame } from '../context/GameContext.jsx';
import {
  DEFAULT_STUDENT_AVATAR_ID,
  getDefaultStudentAvatarId,
  getStudentAvatarImage,
  resolveStudentAvatarId,
  studentAvatarOptions,
  studentCharacterImages,
} from '../data/imageAssets.js';
import { SCREEN_IDS } from '../data/screenIds.js';

const UNDEFINED_ID = '__undefined__';

const avatarIdChoices = [
  ...studentAvatarOptions.map((option) => ({
    value: option.id,
    label: option.id,
    hint: '유효한 id',
    valid: true,
  })),
  { value: 'unknown', label: "'unknown'", hint: '없는 id', valid: false },
  { value: UNDEFINED_ID, label: 'undefined', hint: '누락', valid: false },
];

function toAvatarIdArg(choiceValue) {
  return choiceValue === UNDEFINED_ID ? undefined : choiceValue;
}

function OutputCard({ label, value, mono = true }) {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white/90 p-4 shadow-inner">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p
        className={`mt-1 text-xl font-extrabold text-slate-900 ${
          mono ? 'font-mono' : ''
        } break-all`}
      >
        {value}
      </p>
    </div>
  );
}

export default function AvatarHelperDemo() {
  const { goToScreen } = useGame();
  const [choice, setChoice] = useState('student03');
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const avatarIdArg = toAvatarIdArg(choice);
  const resolvedId = resolveStudentAvatarId(avatarIdArg, fallbackIndex);
  const defaultId = getDefaultStudentAvatarId(fallbackIndex);
  const imageSrc = getStudentAvatarImage(avatarIdArg, fallbackIndex);

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 lg:text-4xl">
            아바타 유틸 함수 데모
          </h1>
          <p className="mt-1 text-base text-slate-600">
            <code className="font-mono">src/data/imageAssets.js</code>의 실제
            함수와 <code className="font-mono">public/images</code> 이미지를
            사용합니다.
          </p>
        </div>
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.startScreen)}
        >
          시작 화면으로
        </PrimaryButton>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-6 rounded-[1.75rem] border-2 border-slate-200 bg-slate-50/80 p-6 shadow-sm">
          <div>
            <p className="text-sm font-bold text-slate-500">avatarId 입력</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {avatarIdChoices.map((option) => {
                const isActive = option.value === choice;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setChoice(option.value)}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-4 ${
                      isActive
                        ? 'border-blue-500 bg-blue-500 text-white focus:ring-blue-100'
                        : option.valid
                          ? 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 focus:ring-sky-100'
                          : 'border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300 focus:ring-amber-100'
                    }`}
                  >
                    {option.label}
                    <span className="ml-2 text-xs font-medium opacity-80">
                      {option.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-500">fallbackIndex</p>
              <span className="font-mono text-lg font-extrabold text-slate-900">
                {fallbackIndex}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="7"
              step="1"
              value={fallbackIndex}
              onChange={(event) => setFallbackIndex(Number(event.target.value))}
              className="mt-2 w-full"
              aria-label="fallbackIndex 값"
            />
            <p className="mt-1 text-xs text-slate-500">
              옵션 수({studentAvatarOptions.length})를 넘으면 순환합니다.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <OutputCard label="resolveStudentAvatarId" value={`'${resolvedId}'`} />
            <OutputCard
              label="getDefaultStudentAvatarId(idx)"
              value={`'${defaultId}'`}
            />
          </div>
          <OutputCard
            label="getStudentAvatarImage → 경로"
            value={imageSrc}
          />
        </div>

        <div className="flex flex-col items-center justify-start gap-4 rounded-[1.75rem] border-2 border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-500">렌더링된 이미지</p>
          <div className="flex h-64 w-full items-end justify-center overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50">
            <img
              src={imageSrc}
              alt={`아바타 ${resolvedId}`}
              className="h-full w-full object-contain object-bottom"
              draggable="false"
            />
          </div>
          <p className="text-center text-sm text-slate-600">
            입력한 id가 유효하지 않으면{' '}
            <code className="font-mono">{DEFAULT_STUDENT_AVATAR_ID}</code>부터의
            fallback으로 안전하게 대체됩니다.
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">
        전체 아바타 id: {Object.keys(studentCharacterImages).join(', ')}
      </p>
    </section>
  );
}
