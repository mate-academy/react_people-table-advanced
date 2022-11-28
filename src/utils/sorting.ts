// import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';

export const sorting = (visiblePeople: Person[], sortBy: string) => {
  // const [searchParams] = useSearchParams();
  // const sortBy = searchParams.get('sort');

  let sorted = 0;

  // console.log(sortBy);
  // console.log(sortBy);

  switch (sortBy) {
    case 'name':
      if (sorted === 0) {
        sorted += 1;
        // console.log(sorted);

        return [...visiblePeople].sort(
          (a, b) => a[sortBy].localeCompare(b[sortBy]),
        );
      }

      if (sorted === 1) {
        // console.log(sorted);

        return [...visiblePeople].sort(
          (a, b) => b[sortBy].localeCompare(a[sortBy]),
        );
      }

      sorted = 0;

      return [...visiblePeople];
    // case 'sex':
    //   break;
    // case 'born':
    //   break;
    // case 'died':
    //   break;
    default:
      return [...visiblePeople];
  }
};
