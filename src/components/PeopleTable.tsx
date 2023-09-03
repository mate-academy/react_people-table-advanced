import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchParams } from '../utils/searchHelper';
import { SortParams } from '../types/SortParams';
import { SearchLink } from './SearchLink';
import { QueryParams } from '../types/QueryParams';
import { getRelatives } from '../utils/getRelatives';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slugId } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(QueryParams.Sort) || '';
  const order = searchParams.get(QueryParams.Order) || '';

  const handleSortingChange = (type: SortParams): SearchParams => {
    if (!sort || sort !== type) {
      return { sort: type, order: null };
    }

    if (!order) {
      return { sort: type, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  useEffect(() => {
    const selectedPerson = document.querySelector('.has-background-warning');

    if (selectedPerson) {
      selectedPerson.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [slugId]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortParams).map((sortType) => (
            <th key={sortType}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortType.slice(0, 1).toUpperCase() + sortType.slice(1)}
                <SearchLink
                  params={handleSortingChange(sortType)}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sort !== sortType,
                      'fa-sort-up': sort === sortType && !order,
                      'fa-sort-down': sort === sortType && order,
                    })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': slugId === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getRelatives(person, 'mother')}</td>
            <td>{getRelatives(person, 'father')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
