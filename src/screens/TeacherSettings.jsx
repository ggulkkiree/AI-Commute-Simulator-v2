import { useState } from 'react';
import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import { SCREEN_IDS } from '../data/screenIds.js';
import { students as defaultStudents } from '../data/students.js';
import {
  clearSelectedStudent,
  saveSelectedStudent,
  saveStudentList,
} from '../utils/storage.js';

const levelOptions = [
  { label: '가', value: 'ga' },
  { label: '나', value: 'na' },
  { label: '다', value: 'da' },
];

const levelLabels = {
  ga: '가',
  na: '나',
  da: '다',
  가: '가',
  나: '나',
  다: '다',
};

function getLevelLabel(level) {
  return levelLabels[level] ?? '나';
}

function createStudent(name, level) {
  const trimmedName = name.trim();

  return {
    id: `student-${Date.now()}`,
    name: trimmedName,
    level,
    characterGender: 'custom',
    avatarEmoji: '🎒',
    description: `${trimmedName} 학생의 출근 연습을 시작해요.`,
  };
}

export default function TeacherSettings() {
  const { state, dispatch, goToScreen } = useGame();
  const studentList = Array.isArray(state.studentList)
    ? state.studentList
    : defaultStudents;
  const [studentName, setStudentName] = useState('');
  const [studentLevel, setStudentLevel] = useState('na');
  const canAddStudent = studentName.trim().length > 0;

  const handleAddStudent = () => {
    if (!canAddStudent) {
      return;
    }

    const nextStudent = createStudent(studentName, studentLevel);
    saveStudentList([...studentList, nextStudent]);
    dispatch({
      type: GAME_ACTIONS.ADD_STUDENT,
      payload: nextStudent,
    });
    setStudentName('');
    setStudentLevel('na');
  };

  const handleDeleteStudent = (student) => {
    const shouldDelete = window.confirm(
      `${student.name} 학생 정보를 삭제할까요?`,
    );

    if (!shouldDelete) {
      return;
    }

    const nextStudentList = studentList.filter((item) => item.id !== student.id);
    saveStudentList(nextStudentList);
    dispatch({
      type: GAME_ACTIONS.DELETE_STUDENT,
      payload: student.id,
    });

    if (state.selectedStudent?.id === student.id) {
      clearSelectedStudent();
    }
  };

  const handleStartStudent = (student) => {
    saveSelectedStudent(student);
    dispatch({
      type: GAME_ACTIONS.SET_SELECTED_STUDENT,
      payload: student,
    });
    goToScreen(SCREEN_IDS.studentSelect);
  };

  return (
    <section className="w-full">
      <ScreenHeader
        title="교사용 설정"
        description="학생 정보를 추가하고 관리해요."
      />

      <InfoCard
        title="학생 관리"
        value="학생 이름과 학습 지원 수준을 설정할 수 있어요."
        className="mb-6"
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <InfoCard className="self-start">
          <p className="text-3xl font-extrabold text-slate-950">학생 추가</p>
          <p className="mt-3 text-xl font-semibold leading-8 text-slate-600">
            수준은 교사용 관리 화면에서만 보여요.
          </p>

          <label className="mt-6 block">
            <span className="text-xl font-extrabold text-slate-700">
              학생 이름
            </span>
            <input
              type="text"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              className="mt-3 w-full rounded-2xl border-2 border-amber-100 bg-white px-5 py-4 text-2xl font-bold text-slate-950 outline-none shadow-inner focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="학생 이름 입력"
            />
          </label>

          <div className="mt-6">
            <p className="text-xl font-extrabold text-slate-700">학생 수준</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {levelOptions.map((option) => {
                const isSelected = studentLevel === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setStudentLevel(option.value)}
                    className={`rounded-2xl border-2 px-5 py-4 text-2xl font-extrabold shadow-sm transition focus:outline-none focus:ring-4 ${
                      isSelected
                        ? 'border-sky-300 bg-gradient-to-r from-blue-500 to-sky-400 text-white focus:ring-sky-200'
                        : 'border-amber-100 bg-white text-slate-800 hover:bg-sky-50 focus:ring-sky-100'
                    }`}
                    aria-pressed={isSelected}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <PrimaryButton
            className="mt-8 w-full"
            disabled={!canAddStudent}
            onClick={handleAddStudent}
          >
            학생 추가하기
          </PrimaryButton>
        </InfoCard>

        <InfoCard>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-3xl font-extrabold text-slate-950">
                학생 목록
              </p>
              <p className="mt-3 text-xl font-semibold leading-8 text-slate-600">
                학생을 선택하거나 삭제할 수 있어요.
              </p>
            </div>
            <p className="rounded-full border-2 border-sky-100 bg-sky-50 px-5 py-3 text-xl font-extrabold text-sky-800">
              {studentList.length}명
            </p>
          </div>

          <div className="mt-6 grid max-h-[620px] gap-4 overflow-y-auto pr-2">
            {studentList.length === 0 ? (
              <div className="rounded-3xl border-2 border-amber-100 bg-amber-50 p-6 text-2xl font-extrabold text-slate-600">
                등록된 학생이 없어요.
              </div>
            ) : (
              studentList.map((student) => (
                <article
                  key={student.id}
                  className="rounded-3xl border-2 border-amber-100 bg-white/90 p-5 shadow-md"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-sky-100 bg-sky-50 text-5xl shadow-inner"
                        aria-hidden="true"
                      >
                        {student.avatarEmoji ?? '🎒'}
                      </div>
                      <div>
                        <p className="text-3xl font-extrabold text-slate-950">
                          {student.name}
                        </p>
                        <p className="mt-2 inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xl font-extrabold text-amber-800">
                          수준 {getLevelLabel(student.level)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <PrimaryButton
                        className="px-5 py-3 text-xl lg:px-6 lg:py-3 lg:text-xl"
                        onClick={() => handleStartStudent(student)}
                      >
                        이 학생으로 시작
                      </PrimaryButton>
                      <PrimaryButton
                        variant="secondary"
                        className="px-5 py-3 text-xl lg:px-6 lg:py-3 lg:text-xl"
                        onClick={() => handleDeleteStudent(student)}
                      >
                        삭제
                      </PrimaryButton>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </InfoCard>
      </div>

      <div className="mt-8 flex justify-end">
        <PrimaryButton
          variant="secondary"
          onClick={() => goToScreen(SCREEN_IDS.studentSelect)}
        >
          학생 선택 화면으로 돌아가기
        </PrimaryButton>
      </div>
    </section>
  );
}
