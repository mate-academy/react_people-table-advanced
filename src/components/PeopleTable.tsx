import { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { ColumnTitle } from './ColumnTitle';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable:FC<Props> = ({ people }) => {
  const { personData = '' } = useParams();

  const isExistPerson = (parent: string | null) => {
    if (parent) {
      return (people?.some(human => human.name === parent));
    }

    return false;
  };

  const getParentSlug = (parentName: string | null) => {
    const parent = people?.find(human => human.name === parentName);

    return parent?.slug;
  };

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  function getSortedPeople(peopleForSort: Person[]) {
    let sortedPeople = peopleForSort;

    switch (sort) {
      case 'sex':
      case 'name':
        sortedPeople = sortedPeople
          .sort((person1, person2) => person1[sort]
            .localeCompare(person2[sort]));
        break;

      case 'born':
      case 'died':
        sortedPeople = sortedPeople
          .sort((person1, person2) => person1[sort] - person2[sort]);
        break;

      default:
    }

    if (order === 'desc') {
      sortedPeople = sortedPeople.reverse();
    }

    return sortedPeople;
  }

  function getFilteredPeople() {
    let filteredPeople = [...people];

    if (sex) {
      if (sex === 'm') {
        filteredPeople = filteredPeople.filter(person => person.sex === 'm');
      }

      if (sex === 'f') {
        filteredPeople = filteredPeople.filter(person => person.sex === 'f');
      }
    }

    if (query) {
      filteredPeople = filteredPeople.filter(person => (
        person.name.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
      ));
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(person => (
        centuries.includes(String((Math.floor(person.born / 100) + 1)))
      ));
    }

    if (sort) {
      getSortedPeople(filteredPeople);
    }

    return filteredPeople;
  }

  return (
    <>
      {(getFilteredPeople().length !== 0) ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <ColumnTitle title="Name" sortType="name" />
              </th>

              <th>
                <ColumnTitle title="Sex" sortType="sex" />
              </th>

              <th>
                <ColumnTitle title="Born" sortType="born" />
              </th>

              <th>
                <ColumnTitle title="Died" sortType="died" />
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {getFilteredPeople().map(person => (
              <PersonLink
                key={person.name}
                to={person.slug}
                person={person}
                isExistPerson={isExistPerson}
                selectedPerson={personData}
                getParentSlug={getParentSlug}
              />
            ))}

          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};
