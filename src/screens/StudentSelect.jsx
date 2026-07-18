import { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { getStudentAvatarImage } from '../data/imageAssets.js';
import { SCREEN_IDS } from '../data/screenIds.js';
import { students } from '../data/students.js';
import { saveSelectedStudent } from '../utils/storage.js';

const aiRobotGuideImage = '/images/mascot/ai_robot_guide.png';

const displayNameById = {
  'student-minseo': '민서',
  'student-junho': '준호',
  'student-seoah': '서아',
  'student-doyun': '도윤',
  'student-harin': '하린',
};

const cardToneClasses = [
  'from-sky-100 to-blue-50',
  'from-rose-100 to-pink-50',
  'from-emerald-100 to-green-50',
  'from-violet-100 to-purple-50',
  'from-amber-100 to-orange-50',
];

function getStudentImage(student) {
  return (
    student.avatarImage ??
    student.imageUrl ??
    getStudentAvatarImage(student.avatarId)
  );
}

function getDisplayName(student) {
  return displayNameById[student.id] ?? student.name ?? '학생';
}

export default function StudentSelect() {
  const { state, dispatch, goToScreen } = useGame();
  const savedStudent = state.selectedStudent;
  const studentList = Array.isArray(state.studentList)
    ? state.studentList
    : students;
  const [selectedStudent, setSelectedStudent] = useState(savedStudent ?? null);
  const selectedStudentName = selectedStudent
    ? getDisplayName(selectedStudent)
    : null;

  const handleStartSelectedStudent = () => {
    if (!selectedStudent) {
      return;
    }

    if (savedStudent?.id === selectedStudent.id) {
      dispatch({
        type: GAME_ACTIONS.LOAD_SAVED_STUDENT,
        payload: selectedStudent,
      });
    } else {
      saveSelectedStudent(selectedStudent);
      dispatch({
        type: GAME_ACTIONS.SET_SELECTED_STUDENT,
        payload: selectedStudent,
      });
    }

    goToScreen(SCREEN_IDS.commuteInfo);
  };

  return (
    <section className="relative left-1/2 flex min-h-[calc(100vh-3rem)] w-[calc(100vw-3rem)] -translate-x-1/2 items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-b from-sky-200 via-sky-100 to-amber-100 px-4 py-4 lg:min-h-[calc(100vh-4rem)] lg:w-[calc(100vw-5rem)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(255,255,255,0.9),transparent_16%),radial-gradient(circle_at_70%_8%,rgba(255,255,255,0.85),transparent_13%)]" />
      <div className="absolute -left-12 top-20 h-72 w-[28rem] rounded-[3rem] bg-amber-100/90 shadow-xl">
        <div className="absolute left-16 top-10 h-24 w-72 rounded-t-[2rem] bg-orange-200" />
        <div className="absolute left-28 top-24 h-20 w-20 rounded-full border-4 border-amber-700 bg-white" />
        <div className="absolute bottom-8 left-16 grid grid-cols-4 gap-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className="h-8 w-14 rounded-md bg-sky-200/80 shadow-inner"
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 h-52 w-[30rem] rounded-tl-[6rem] bg-slate-700/10" />
      <div className="absolute bottom-28 right-12 h-44 w-72 rounded-t-[5rem] border-4 border-slate-400 bg-slate-200/80 shadow-lg" />
      <div className="absolute bottom-14 right-28 h-24 w-64 rounded-[2rem] bg-yellow-400 shadow-lg">
        <div className="absolute left-6 top-5 h-10 w-20 rounded-xl bg-sky-200" />
        <div className="absolute right-6 top-5 h-10 w-20 rounded-xl bg-sky-200" />
        <div className="absolute bottom-3 left-8 h-8 w-8 rounded-full bg-slate-700" />
        <div className="absolute bottom-3 right-8 h-8 w-8 rounded-full bg-slate-700" />
      </div>
      <div className="absolute right-20 top-24 rounded-2xl border-4 border-blue-600 bg-white px-5 py-3 text-center text-2xl font-extrabold text-blue-800 shadow-lg">
        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-3xl text-white">
          🚌
        </div>
        버스
        <br />
        정류장
      </div>
      <div className="absolute left-0 top-0 h-32 w-80 rounded-br-full bg-green-600/40 blur-sm" />
      <div className="absolute right-0 top-0 h-36 w-96 rounded-bl-full bg-green-600/40 blur-sm" />

      <div className="relative grid w-full max-w-[1660px] gap-5 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="flex min-h-[610px] flex-col justify-between rounded-[2.25rem] border-4 border-green-200 bg-gradient-to-b from-green-50/95 to-lime-100/95 p-5 shadow-2xl">
          <div className="rounded-[1.75rem] border-2 border-dashed border-amber-200 bg-white/90 p-5 shadow-inner">
            <p className="text-2xl font-extrabold leading-9 text-slate-900">
              오늘 출근 연습을 시작해 볼까요?
            </p>
          </div>

          <div className="mt-6 flex flex-1 flex-col items-center justify-center">
            <div className="flex h-52 w-full items-center justify-center px-2">
              <img
                src={aiRobotGuideImage}
                alt="AI 안내 로봇"
                className="h-full w-full object-contain"
                draggable="false"
              />
            </div>
            <div className="mt-5 rounded-full bg-white px-6 py-3 text-lg font-extrabold text-green-700 shadow-md">
              AI 안내
            </div>
          </div>

          <PrimaryButton
            variant="secondary"
            className="w-full px-4 py-3 text-base lg:text-lg"
            onClick={() => goToScreen(SCREEN_IDS.teacherSettings)}
          >
            교사용 설정
          </PrimaryButton>
        </aside>

        <div className="rounded-[2.75rem] border-4 border-amber-200 bg-amber-50/95 p-5 shadow-2xl lg:p-6">
          <div className="rounded-[2rem] border-2 border-amber-200 bg-white/80 px-6 py-6 text-center shadow-inner">
            <h1 className="text-3xl font-extrabold leading-tight text-slate-950 lg:text-4xl xl:text-5xl">
              출근 연습을 시작할 학생을 선택해요
            </h1>
            {savedStudent ? (
              <p className="mx-auto mt-3 max-w-xl rounded-full bg-sky-50 px-5 py-2 text-base font-extrabold text-sky-700">
                지난번 선택: {getDisplayName(savedStudent)}
              </p>
            ) : null}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
            {studentList.map((student, index) => {
              const imageSrc = getStudentImage(student);
              const isSelected = selectedStudent?.id === student.id;
              const displayName = getDisplayName(student);

              return (
                <button
                  key={student.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedStudent(student)}
                  className={`group flex min-h-[20rem] flex-col rounded-[1.75rem] border-4 bg-gradient-to-b p-3 text-center shadow-lg transition focus:outline-none focus:ring-4 lg:min-h-[21rem] ${
                    isSelected
                      ? 'border-blue-500 ring-4 ring-blue-100 focus:ring-blue-100'
                      : 'border-amber-200 hover:-translate-y-1 hover:border-sky-300 focus:ring-sky-100'
                  } ${cardToneClasses[index % cardToneClasses.length]}`}
                >
                  <div className="relative flex flex-1 items-end justify-center overflow-hidden rounded-[1.35rem] border-2 border-white/80 bg-white/60 shadow-inner">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={`${displayName} 캐릭터`}
                        className="h-[clamp(14rem,29vh,22rem)] w-full object-contain object-bottom transition group-hover:scale-[1.02]"
                        draggable="false"
                      />
                    ) : (
                      <span className="pb-12 text-7xl" aria-hidden="true">
                        {student.avatarEmoji ?? student.avatarLabel}
                      </span>
                    )}
                    {isSelected ? (
                      <span className="absolute right-3 top-3 rounded-full bg-blue-500 px-4 py-2 text-lg font-extrabold text-white shadow-md">
                        선택됨
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-3 rounded-[1.25rem] bg-white/85 px-3 py-3">
                    <p className="text-3xl font-extrabold text-slate-950">
                      {displayName}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col items-center">
            <PrimaryButton
              disabled={!selectedStudent}
              className="w-full max-w-[32rem] rounded-full py-4 text-2xl lg:text-3xl"
              onClick={handleStartSelectedStudent}
            >
              {selectedStudentName
                ? `${selectedStudentName} 학생으로 시작하기`
                : '학생을 선택해 주세요'}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
