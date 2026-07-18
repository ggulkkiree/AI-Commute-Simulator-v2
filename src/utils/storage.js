import { resolveStudentAvatarId } from '../data/imageAssets.js';

const SELECTED_STUDENT_KEY = 'ai-commute-v2-selected-student';
const STUDENT_LIST_KEY = 'ai-commute-v2-student-list';

function getLocalStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
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
    avatarId: resolveStudentAvatarId(student.avatarId),
    avatarEmoji: student.avatarEmoji,
    avatarLabel: student.avatarLabel,
  };
}

function assignMissingAvatarIds(studentList) {
  let didChange = false;
  const normalizedStudents = studentList.map((student, index) => {
    const avatarId = resolveStudentAvatarId(student?.avatarId, index);

    if (student?.avatarId === avatarId) {
      return student;
    }

    didChange = true;
    return {
      ...student,
      avatarId,
    };
  });

  return { normalizedStudents, didChange };
}

export function saveSelectedStudent(student) {
  const storage = getLocalStorage();

  if (!storage) {
    return;
  }

  const storedStudent = toStoredStudent(student);

  if (!storedStudent?.id) {
    return;
  }

  try {
    storage.setItem(SELECTED_STUDENT_KEY, JSON.stringify(storedStudent));
  } catch {
    // Keep the current session running when browser storage is unavailable.
  }
}

export function loadSelectedStudent(studentList = []) {
  const storage = getLocalStorage();

  if (!storage) {
    return null;
  }

  try {
    const savedValue = storage.getItem(SELECTED_STUDENT_KEY);

    if (!savedValue) {
      return null;
    }

    const savedStudent = JSON.parse(savedValue);

    if (!savedStudent?.id || !savedStudent?.name) {
      return null;
    }

    const matchingIndex = Array.isArray(studentList)
      ? studentList.findIndex((student) => student?.id === savedStudent.id)
      : -1;
    const matchingStudent = matchingIndex >= 0 ? studentList[matchingIndex] : null;
    const avatarId = resolveStudentAvatarId(
      savedStudent.avatarId ?? matchingStudent?.avatarId,
      matchingIndex >= 0 ? matchingIndex : 0,
    );
    const normalizedStudent = {
      ...savedStudent,
      avatarId,
    };

    if (savedStudent.avatarId !== avatarId) {
      try {
        storage.setItem(
          SELECTED_STUDENT_KEY,
          JSON.stringify(normalizedStudent),
        );
      } catch {
        // The student can still be used in the current session if migration cannot persist.
      }
    }

    return normalizedStudent;
  } catch {
    return null;
  }
}

export function clearSelectedStudent() {
  const storage = getLocalStorage();

  if (!storage) {
    return;
  }

  try {
    storage.removeItem(SELECTED_STUDENT_KEY);
  } catch {
    // Keep the current session running when browser storage is unavailable.
  }
}

export function saveStudentList(studentList) {
  const storage = getLocalStorage();

  if (!storage || !Array.isArray(studentList)) {
    return;
  }

  const { normalizedStudents } = assignMissingAvatarIds(studentList);
  try {
    storage.setItem(STUDENT_LIST_KEY, JSON.stringify(normalizedStudents));
  } catch {
    // Keep the current session running when browser storage is unavailable.
  }
}

export function loadStudentList(fallbackStudents = []) {
  const storage = getLocalStorage();

  if (!storage) {
    return assignMissingAvatarIds(fallbackStudents).normalizedStudents;
  }

  try {
    const savedValue = storage.getItem(STUDENT_LIST_KEY);

    if (!savedValue) {
      return assignMissingAvatarIds(fallbackStudents).normalizedStudents;
    }

    const savedStudents = JSON.parse(savedValue);

    if (!Array.isArray(savedStudents)) {
      return assignMissingAvatarIds(fallbackStudents).normalizedStudents;
    }

    const validStudents = savedStudents.filter(
      (student) => student?.id && student?.name,
    );
    const { normalizedStudents, didChange } =
      assignMissingAvatarIds(validStudents);

    if (didChange) {
      try {
        storage.setItem(
          STUDENT_LIST_KEY,
          JSON.stringify(normalizedStudents),
        );
      } catch {
        // The migrated list can still be used in the current session.
      }
    }

    return normalizedStudents;
  } catch {
    return assignMissingAvatarIds(fallbackStudents).normalizedStudents;
  }
}
