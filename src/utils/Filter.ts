import { Person } from '../types';

export function Filter(people: Person[], params: URLSearchParams): Person[] {
  const paramsExist = params.toString() !== '';
  let filtered = [...people];

  if (paramsExist) {
    params.entries().forEach(([key, value]) => {
      switch (key) {
        case 'sex':
          filtered = filtered.filter(person => person.sex === value);
          break;
        case 'century':
          const pickedCenturies = params.getAll('century');

          filtered = filtered.filter(person => {
            const personCentury = Math.ceil(person.born / 100).toString();

            if (pickedCenturies.includes(personCentury)) {
              return person;
            }
          });
          break;
        case 'query':
          filtered = filtered.filter(person =>
            person.name.toLowerCase().includes(value),
          );
          break;
        case 'sort':
          const descOrder = params.has('order');
          const sortOrder = descOrder ? -1 : 1;

          filtered = filtered.sort((a, b) => {
            switch (value) {
              case 'name':
                return sortOrder * a.name.localeCompare(b.name);
              case 'sex':
                return sortOrder * (a.sex === 'm' ? 1 : -1);
              case 'born':
                return sortOrder * (a.born - b.born);
              case 'died':
                return sortOrder * (a.died - b.died);
              default:
                return 0;
            }
          });
          break;
      }
    });
  }

  return filtered;
}

// if (key === 'sortBy') {
//   switch(value){
//     case 'name':
//       filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
//       break;
//     case 'birth':
//       filtered = filtered.sort((a, b) => b.born - a.born);
//       break;
//     case 'death':
//       filtered = filtered.sort((a, b) => b.died - a.died);
//       break;
//     case 'sexMale':
//       filtered = filtered.sort((a, b) => a.sex === 'm' ? -1 : 1)
//       break;
//   }
// }

// case 'sort':
//           const descOrder = params.has('order');

//           if (descOrder) {
//             filtered = filtered.sort(
//               (a: Person, b: Person) =>
//                 b[value].localeCompare(a[value]) || b[value] - a[value],
//             );
//           } else {
//             filtered = filtered.sort(
//               (a: Person, b: Person) =>
//                 a[value].localeCompare(b[value]) || a[value] - b[value],
//             );
//           }
