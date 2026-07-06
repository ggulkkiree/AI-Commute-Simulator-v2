const SELECTED_STUDENT_KEY = 'ai-commute-v2-selected-student';
const STUDENT_LIST_KEY = 'ai-commute-v2-student-list';

function canUseLocalStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function toStoredStudent(student) {
  if (!student) {
    return null;
  }

  return {
    id: student.id,
    name: student.name,
    level: student.level,
    characterGender: student.characterGender,
    avatarEmoji: student.avatarEmoji,
    avatarLabel: student.avatarLabel,
  };
}

export function saveSelectedStudent(student) {
  if (!canUseLocalStorage()) {
    return;
  }

  const storedStudent = toStoredStudent(student);

  if (!storedStudent?.id) {
    return;
  }

  window.localStorage.setItem(
    SELECTED_STUDENT_KEY,
    JSON.stringify(storedStudent),
  );
}

export function loadSelectedStudent() {
  if (!canUseLocalStorage()) {
    return null;
  }

  try {
    const savedValue = window.localStorage.getItem(SELECTED_STUDENT_KEY);

    if (!savedValue) {
      return null;
    }

    const savedStudent = JSON.parse(savedValue);

    if (!savedStudent?.id || !savedStudent?.name) {
      return null;
    }

    return savedStudent;
  } catch {
    return null;
  }
}

export function clearSelectedStudent() {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(SELECTED_STUDENT_KEY);
}

export function saveStudentList(studentList) {
  if (!canUseLocalStorage() || !Array.isArray(studentList)) {
    return;
  }

  window.localStorage.setItem(STUDENT_LIST_KEY, JSON.stringify(studentList));
}

export function loadStudentList(fallbackStudents = []) {
  if (!canUseLocalStorage()) {
    return fallbackStudents;
  }

  try {
    const savedValue = window.localStorage.getItem(STUDENT_LIST_KEY);

    if (!savedValue) {
      return fallbackStudents;
    }

    const savedStudents = JSON.parse(savedValue);

    if (!Array.isArray(savedStudents)) {
      return fallbackStudents;
    }

    return savedStudents.filter((student) => student?.id && student?.name);
  } catch {
    return fallbackStudents;
  }
}
