import { Person } from '../types';
import { useState } from 'react';

export function useFilter(
  people: Person[],
): [Person[], (params: URLSearchParams) => void] {
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);

  const filter = (params: URLSearchParams) => {
    const paramsExist = params.toString() !== '';

    if (!paramsExist) {
      setFilteredPeople(people);
    } else {
      // console.log(Array.from(params.entries()));
      const filtered = people.filter(person => {
        const personCentury = Math.ceil(person.born / 100).toString();
        let matchSex, matchCentury, matchName;

        params.entries().forEach(([key, value]) => {
          matchSex = key === 'sex' && person.sex === value;
          matchCentury =
            key === 'century' &&
            params.getAll('century').includes(personCentury);
          matchName =
            key === 'query' && person.name.toLowerCase().includes(value);
        });

        if (matchSex || matchCentury || matchName) {
          // console.log('I found a person');

          return person;
        }
      });

      setFilteredPeople(filtered);
    }
  };

  return [filteredPeople, filter];
}

// const personCentury = Math.ceil(person.born / 100).toString();
//         const paramsQuery = params.get('query') || '';

//         const hasMatchingCentury = params
//           .getAll('century')
//           .includes(personCentury);
//         const hasMatchingSex =
//           params.get('sex') === null || person.sex === params.get('sex');
//         const hasMatchingName =
//           paramsQuery === '' ||
//           person.name.toLowerCase().includes(paramsQuery.toLowerCase());

//         return hasMatchingCentury || hasMatchingSex || hasMatchingName;

// params.entries().forEach(([key, value]) => {
//   if (key === 'sex') {
//     setFilteredPeople(people.filter(person => person.sex === value));
//   }

//   if (key === 'century') {
//     const pickedCenturies = params.getAll('century');

//     setFilteredPeople(prev =>
//       [...prev].filter(person => {
//         const personCentury = Math.ceil(person.born / 100).toString();

//         if (pickedCenturies.includes(personCentury)) {
//           return person;
//         }
//       }),
//     );
//   }

//   if (key === 'query') {
//     setFilteredPeople(prev =>
//       [...prev].filter(person =>
//         person.name.toLowerCase().includes(value),
//       ),
//     );
//   }
// });
