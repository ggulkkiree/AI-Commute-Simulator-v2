export const studentCharacterImages = {
  student01: '/images/characters/student_01_energetic_boy.png',
  student02: '/images/characters/student_02_calm_boy.png',
  student03: '/images/characters/student_03_confident_boy.png',
  student04: '/images/characters/student_04_relaxed_boy.png',
  student05: '/images/characters/student_05_shy_girl.png',
};

export const studentAvatarOptions = [
  { id: 'student01', label: '캐릭터 1', image: studentCharacterImages.student01 },
  { id: 'student02', label: '캐릭터 2', image: studentCharacterImages.student02 },
  { id: 'student03', label: '캐릭터 3', image: studentCharacterImages.student03 },
  { id: 'student04', label: '캐릭터 4', image: studentCharacterImages.student04 },
  { id: 'student05', label: '캐릭터 5', image: studentCharacterImages.student05 },
];

export const DEFAULT_STUDENT_AVATAR_ID = studentAvatarOptions[0].id;

export function getDefaultStudentAvatarId(index = 0) {
  const safeIndex = Number.isInteger(index) && index >= 0 ? index : 0;

  return studentAvatarOptions[safeIndex % studentAvatarOptions.length].id;
}

export function resolveStudentAvatarId(avatarId, fallbackIndex = 0) {
  return studentCharacterImages[avatarId]
    ? avatarId
    : getDefaultStudentAvatarId(fallbackIndex);
}

export function getStudentAvatarImage(avatarId, fallbackIndex = 0) {
  return studentCharacterImages[
    resolveStudentAvatarId(avatarId, fallbackIndex)
  ];
}
