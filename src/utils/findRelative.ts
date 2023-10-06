import { Person, Sex } from '../types';

export const findRelative = (gender: string, user: Person, users: Person[]) => {
  const targetName = gender === Sex.Male ? user.fatherName : user.motherName;

  return users.find(({ name }) => name === targetName);
};
