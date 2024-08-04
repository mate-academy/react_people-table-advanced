import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const selectedPerson = people.find(p => p.slug === slug);

  const query = searchParams.get('query');
  const gender = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const direction = searchParams.get('direction');

  const filteredPeople = useMemo(() => {
    let peopleToFilter = [...people];

    if (query) {
      const normalizedQuery = query.toLowerCase();

      peopleToFilter = peopleToFilter.filter(
        ({ name, motherName, fatherName }) =>
          name.toLocaleLowerCase().includes(normalizedQuery) ||
          motherName?.toLocaleLowerCase().includes(normalizedQuery) ||
          fatherName?.toLowerCase().includes(normalizedQuery),
      );
    }

    if (gender) {
      peopleToFilter = peopleToFilter.filter(person => person.sex === gender);
    }

    if (centuries.length) {
      peopleToFilter = peopleToFilter.filter(person =>
        centuries.includes(
          (+person.born.toString().slice(0, 2) + 1).toString(),
        ),
      );
    }

    return peopleToFilter;
  }, [query, gender, centuries, people]);

  enum DirectionFilter {
    Name = 'name',
    Sex = 'sex',
    Born = 'born',
    Died = 'died',
  }

  const sortBy = ['Name', 'Sex', 'Born', 'Died'];

  const sortedPeople = useMemo(() => {
    const peopleToSort = [...filteredPeople].sort(
      (firstPerson: Person, secondPerson: Person) => {
        switch (sort) {
          case DirectionFilter.Name:
          case DirectionFilter.Sex:
            return firstPerson[sort].localeCompare(secondPerson[sort]);
          case DirectionFilter.Born:
          case DirectionFilter.Died:
            return firstPerson[sort] - secondPerson[sort];
          default:
            return 0;
        }
      },
    );

    if (direction === 'desc') {
      peopleToSort.reverse();
    }

    return peopleToSort;
  }, [direction, sort, filteredPeople]);

  const handleDirectionChange = (sortName: string) => {
    if (!sort) {
      return { sort: sortName, direction: null };
    }

    if (sortName && !direction) {
      return { sort: sortName, direction: 'desc' };
    }

    if (sortName && direction) {
      return { sort: null, direction: null };
    }

    if (!sortName && !direction) {
      return { sort: null, direction: null };
    }

    return { sort: sortName, direction: null };
  };

  return !sortedPeople.length ? (
    <p>There are no people matching the current search criteria</p>
  ) : (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortBy.map(option => {
            const normalizedOption = option.toLowerCase();

            return (
              <th key={option}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {option}
                  <SearchLink params={handleDirectionChange(normalizedOption)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== normalizedOption,
                          'fa-sort-up': sort === normalizedOption && !direction,
                          'fa-sort-down':
                            sort === normalizedOption && direction === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug: personSlug,
          } = person;

          const personMother = people.find(p => p.name === motherName);
          const personFather = people.find(p => p.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': selectedPerson?.slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {personMother ? (
                  <PersonLink person={personMother} />
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {personFather ? (
                  <PersonLink person={personFather} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
