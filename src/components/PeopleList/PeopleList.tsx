import { useContext } from 'react';
import { PeopleItem } from '../PeopleItem/PeopleItem';
import { PeopleContext } from '../../peopleContext';
import { useSearchParams } from 'react-router-dom';

export const PeopleList = () => {
  const { people, setWarning } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();
  let filteredPeople = [...people];
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  if (sex || query) {
    if (sex) {
      filteredPeople = filteredPeople.filter(
        item => item.sex === searchParams.get('sex'),
      )
        ? filteredPeople.filter(item => item.sex === searchParams.get('sex'))
        : people;
    }

    if (query) {
      filteredPeople = filteredPeople.filter(item => {
        if (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          (item.motherName &&
            item.motherName.toLowerCase().includes(query.toLowerCase())) ||
          (item.fatherName &&
            item.fatherName.toLowerCase().includes(query.toLowerCase()))
        ) {
          return true;
        }

        return false;
      });

      if (!filteredPeople.length) {
        setWarning('There are no people matching the current search criteria');
      } else {
        setWarning('');
      }
    }
  }

  if (searchParams.get('centuries')) {
    if (centuries) {
      filteredPeople = filteredPeople.filter(item => {
        if (!centuries.includes((Math.floor(item.born / 100) + 1).toString())) {
          return false;
        } else {
          return true;
        }
      });
    }
  }

  return (
    <tbody>
      {filteredPeople.map((person, _, array) => {
        const motherLink = array.find(item => person.motherName === item.name);
        const fatherLink = array.find(item => person.fatherName === item.name);

        return (
          <PeopleItem
            key={person.slug}
            person={person}
            motherLink={motherLink}
            fatherLink={fatherLink}
          />
        );
      })}
    </tbody>
  );
};
