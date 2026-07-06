import { useState } from 'react';
import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { studentCharacterImageList } from '../data/imageAssets.js';
import { SCREEN_IDS } from '../data/screenIds.js';
import { students } from '../data/students.js';
import { saveSelectedStudent } from '../utils/storage.js';

function getStudentImage(student, index) {
  return (
    student.avatarImage ??
    student.imageUrl ??
    studentCharacterImageList[index % studentCharacterImageList.length]
  );
}

export default function StudentSelect() {
  const { state, dispatch, goToScreen } = useGame();
  const savedStudent = state.selectedStudent;
  const studentList = Array.isArray(state.studentList)
    ? state.studentList
    : students;
  const [showStudentList, setShowStudentList] = useState(!savedStudent);
  const savedStudentIndex = savedStudent
    ? studentList.findIndex((student) => student.id === savedStudent.id)
    : -1;
  const savedStudentImage = savedStudent
    ? getStudentImage(savedStudent, Math.max(savedStudentIndex, 0))
    : null;

  const handleSelectStudent = (student) => {
    saveSelectedStudent(student);
    dispatch({
      type: GAME_ACTIONS.SET_SELECTED_STUDENT,
      payload: student,
    });
    goToScreen(SCREEN_IDS.commuteInfo);
  };

  const handleStartSavedStudent = () => {
    if (!savedStudent) {
      setShowStudentList(true);
      return;
    }

    dispatch({
      type: GAME_ACTIONS.LOAD_SAVED_STUDENT,
      payload: savedStudent,
    });
    goToScreen(SCREEN_IDS.commuteInfo);
  };

  return (
    <section className="w-full">
      <ScreenHeader
        title="AI 출근 시뮬레이터 v2"
        description="출근 연습을 시작할 학생을 선택해요."
      />

      <div className="mb-6 flex justify-end">
        <PrimaryButton
          variant="secondary"
          className="px-5 py-3 text-lg shadow-md lg:px-6 lg:py-3 lg:text-xl"
          onClick={() => goToScreen(SCREEN_IDS.teacherSettings)}
        >
          교사용 설정
        </PrimaryButton>
      </div>

      {savedStudent && !showStudentList ? (
        <InfoCard className="mx-auto mb-8 max-w-5xl">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
            <div className="flex h-44 w-44 shrink-0 items-center justify-center rounded-[2rem] border-2 border-amber-100 bg-gradient-to-br from-amber-50 to-sky-50 p-3 shadow-inner">
              {savedStudentImage ? (
                <img
                  src={savedStudentImage}
                  alt={`${savedStudent.name} 캐릭터`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-6xl" aria-hidden="true">
                  {savedStudent.avatarEmoji ?? savedStudent.avatarLabel}
                </span>
              )}
            </div>

            <div className="flex-1">
              <p className="text-xl font-extrabold text-sky-700">
                지난번에 선택한 학생
              </p>
              <h2 className="mt-2 text-4xl font-extrabold text-slate-950">
                {savedStudent.name}
              </h2>
              <p className="mt-3 text-xl font-semibold leading-8 text-slate-600">
                이 학생으로 바로 출근 연습을 이어갈 수 있어요.
              </p>
            </div>

            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto">
              <PrimaryButton onClick={handleStartSavedStudent}>
                이 학생으로 시작하기
              </PrimaryButton>
              <PrimaryButton
                variant="secondary"
                onClick={() => setShowStudentList(true)}
              >
                다른 학생 선택하기
              </PrimaryButton>
            </div>
          </div>
        </InfoCard>
      ) : null}

      {showStudentList ? (
        <div className="grid gap-5 lg:grid-cols-5">
          {studentList.map((student, index) => {
            const imageSrc = getStudentImage(student, index);
            const isSavedStudent = savedStudent?.id === student.id;

            return (
              <article
                key={student.id}
                className={`flex min-h-[30rem] flex-col rounded-[2rem] border-2 bg-white/90 p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-xl lg:p-6 ${
                  isSavedStudent
                    ? 'border-blue-400 ring-4 ring-blue-100'
                    : 'border-amber-100 hover:border-sky-200'
                }`}
              >
                <div className="flex flex-1 flex-col items-center text-center">
                  <div className="flex h-48 w-full items-center justify-center rounded-3xl border-2 border-white/80 bg-gradient-to-br from-sky-50 via-white to-amber-50 p-3 shadow-inner lg:h-56">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={`${student.name} 캐릭터`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-5xl" aria-hidden="true">
                        {student.avatarEmoji ?? student.avatarLabel}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-5 text-3xl font-extrabold text-slate-950">
                    {student.name}
                  </h2>
                  <p className="mt-3 text-base font-semibold leading-7 text-slate-600 lg:text-lg">
                    {student.description}
                  </p>
                </div>

                <PrimaryButton
                  className="mt-6 w-full py-4 text-xl lg:py-4 lg:text-xl"
                  onClick={() => handleSelectStudent(student)}
                >
                  선택하기
                </PrimaryButton>
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
