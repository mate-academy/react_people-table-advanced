import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);

  const getSortParams = (field: string) => {
    const currentSearch = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSearch === field) {
      if (currentOrder === null) {
        return { sort: field, order: 'desc' };
      } else {
        return { sort: null, order: null };
      }
    } else {
      return { sort: field, order: null };
    }
  };

  useEffect(() => {
    const sortField = searchParams.get('sort') as keyof Person | null;
    const sortOrder = searchParams.get('order');
    const filteredSex = searchParams.get('sex');
    const query = searchParams.get('query')?.toLowerCase();
    const filteredCenturies = searchParams.getAll('centuries');
    const sortedData = [...people];

    const filteredBySex = filteredSex
      ? sortedData.filter(person => person.sex === filteredSex)
      : sortedData;

    const filteredByQuery = query
      ? filteredBySex.filter(person =>
          person.name.toLowerCase().includes(query),
        )
      : filteredBySex;

    const filteredByCenturies = filteredCenturies.length
      ? filteredByQuery.filter(person => {
          const personCentury = Math.floor(person.born / 100) + 1;

          return filteredCenturies.includes(personCentury.toString());
        })
      : filteredByQuery;

    if (sortField) {
      filteredByCenturies.sort((a, b) => {
        let fieldA = a[sortField];
        let fieldB = b[sortField];

        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          fieldA = fieldA.toLowerCase();
          fieldB = fieldB.toLowerCase();
        }

        if (
          fieldA !== null &&
          fieldA !== undefined &&
          fieldB !== null &&
          fieldB !== undefined
        ) {
          if (fieldA < fieldB) {
            return sortOrder === 'desc' ? 1 : -1;
          }

          if (fieldA > fieldB) {
            return sortOrder === 'desc' ? -1 : 1;
          }
        }

        return 0;
      });
    }

    setSortedPeople(filteredByCenturies);
  }, [searchParams, people]);

  const filteredPeople = sortedPeople.map(person => ({
    ...person,
    mother: people.find(
      currentPerson => currentPerson.name === person.motherName,
    ),
    father: people.find(
      currentPerson => currentPerson.name === person.fatherName,
    ),
  }));

  const getIconClass = (field: string) => {
    const sortField = searchParams.get('sort');
    const sortOrder = searchParams.get('order');

    if (sortField === field) {
      return sortOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
    }

    return 'fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={classNames('fas', getIconClass('name'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={classNames('fas', getIconClass('sex'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={classNames('fas', getIconClass('born'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={classNames('fas', getIconClass('died'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
