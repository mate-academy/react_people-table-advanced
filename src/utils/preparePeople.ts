import { TableKeys } from '../components/PeopleTable/PeopleTable.constants';
import { Person } from '../types';
import { getCentury } from './getCentury';

type Params = {
  sex:string | null
  query:string | null
  centuries:number[]
  sort:TableKeys | null
  order:string | null
};

export const preparePeople = (
  people:Person[],
  {
    sex, query, centuries, sort, order,
  }:Params,
) => {
  let peopleCopy = [...people];

  if (sex) {
    peopleCopy = peopleCopy.filter((person) => person.sex === sex);
  }

  if (query) {
    peopleCopy = peopleCopy.filter((person) => {
      const suspended = [
        person.name, person.fatherName, person.motherName,
      ].flatMap(
        name => (
          name ? [name.toLowerCase()] : []
        ),
      );

      return suspended.some(
        name => name.includes(query.toLowerCase().trim()),
      );
    });
  }

  if (centuries.length) {
    peopleCopy = peopleCopy.filter((person) => {
      return centuries.includes(getCentury(person.born));
    });
  }

  if (sort) {
    const dir = order === 'desc' ? -1 : 1;

    return peopleCopy.sort((a, b) => {
      switch (sort) {
        case TableKeys.Name:
        case TableKeys.Sex:
          return a[sort].localeCompare(b[sort]) * dir;

        case TableKeys.Born:
        case TableKeys.Died:
          return (a[sort] - b[sort]) * dir;

        default:
          return 0;
      }
    });
  }

  return peopleCopy;
};
