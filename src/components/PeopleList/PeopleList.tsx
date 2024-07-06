import { useContext } from 'react';
import { PeopleItem } from '../PeopleItem/PeopleItem';
import { useSearchParams } from 'react-router-dom';
import { SortingFields } from '../../types/SortingFields';
import { PeopleContext } from '../../PeopleContext';

export const PeopleList = () => {
  const { people, setWarning } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  let filteredPeople = [...people];

  switch (sort) {
    case SortingFields.Name:
      if (order) {
        filteredPeople.sort((a, b) => b[sort].localeCompare(a[sort]));
      } else {
        filteredPeople.sort((a, b) => a[sort].localeCompare(b[sort]));
      }

      break;

    case SortingFields.Sex:
      if (order) {
        filteredPeople.sort((a, b) => b[sort].localeCompare(a[sort]));
      } else {
        filteredPeople.sort((a, b) => a[sort].localeCompare(b[sort]));
      }

      break;

    case SortingFields.Born:
      if (order) {
        filteredPeople.sort((a, b) => b.born - a.born);
      } else {
        filteredPeople.sort((a, b) => a.born - b.born);
      }

      break;

    case SortingFields.Died:
      if (order) {
        filteredPeople.sort((a, b) => b.died - a.died);
      } else {
        filteredPeople.sort((a, b) => a.died - b.died);
      }

      break;

    default:
      filteredPeople = people.map(item => item);
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(item => item.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(
      item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        (item.motherName &&
          item.motherName.toLowerCase().includes(query.toLowerCase())) ||
        (item.fatherName &&
          item.fatherName.toLowerCase().includes(query.toLowerCase())),
    );
  }

  if (searchParams.get('centuries')) {
    if (centuries) {
      filteredPeople = filteredPeople.filter(item =>
        centuries.includes((Math.floor(item.born / 100) + 1).toString()),
      );
    }
  }

  if (!filteredPeople.length) {
    setWarning('There are no people matching the current search criteria');
  }

  return (
    <tbody>
      {filteredPeople.map((person, _, array) => {
        const mother = array.find(item => person.motherName === item.name);
        const father = array.find(item => person.fatherName === item.name);

        return (
          <PeopleItem
            key={person.slug}
            person={person}
            mother={mother}
            father={father}
          />
        );
      })}
    </tbody>
  );
};
