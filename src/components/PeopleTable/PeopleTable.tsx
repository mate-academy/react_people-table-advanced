import React from 'react';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';
import { handleSort } from '../../utils/handleSort';
import { getLinkClass } from '../../utils/getLinkClass';
import { SortType } from '../../types/SortType';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const getPeopleSlug = (parentName: string): Person | undefined => {
    return people.find(person => person.name === parentName);
  };

  const sortPeople = (array: Person[]) => {
    const filterPeople = [...array];

    const sort = searchParams.get('sort');
    const order = searchParams.get('order') === 'desc';

    switch (sort) {
      case SortType.NAME:
        return filterPeople.sort((a, b) => {
          const comparison = a.name.localeCompare(b.name);

          return order ? -comparison : comparison;
        });
      case SortType.SEX:
        return filterPeople.sort((a, b) => {
          const comparison = a.sex.localeCompare(b.sex);

          return order ? -comparison : comparison;
        });
      case SortType.BORN:
        return filterPeople.sort((a, b) => {
          return order ? b.born - a.born : a.born - b.born;
        });
      case SortType.DIED:
        return filterPeople.sort((a, b) => {
          return order ? b.died - a.died : a.died - b.died;
        });
      default:
        return filterPeople;
    }
  };

  const filterPeople = (array: Person[]) => {
    const query = searchParams.get('query') || '';
    const sex = searchParams.get('sex') || '';
    const centuries = searchParams.getAll('centuries') || [];

    let filteredArray = array;
    const normalizedQuery = query.toLowerCase().trim();

    if (query) {
      filteredArray = filteredArray.filter(el => {
        const motherName = el.motherName ? el.motherName.toLowerCase() : '';
        const fatherName = el.fatherName ? el.fatherName.toLowerCase() : '';

        return (
          el.name.toLowerCase().includes(normalizedQuery) ||
          motherName.includes(normalizedQuery) ||
          fatherName.includes(normalizedQuery)
        );
      });
    }

    if (sex) {
      filteredArray = filteredArray.filter(el => el.sex === sex);
    }

    if (centuries.length > 0) {
      filteredArray = filteredArray.filter(el =>
        centuries.includes(Math.ceil(el.born / 100).toString()),
      );
    }

    return filteredArray;
  };

  const filteredPeople = filterPeople(people);
  const sortedPeople = sortPeople(filteredPeople);

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
              <SearchLink params={handleSort('name', searchParams)}>
                <span className="icon">
                  <i className={getLinkClass('name', searchParams)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSort('sex', searchParams)}>
                <span className="icon">
                  <i className={getLinkClass('sex', searchParams)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSort('born', searchParams)}>
                <span className="icon">
                  <i className={getLinkClass('born', searchParams)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSort('died', searchParams)}>
                <span className="icon">
                  <i className={getLinkClass('died', searchParams)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonLink
            person={person}
            key={person.slug}
            getPeopleSlug={getPeopleSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
