import { useState } from 'react';
import InfoCard from '../components/InfoCard.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { GAME_ACTIONS } from '../context/gameActions.js';
import { useGame } from '../context/GameContext.jsx';
import {
  DEFAULT_STUDENT_AVATAR_ID,
  getStudentAvatarImage,
  resolveStudentAvatarId,
  studentAvatarOptions,
} from '../data/imageAssets.js';
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

const genderOptions = [
  { label: '미지정', value: 'custom' },
  { label: '남학생', value: 'boy' },
  { label: '여학생', value: 'girl' },
];

const genderLabels = {
  custom: '미지정',
  boy: '남학생',
  girl: '여학생',
};

function getLevelLabel(level) {
  return levelLabels[level] ?? '나';
}

function getGenderLabel(gender) {
  return genderLabels[gender] ?? '미지정';
}

function ChoiceButtons({ label, options, value, onChange }) {
  return (
    <fieldset className="mt-6">
      <legend className="text-xl font-extrabold text-slate-700">{label}</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-2xl border-2 px-5 py-4 text-xl font-extrabold shadow-sm transition focus:outline-none focus:ring-4 ${
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
    </fieldset>
  );
}

function AvatarPicker({ value, onChange }) {
  return (
    <fieldset className="mt-6">
      <legend className="text-xl font-extrabold text-slate-700">
        캐릭터 선택
      </legend>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {studentAvatarOptions.map((option) => {
          const isSelected = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`relative overflow-hidden rounded-2xl border-4 bg-sky-50 p-2 shadow-sm transition focus:outline-none focus:ring-4 ${
                isSelected
                  ? 'border-blue-500 ring-4 ring-blue-100 focus:ring-blue-200'
                  : 'border-amber-100 hover:border-sky-300 focus:ring-sky-100'
              }`}
              aria-pressed={isSelected}
              aria-label={`${option.label}${isSelected ? ', 선택됨' : ''}`}
            >
              <img
                src={option.image}
                alt=""
                className="h-24 w-full object-contain object-bottom"
                draggable="false"
              />
              <span className="mt-1 block text-sm font-extrabold text-slate-700">
                {option.label}
              </span>
              {isSelected ? (
                <span
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-base font-black text-white shadow"
                  aria-hidden="true"
                >
                  ✓
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function createStudent(name, level, characterGender, avatarId) {
  const trimmedName = name.trim();

  return {
    id: `student-${Date.now()}`,
    name: trimmedName,
    level,
    characterGender,
    avatarId: resolveStudentAvatarId(avatarId),
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
  const [studentGender, setStudentGender] = useState('custom');
  const [studentAvatarId, setStudentAvatarId] = useState(
    DEFAULT_STUDENT_AVATAR_ID,
  );
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editLevel, setEditLevel] = useState('na');
  const [editGender, setEditGender] = useState('custom');
  const [editAvatarId, setEditAvatarId] = useState(
    DEFAULT_STUDENT_AVATAR_ID,
  );
  const canAddStudent = studentName.trim().length > 0;
  const canSaveStudent = editName.trim().length > 0;

  const closeEditor = () => {
    setEditingStudentId(null);
    setEditName('');
    setEditLevel('na');
    setEditGender('custom');
    setEditAvatarId(DEFAULT_STUDENT_AVATAR_ID);
  };

  const handleAddStudent = () => {
    if (!canAddStudent) {
      return;
    }

    const nextStudent = createStudent(
      studentName,
      studentLevel,
      studentGender,
      studentAvatarId,
    );
    saveStudentList([...studentList, nextStudent]);
    dispatch({
      type: GAME_ACTIONS.ADD_STUDENT,
      payload: nextStudent,
    });
    setStudentName('');
    setStudentLevel('na');
    setStudentGender('custom');
    setStudentAvatarId(DEFAULT_STUDENT_AVATAR_ID);
  };

  const handleEditStudent = (student, index) => {
    setEditingStudentId(student.id);
    setEditName(student.name ?? '');
    setEditLevel(student.level ?? 'na');
    setEditGender(student.characterGender ?? 'custom');
    setEditAvatarId(resolveStudentAvatarId(student.avatarId, index));
  };

  const handleSaveStudent = (student) => {
    if (!canSaveStudent) {
      return;
    }

    const updatedStudent = {
      ...student,
      name: editName.trim(),
      level: editLevel,
      characterGender: editGender,
      avatarId: resolveStudentAvatarId(editAvatarId),
    };
    const nextStudentList = studentList.map((item) =>
      item.id === updatedStudent.id ? updatedStudent : item,
    );

    saveStudentList(nextStudentList);
    if (state.selectedStudent?.id === updatedStudent.id) {
      saveSelectedStudent(updatedStudent);
    }
    dispatch({
      type: GAME_ACTIONS.UPDATE_STUDENT,
      payload: updatedStudent,
    });
    closeEditor();
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

    if (editingStudentId === student.id) {
      closeEditor();
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
        value="학생 이름, 성별, 학습 지원 수준과 캐릭터를 설정할 수 있어요."
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

          <ChoiceButtons
            label="학생 성별"
            options={genderOptions}
            value={studentGender}
            onChange={setStudentGender}
          />
          <ChoiceButtons
            label="학생 수준"
            options={levelOptions}
            value={studentLevel}
            onChange={setStudentLevel}
          />
          <AvatarPicker
            value={studentAvatarId}
            onChange={setStudentAvatarId}
          />

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
                학생을 선택하거나 정보를 수정하고 삭제할 수 있어요.
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
              studentList.map((student, index) => {
                const avatarId = resolveStudentAvatarId(student.avatarId, index);

                return (
                  <article
                    key={student.id}
                    className="rounded-3xl border-2 border-amber-100 bg-white/90 p-5 shadow-md"
                  >
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-24 w-24 shrink-0 items-end justify-center overflow-hidden rounded-3xl border-2 border-sky-100 bg-sky-50 shadow-inner">
                          <img
                            src={getStudentAvatarImage(avatarId)}
                            alt={`${student.name} 캐릭터`}
                            className="h-full w-full object-contain object-bottom"
                            draggable="false"
                          />
                        </div>
                        <div>
                          <p className="text-3xl font-extrabold text-slate-950">
                            {student.name}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <p className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-lg font-extrabold text-sky-800">
                              {getGenderLabel(student.characterGender)}
                            </p>
                            <p className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-lg font-extrabold text-amber-800">
                              수준 {getLevelLabel(student.level)}
                            </p>
                          </div>
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
                          onClick={() => handleEditStudent(student, index)}
                        >
                          수정
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

                    {editingStudentId === student.id ? (
                      <div className="mt-5 rounded-[1.75rem] border-2 border-sky-100 bg-sky-50/70 p-5">
                        <p className="text-2xl font-extrabold text-slate-950">
                          학생 정보 수정
                        </p>
                        <label className="mt-5 block">
                          <span className="text-xl font-extrabold text-slate-700">
                            학생 이름
                          </span>
                          <input
                            type="text"
                            value={editName}
                            onChange={(event) => setEditName(event.target.value)}
                            className="mt-3 w-full rounded-2xl border-2 border-sky-100 bg-white px-5 py-4 text-2xl font-bold text-slate-950 outline-none shadow-inner focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                          />
                        </label>
                        <ChoiceButtons
                          label="학생 성별"
                          options={genderOptions}
                          value={editGender}
                          onChange={setEditGender}
                        />
                        <ChoiceButtons
                          label="학생 수준"
                          options={levelOptions}
                          value={editLevel}
                          onChange={setEditLevel}
                        />
                        <AvatarPicker
                          value={editAvatarId}
                          onChange={setEditAvatarId}
                        />
                        <div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row">
                          <PrimaryButton
                            variant="secondary"
                            onClick={closeEditor}
                          >
                            취소
                          </PrimaryButton>
                          <PrimaryButton
                            disabled={!canSaveStudent}
                            onClick={() => handleSaveStudent(student)}
                          >
                            변경 내용 저장
                          </PrimaryButton>
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })
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
