import { People } from '../../types/People';

export const filter = (data: People[], query: string): People[] => {
  return data
    .filter(el => {
      const queryLC = query.toLowerCase();

      let check = false;

      if (el.name.toLowerCase().includes(queryLC)) {
        check = true;
      }

      if (el.fatherName) {
        if (el.fatherName.toLowerCase().includes(queryLC)) {
          check = true;
        }
      }

      if (el.motherName) {
        if (el.motherName.toLowerCase().includes(queryLC)) {
          check = true;
        }
      }

      return check;
    });
};
