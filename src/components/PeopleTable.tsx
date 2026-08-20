import type { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

type PeopleTableProps = {
  people: Person[];
  allPeople: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people, allPeople }: PeopleTableProps) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortData = (field: SortField) => {
    if (sort !== field) {
      return {
        params: { sort: field, order: null },
        icon: 'fa-sort',
      };
    }

    if (order === 'desc') {
      return {
        params: { sort: null, order: null },
        icon: 'fa-sort-down',
      };
    }

    return {
      params: { sort: field, order: 'desc' },
      icon: 'fa-sort-up',
    };
  };

  const nameSortData = getSortData('name');
  const sexSortData = getSortData('sex');
  const bornSortData = getSortData('born');
  const diedSortData = getSortData('died');

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
              <SearchLink params={nameSortData.params}>
                <span className="icon">
                  <i className={cn('fas', nameSortData.icon)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={sexSortData.params}>
                <span className="icon">
                  <i className={cn('fas', sexSortData.icon)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={bornSortData.params}>
                <span className="icon">
                  <i className={cn('fas', bornSortData.icon)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={diedSortData.params}>
                <span className="icon">
                  <i className={cn('fas', diedSortData.icon)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = allPeople.find(
            relative => relative.name === person.motherName,
          );
          const father = allPeople.find(
            relative => relative.name === person.fatherName,
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': person.slug === slug })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
