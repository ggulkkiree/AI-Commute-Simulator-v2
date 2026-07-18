import { describe, it, expect } from 'vitest';
import {
  studentCharacterImages,
  studentAvatarOptions,
  DEFAULT_STUDENT_AVATAR_ID,
  getDefaultStudentAvatarId,
  resolveStudentAvatarId,
  getStudentAvatarImage,
} from './imageAssets.js';

describe('getDefaultStudentAvatarId', () => {
  it('returns the first avatar id when no index is given', () => {
    expect(getDefaultStudentAvatarId()).toBe(DEFAULT_STUDENT_AVATAR_ID);
  });

  it('maps a valid index to the matching avatar option', () => {
    const lastIndex = studentAvatarOptions.length - 1;
    expect(getDefaultStudentAvatarId(lastIndex)).toBe(
      studentAvatarOptions[lastIndex].id,
    );
  });

  it('wraps around when the index exceeds the option count', () => {
    const count = studentAvatarOptions.length;
    expect(getDefaultStudentAvatarId(count)).toBe(studentAvatarOptions[0].id);
  });

  it('falls back to the first option for invalid indexes', () => {
    expect(getDefaultStudentAvatarId(-1)).toBe(DEFAULT_STUDENT_AVATAR_ID);
    expect(getDefaultStudentAvatarId(1.5)).toBe(DEFAULT_STUDENT_AVATAR_ID);
    expect(getDefaultStudentAvatarId('nope')).toBe(DEFAULT_STUDENT_AVATAR_ID);
  });
});

describe('resolveStudentAvatarId', () => {
  it('keeps an avatar id that exists in the image map', () => {
    expect(resolveStudentAvatarId('student03')).toBe('student03');
  });

  it('falls back to the default option for an unknown id', () => {
    expect(resolveStudentAvatarId('unknown')).toBe(DEFAULT_STUDENT_AVATAR_ID);
  });

  it('uses the fallback index when the id is unknown', () => {
    expect(resolveStudentAvatarId('unknown', 1)).toBe(
      studentAvatarOptions[1].id,
    );
  });

  it('falls back when the id is missing', () => {
    expect(resolveStudentAvatarId(undefined)).toBe(DEFAULT_STUDENT_AVATAR_ID);
  });
});

describe('getStudentAvatarImage', () => {
  it('returns the image path for a valid avatar id', () => {
    expect(getStudentAvatarImage('student02')).toBe(
      studentCharacterImages.student02,
    );
  });

  it('returns the fallback image for an unknown id', () => {
    expect(getStudentAvatarImage('unknown', 2)).toBe(
      studentCharacterImages[studentAvatarOptions[2].id],
    );
  });
});
