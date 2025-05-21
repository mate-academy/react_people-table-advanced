export enum Gender {
  Female = 'Female',
  Male = 'Male',
}

export type GenderKey = 'f' | 'm';

export const GENDER_MAP: Record<GenderKey, Gender> = {
  f: Gender.Female,
  m: Gender.Male,
};

export enum FilterBy {
  All = 'All',
  Male = Gender.Male,
  Female = Gender.Female,
}

export const genderKeyMale: GenderKey = 'm';
export const genderKeyFemale: GenderKey = 'f';
